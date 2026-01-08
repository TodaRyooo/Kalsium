package main

import (
	"log"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/todaryooo/kalsium-be/config"
	"github.com/todaryooo/kalsium-be/handlers"
	"github.com/todaryooo/kalsium-be/models"
)

func main() {
	db, err := gorm.Open(sqlite.Open("kalsium.db"), &gorm.Config{})
	if err != nil {
		panic("faild to connect database")
	}

	db.AutoMigrate(&models.Bond{})

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	masterKey, err := config.LoadMasterKey()
	if err != nil {
		log.Fatalf("Failed to load crypto key: %v", err)
	}

	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"status":  "ok",
			"message": "Kalsium Backend is running!",
		})
	})

	// ルーティング
	e.GET("/bonds", handlers.GetBonds(db, masterKey))
	e.POST("/bonds", handlers.PostBond(db, masterKey))
	e.PUT("/bonds/:id", handlers.UpdateBond(db))
	e.DELETE("/bonds/:id", handlers.DeleteBond(db))

	e.Logger.Fatal(e.Start(":8080"))
}
