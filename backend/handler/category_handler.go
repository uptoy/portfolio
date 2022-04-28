package handler

import (
	"backend/model"
	"fmt"
	"log"
	"strconv"
	"time"

	"backend/model/apperrors"
	"net/http"

	// // "fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CategoryList(c *gin.Context) {
	ctx := c.Request.Context()
	categories, err := h.CategoryService.CategoryList(ctx)
	if err != nil {
		log.Printf("Unable to find categories: %v", err)
		e := apperrors.NewNotFound("categories", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": categories,
	})
}

func (h *Handler) CategoryCreate(c *gin.Context) {
	var json model.Category
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx := c.Request.Context()
	category, err := h.CategoryService.CategoryCreate(ctx, &json)
	if err != nil {
		log.Printf("Unable to find categories: %v", err)
		e := apperrors.NewNotFound("categories", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *Handler) CategoryFindByID(c *gin.Context) {
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Printf("Unable to convert id: %v", err)
		e := apperrors.NewNotFound("category id", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	ctx := c.Request.Context()
	category, err := h.CategoryService.CategoryFindByID(ctx, uid)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *Handler) CategoryUpdate(c *gin.Context) {
	ctx := c.Request.Context()
	var json model.Category
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	p1 := &model.Category{
		CategoryName: json.CategoryName,
	}
	category, err := h.CategoryService.CategoryUpdate(ctx, uid, p1)
	if err != nil {
		log.Printf("Unable to update category: %v", err)
		e := apperrors.NewNotFound("category", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *Handler) CategoryDelete(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id")
	uid, err := strconv.ParseInt(id, 0, 64)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	category, err := h.CategoryService.CategoryDelete(ctx, uid)
	if err != nil {
		log.Printf("Unable to delete category: %v", err)
		e := apperrors.NewNotFound("category", "err")
		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *Handler) CategoryFindByName(c *gin.Context) {
	ctx := c.Request.Context()
	name := c.Param("name")
	category, err := h.CategoryService.CategoryFindByName(ctx, name)
	if err != nil {
		log.Fatal(err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category": category,
	})
}

func (h *Handler) CategoryBulkDelete(c *gin.Context) {
	ctx := c.Request.Context()
	categories, err := h.CategoryService.BulkDelete(ctx)
	if err != nil {
		log.Printf("Unable to find categories: %v", err)
		e := apperrors.NewNotFound("categories", "err")

		c.JSON(e.Status(), gin.H{
			"error": e,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": categories,
	})
}

func (h *Handler) CategoryBulkInsert(c *gin.Context) {
	// var jsons []model.Category
	// if err := c.ShouldBindJSON(&jsons); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// categories := []model.Category{}
	// for _, json := range jsons {
	// 	categories = append(categories, model.Category{
	// 		CategoryName: json.CategoryName,
	// 	},
	// 	)
	// }

	categoriesjson := []model.Category{
		{
			CategoryName: "category_name1000",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
		{
			CategoryName: "category_name2000",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
		{
			CategoryName: "category_name3000",
			CreatedAt:    time.Now(),
			UpdatedAt:    time.Now(),
		},
	}
	ctx := c.Request.Context()
	result, err := h.CategoryService.BulkInsert(ctx, categoriesjson)
	if err != nil {
		log.Printf("Failed to create categories: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"categories": result,
	})
}



func (h *Handler) CategoryCount(c *gin.Context) {
	ctx := c.Request.Context()
	result, err := h.CategoryService.CategoryCount(ctx)
	if err != nil {
		log.Fatal("err", err)
		fmt.Println("err", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"category count": result,
	})
}
