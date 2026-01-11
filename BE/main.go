package main

import (
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
	// "gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/joho/godotenv"
	"github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/todaryooo/kalsium-be/config"
	"github.com/todaryooo/kalsium-be/handlers"
	"github.com/todaryooo/kalsium-be/models"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	dsn := os.Getenv("DATABASE_URL")
	// db, err := gorm.Open(sqlite.Open("kalsium.db"), &gorm.Config{})
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("faild to connect database")
	}

	db.AutoMigrate(&models.Bond{}, &models.User{})

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	masterKey, err := config.LoadMasterKey()
	jwtSecret := os.Getenv("JWT_SECRET")
	if err != nil || jwtSecret == "" {
		log.Fatalf("Failed to load keys: %v", err)
	}

	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	log.Printf("DEBUG: JWT Secret loaded. Length: %d", len(jwtSecret))

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"status":  "ok",
			"message": "Kalsium Backend is running!",
		})
	})

	// authルーティング
	e.POST("/auth/signup", handlers.SignUp(db))
	e.POST("/auth/login", handlers.Login(db, jwtSecret))

	r := e.Group("")
	r.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(jwtSecret),
		ContextKey: "user",
	}))

	// bondルーティング
	r.GET("/bonds", handlers.GetBonds(db, masterKey))
	r.POST("/bonds", handlers.PostBond(db, masterKey))
	r.PUT("/bonds/:id", handlers.UpdateBond(db))
	r.DELETE("/bonds/:id", handlers.DeleteBond(db))

	e.Logger.Fatal(e.Start(":8080"))
}
