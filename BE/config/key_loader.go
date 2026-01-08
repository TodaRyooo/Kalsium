package config

import (
	"encoding/hex"
	"fmt"
	"os"
)

func LoadMasterKey() ([]byte, error) {
	keyStr := os.Getenv("APP_MASTER_KEY")
	if keyStr == "" {
		return nil, fmt.Errorf("APP_MASTER_KEY is not set in environment variables")
	}

	key, err := hex.DecodeString(keyStr)
	if err != nil {
		key = []byte(keyStr)
	}

	if len(key) != 32 {
		return nil, fmt.Errorf("invalid key length: expected 32 bytes, got %d", len(key))
	}

	return key, nil
}
