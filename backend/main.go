package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/read", func(c *gin.Context) {
		val, _ := c.Cookie("name")
		c.String(200, "Cookie:%s", val)
	})
	r.GET("/write", func(c *gin.Context) {
		c.SetCookie("name", "Shimin Li", 3600, "/", "backend-kighwilmrq-an.a.run.app", false, true)
	})
	r.GET("/clear", func(c *gin.Context) {
		c.SetCookie("name", "Shimin Li", -1, "/", "backend-kighwilmrq-an.a.run.app", false, true)
	})
	r.Run(":8080")
}
