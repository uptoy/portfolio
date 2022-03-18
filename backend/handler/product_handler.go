package handler

import (
	"backend/model"
	"backend/model/apperrors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// type productReq struct {
// ProductName string           `json:"product_name" binding:"required,product_name"`
// Description string           `json:"description" binding:"required,description"`
// Price       int              `json:"price" binding:"required,price"`
// AverageRating      int              `json:"rating" binding:"required,rating"`
// ImageURL    string           `json:"image_url" binding:"required,image_url"`
// Categories  []model.Category `json:"categories" binding:"required,categories"`
// }

type productReq struct {
	ProductName   string `db:"product_name" json:"product_name"`
	Description   string `db:"description" json:"description"`
	Price         int    `db:"price" json:"price"`
	AverageRating string `db:"average_rating" json:"average_rating"`
	ProductImage  string `db:"product_image" json:"product_image"`
	CategoryName  string `db:"category_name" json:"category_name"`
}

// 	ProductId     uuid.UUID `db:"product_id" json:"product_id"`
// 	ProductName   string    `db:"product_name" json:"product_name"`
// 	Slug          string    `db:"slug" json:"slug"`
// 	ProductImage  string    `db:"product_image" json:"product_image"`
// 	Brand         string    `db:"brand" json:"brand"`
// 	Price         int       `db:"price" json:"price"`
// 	CategoryName  string    `db:"category_name" json:"category_name"`
// 	CountInStock  int       `db:"count_in_stock" json:"count_in_stock"`
// 	Description   string    `db:"description" json:"description"`
// 	AverageRating string    `db:"average_rating" json:"average_rating"`
// 	CreatedAt     time.Time `db:"created_at" json:"created_at"`
// 	UpdatedAt     time.Time `db:"updated_at" json:"updated_at"`
// }

func (h *Handler) ProductCreate(c *gin.Context) {
	var req productReq
	if ok := bindData(c, &req); !ok {
		return
	}
	p := &model.Product{
		ProductName:   req.ProductName,
		Description:   req.Description,
		Price:         req.Price,
		AverageRating: req.AverageRating,
		ProductImage:  req.ProductImage,
		CategoryName:  req.CategoryName,
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductCreate(ctx, p)
	if err != nil {
		log.Printf("Failed to create in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}

func (h *Handler) ProductList(c *gin.Context) {
	ctx := c.Request.Context()
	_, err := h.ProductService.ProductList(ctx)
	if err != nil {
		log.Printf("Failed to list in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

}

func (h *Handler) ProductDetail(c *gin.Context) {
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt detail: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	ctx := c.Request.Context()
	_, err = h.ProductService.ProductFindByID(ctx, uid)
	if err != nil {
		log.Printf("Failed to detail in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

}

func (h *Handler) ProductUpdate(c *gin.Context) {
	var req productReq
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt update: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	if ok := bindData(c, &req); !ok {
		return
	}
	p := &model.Product{
		ProductName:   req.ProductName,
		Description:   req.Description,
		Price:         req.Price,
		AverageRating: req.AverageRating,
		ProductImage:  req.ProductImage,
		CategoryName:    req.CategoryName,
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductUpdate(ctx, uid, p)
	if err != nil {
		log.Printf("Failed to update in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}
func (h *Handler) ProductDelete(c *gin.Context) {
	id := c.Param("prodctId")
	uid, err := uuid.Parse(id)
	if err != nil {
		log.Printf("Failed get uid with produt delete: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductDelete(ctx, uid)
	if err != nil {
		log.Printf("Failed to delete in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}

func (h *Handler) ProductSearch(c *gin.Context) {
	name := c.Param("prodctName")
	ctx := c.Request.Context()
	product, err := h.ProductService.ProductFindByName(ctx, name)
	if err != nil {
		log.Printf("Failed to delete in product handler: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"product": product,
	})
}

// 	// // 検索条件となるprimitive.ObjectID型の変数を指定

// 	// // cursor, err := GetProductList(ctx,)
// 	// var err error
// 	// if err != nil {
// 	// 	c.IndentedJSON(http.StatusInternalServerError, "something went wrong, please try after some time")
// 	// }
// 	// // err = cursor.All(ctx, &prodctList)

// 	// if err != nil {
// 	// 	log.Println(err)
// 	// 	c.AbortWithStatus(http.StatusInternalServerError)
// 	// 	return
// 	// }
// 	// // defer cursor.Close()
// 	// // if err := cursor.err();err !=nil{
// 	// // 	c.IndentedJSON(200,productList)

// 	// // }
// }

// //TODO PRODUCT
// // func Productlist(c *gin.Context) {
// // 	session, _ := store.Get(c.Request, "mysession")

// // 	userid := session.Values["userid"]

// // 	fmt.Println("sess userid", userid)

// // 	if userid == nil {
// // 		c.Redirect(301, "/")
// // 	} else {
// // 		db := mysqldb.SetupDB()

// // 		ProductsRows, err := db.Query("SELECT * FROM tbl_products ")

// // 		if err != nil {

// // 			fmt.Println(err)
// // 		}
// // 		products := models.Products{}

// // 		res := []models.Products{}

// // 		for ProductsRows.Next() {
// // 			var id, overall_rating, wishlist_count int
// // 			var title, description, image, image_path string
// // 			var created_date, modified_date time.Duration
// // 			var price float32
// // 			err = ProductsRows.Scan(&id, &title, &description, &price, &image, &image_path, &overall_rating, &wishlist_count, &created_date, &modified_date)
// // 			if err != nil {
// // 				fmt.Println(err)
// // 			}

// // 			products.ID = id

// // 			products.Title = title

// // 			products.Price = price

// // 			products.Imagepath = image_path

// // 			var inwishcount int

// // 			_ = db.QueryRow("SELECT count(product_id) cnt FROM tbl_wishlist WHERE user_id = ? AND product_id = ?", userid, products.ID).Scan(&inwishcount)

// // 			var inordercount int

// // 			_ = db.QueryRow("SELECT count(id) cnt FROM tbl_orders WHERE user_id = ? AND product_id = ?", userid, id).Scan(&inordercount)

// // 			products.Value = inwishcount // this product available in this user wishlist return 1 else 0

// // 			products.Productcount = inordercount // this product available in this user orderlist return 1 else 0

// // 			res = append(res, products)

// // 			var wishcount int

// // 			_ = db.QueryRow("SELECT count(id)  FROM tbl_wishlist WHERE product_id = ? ", id).Scan(&wishcount)

// // 			updWish, err := db.Prepare("UPDATE tbl_products SET 	wishlist_count=? WHERE id=?")

// // 			if err != nil {
// // 				panic(err.Error())
// // 			}
// // 			updWish.Exec(wishcount, id)

// // 		}
// // 		var ordercount int
// // 		_ = db.QueryRow("SELECT count(id)  FROM tbl_orders WHERE user_id = ? ", userid).Scan(&ordercount)

// // 		firstname := session.Values["firstname"]

// // 		fmt.Println("ordercount", ordercount)

// // 		c.HTML(200, "products.html", gin.H{"products": res, "orderscount": ordercount, "name": firstname})
// // 	}

// // }
