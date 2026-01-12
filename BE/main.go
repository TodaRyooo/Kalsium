package main

import (
	"log"
	"net/http"
	"os"

	"gorm.io/driver/postgres"
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
	// 環境変数の読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// DB接続
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&models.Bond{}, &models.User{})

	// 鍵とシークレットの読み込み
	masterKey, err := config.LoadMasterKey()
	jwtSecret := os.Getenv("JWT_SECRET")
	if err != nil || jwtSecret == "" {
		log.Fatalf("Failed to load keys: %v", err)
	}

	// Echoインスタンスの作成
	e := echo.New()

	// ミドルウェアの設定（ルーティングより前に行う）
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://kalsium.vercel.app", "http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS}, // OPTIONSはCORSプリフライトに必須
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// ルーティングの定義
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
	})

	e.POST("/auth/signup", handlers.SignUp(db))
	e.POST("/auth/login", handlers.Login(db, jwtSecret))

	r := e.Group("")
	r.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(jwtSecret),
		ContextKey: "user",
	}))

	r.GET("/bonds", handlers.GetBonds(db, masterKey))
	r.POST("/bonds", handlers.PostBond(db, masterKey))
	r.PUT("/bonds/:id", handlers.UpdateBond(db))
	r.DELETE("/bonds/:id", handlers.DeleteBond(db))

	// サーバーの起動（★必ず最後に記述する）
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":" + port))
}
