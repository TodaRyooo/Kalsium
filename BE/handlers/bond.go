package handlers

import (
	"encoding/base64"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/todaryooo/kalsium-be/crypto"
	"github.com/todaryooo/kalsium-be/models"
	"gorm.io/gorm"
)

func GetBonds(db *gorm.DB, masterKey []byte) echo.HandlerFunc {
	return func(c echo.Context) error {
		var bonds []models.Bond
		db.Find(&bonds)

		if err := db.Where("is_delete = ?", false).Find(&bonds).Error; err != nil {
			return err
		}

		for i := range bonds {
			ciphertext, err := base64.StdEncoding.DecodeString(bonds[i].Pass)
			if err != nil {
				continue // デコード失敗はスキップ
			}
			decrypted, err := crypto.Decrypt(ciphertext, masterKey)
			if err == nil {
				bonds[i].Pass = string(decrypted)
			}
		}

		return c.JSON(http.StatusOK, bonds)

	}
}

func PostBond(db *gorm.DB, masterKey []byte) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := new(models.CreateBondRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		encryptedBytes, err := crypto.Encrypt([]byte(req.Pass), masterKey)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "暗号化に失敗しました")
		}

		encodedPass := base64.StdEncoding.EncodeToString(encryptedBytes)

		newBond := models.Bond{
			ID:        uuid.New().String(),
			UserID:    "guest-user",
			IsDelete:  false,
			Identity:  req.Identity,
			Pass:      encodedPass,
			Note:      req.Note,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		if err := db.Create(&newBond).Error; err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "DBへの保存に失敗しました")
		}

		newBond.Pass = req.Pass
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
