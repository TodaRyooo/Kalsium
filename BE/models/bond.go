package models

import "time"

type Bond struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	IsDelete  bool      `json:"is_delete"`
	Identity  string    `json:"identity"`
	Pass      string    `json:"pass"` // リリース前にAES暗号化に切り替える
	Note      string    `json:"note"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateBondRequest struct {
	Identity string `json:"identity"`
	Pass     string `json:"pass"`
	Note     string `json:"note"`
}

type UpdateBondRequest struct {
	Identity string `json:"identity"`
	Note     string `json:"note"`
}
