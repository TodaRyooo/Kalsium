package handlers

import (
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/todaryooo/kalsium-be/models"
	// "golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func GetBonds(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var bonds []models.Bond
		db.Find(&bonds)

		if err := db.Where("is_delete = ?", false).Find(&bonds).Error; err != nil {
			return err
		}

		return c.JSON(http.StatusOK, bonds)

	}
}

func PostBond(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := new(models.CreateBondRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Pass), bcrypt.DefaultCost)
		// if err != nil {
		// 	return echo.NewHTTPError(http.StatusInternalServerError, "パスワードの処理に失敗しました")
		// }

		newBond := models.Bond{
			ID:        uuid.New().String(),
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

func UpdateBond(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")

		var req models.UpdateBondRequest

		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		result := db.Model(&models.Bond{}).
			Where("id = ? AND is_delete = ?", id, false).
			Select("Identity", "Note", "updated_at").
			Updates(map[string]interface{}{
				"identity":   req.Identity,
				"note":       req.Note,
				"updated_at": time.Now(),
			})

		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update"})
		}

		if result.RowsAffected == 0 {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "Bond not found"})
		}

		return c.JSON(http.StatusOK, map[string]string{"message": "Updated successfully"})
	}
}

func DeleteBond(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		if err := db.Model(&models.Bond{}).Where("id = ?", id).Update("is_delete", true).Error; err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "削除処理に失敗しました")
		}

		return c.NoContent(http.StatusNoContent)
	}
}
