package handlers

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/todaryooo/kalsium-be/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Login(db *gorm.DB, jwtSecret string) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := new(models.LoginRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		var user models.User
		if err := db.Where("username = ?", req.Username).First(&user).Error; err != nil {
			return echo.ErrUnauthorized
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
			return echo.ErrUnauthorized
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"exp":     time.Now().Add(time.Hour * 12).Unix(),
		})

		t, err := token.SignedString([]byte(jwtSecret))
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, models.AuthResponse{
			Token: t,
			User:  user,
		})
	}
}

func SignUp(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := new(models.LoginRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		hashed, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

		user := models.User{
			ID:           uuid.New().String(),
			Username:     req.Username,
			PasswordHash: string(hashed),
		}

		if err := db.Create(&user).Error; err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "ユーザー名が既に存在するか、登録に失敗しました")
		}

		return c.JSON(http.StatusCreated, map[string]string{"message": " User created."})
	}
}
