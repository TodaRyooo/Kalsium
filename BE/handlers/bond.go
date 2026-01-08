package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/todaryooo/kalsium-be/models"
	"gorm.io/gorm"
)

func GetBonds(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var bonds []models.Bond
		db.Find(&bonds)
		return c.JSON(http.StatusOK, bonds)

	}
}

func PostBond(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := new(models.CreateBondRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		newBond := models.Bond{
			ID:        "tmp-id-123",
			UserID:    "guest-user",
			IsDelete:  false,
			Identity:  req.Identity,
			Pass:      req.Pass,
			Note:      req.Note,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		if err := db.Create(&newBond).Error; err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "DBへの保存に失敗しました")
		}

		return c.JSON(http.StatusCreated, newBond)
	}
}
