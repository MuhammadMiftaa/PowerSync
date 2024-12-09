package entity

import "gorm.io/gorm"

type Appliance struct {
	gorm.Model
	Name     string
	Priority bool
	Location string
	Power    int
	Energy   int
}

type ApplianceRequest struct {
	Name     string `json:"name"`
	Priority bool   `json:"priority"`
	Location string `json:"location"`
	Power    int    `json:"power"`
	Energy   int    `json:"energy"`
}

type ApplianceResponse struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Priority bool   `json:"priority"`
	Location string `json:"location"`
	Power    int    `json:"power"`
	Energy   int    `json:"energy"`
}