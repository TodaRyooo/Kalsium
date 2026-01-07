package handlers

import (
	"github.com/labstack/echo/v4"
	"github.com/todaryooo/kalsium-be/models"
	"net/http"
)

func GetBonds(c echo.Context) error {
	bonds := []models.Bond{{ID: "1", Name: "Ionic", Value: 100}}
	return c.JSON(http.StatusOK, bonds)
}

func PostBond(c echo.Context) error {
	b := new(models.Bond)
	if err := c.Bind(b); err != nil {
		return err
	}
	return c.JSON(http.StatusCreated, b)
}
