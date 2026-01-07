FROM golang:1.25-alpine AS dev

WORKDIR /app

# ホットリロードツール Air
RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

CMD ["air", "-c", ".air.toml"]
