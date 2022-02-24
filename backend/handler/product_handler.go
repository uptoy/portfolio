package handler

import (
	// "errors"
	"fmt"
	"github.com/gin-gonic/gin"
)

func (h *Handler) SearchProduct(c *gin.Context) {
	// productList := []model.Product{}
	// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// defer cancel()

	// // 検索条件となるprimitive.ObjectID型の変数を指定

	// // cursor, err := GetProductList(ctx,)
	// var err error
	// if err != nil {
	// 	c.IndentedJSON(http.StatusInternalServerError, "something went wrong, please try after some time")
	// }
	// // err = cursor.All(ctx, &prodctList)

	// if err != nil {
	// 	log.Println(err)
	// 	c.AbortWithStatus(http.StatusInternalServerError)
	// 	return
	// }
	// // defer cursor.Close()
	// // if err := cursor.err();err !=nil{
	// // 	c.IndentedJSON(200,productList)

	// // }
}

func (h *Handler) ProductList(c *gin.Context) {
	fmt.Println("ProductList")
}
func (h *Handler) ProductCreate(c *gin.Context) {
	fmt.Println("CreateProduct")
}

func (h *Handler) ProductDetail(c *gin.Context) {
	fmt.Println("DetailProduct")
}

func (h *Handler) ProductDelete(c *gin.Context) {
	fmt.Println("DeleteProductc")
}
func (h *Handler) ProductUpdate(c *gin.Context) {
	fmt.Println("UpdateProduct")
}





func Admin(c *gin.Context) {
	fmt.Println("admin")
}



//TODO PRODUCT
// func Productlist(c *gin.Context) {
// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]

// 	fmt.Println("sess userid", userid)

// 	if userid == nil {
// 		c.Redirect(301, "/")
// 	} else {
// 		db := mysqldb.SetupDB()

// 		ProductsRows, err := db.Query("SELECT * FROM tbl_products ")

// 		if err != nil {

// 			fmt.Println(err)
// 		}
// 		products := models.Products{}

// 		res := []models.Products{}

// 		for ProductsRows.Next() {
// 			var id, overall_rating, wishlist_count int
// 			var title, description, image, image_path string
// 			var created_date, modified_date time.Duration
// 			var price float32
// 			err = ProductsRows.Scan(&id, &title, &description, &price, &image, &image_path, &overall_rating, &wishlist_count, &created_date, &modified_date)
// 			if err != nil {
// 				fmt.Println(err)
// 			}

// 			products.ID = id

// 			products.Title = title

// 			products.Price = price

// 			products.Imagepath = image_path

// 			var inwishcount int

// 			_ = db.QueryRow("SELECT count(product_id) cnt FROM tbl_wishlist WHERE user_id = ? AND product_id = ?", userid, products.ID).Scan(&inwishcount)

// 			var inordercount int

// 			_ = db.QueryRow("SELECT count(id) cnt FROM tbl_orders WHERE user_id = ? AND product_id = ?", userid, id).Scan(&inordercount)

// 			products.Value = inwishcount // this product available in this user wishlist return 1 else 0

// 			products.Productcount = inordercount // this product available in this user orderlist return 1 else 0

// 			res = append(res, products)

// 			var wishcount int

// 			_ = db.QueryRow("SELECT count(id)  FROM tbl_wishlist WHERE product_id = ? ", id).Scan(&wishcount)

// 			updWish, err := db.Prepare("UPDATE tbl_products SET 	wishlist_count=? WHERE id=?")

// 			if err != nil {
// 				panic(err.Error())
// 			}
// 			updWish.Exec(wishcount, id)

// 		}
// 		var ordercount int
// 		_ = db.QueryRow("SELECT count(id)  FROM tbl_orders WHERE user_id = ? ", userid).Scan(&ordercount)

// 		firstname := session.Values["firstname"]

// 		fmt.Println("ordercount", ordercount)

// 		c.HTML(200, "products.html", gin.H{"products": res, "orderscount": ordercount, "name": firstname})
// 	}

// }





