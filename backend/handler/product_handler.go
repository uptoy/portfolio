package handler

import (
	// "errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"net/smtp"

	"backend/model"
	"backend/model/apperrors"
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

func (h *Handler) UserUpdate(c *gin.Context) {
	fmt.Println("UserUpdate")
}
func (h *Handler) ProductList(c *gin.Context) {
	fmt.Println("ProductList")
}
func (h *Handler) CreateProduct(c *gin.Context) {
	fmt.Println("CreateProduct")
}

func (h *Handler) ProductDetail(c *gin.Context) {
	fmt.Println("DetailProduct")
}

func (h *Handler) DeleteProduct(c *gin.Context) {
	fmt.Println("DeleteProductc")
}
func (h *Handler) UpdateProduct(c *gin.Context) {
	fmt.Println("UpdateProduct")
}

func (h *Handler) BuyFromCart(c *gin.Context) {
	fmt.Println("buy from cart ")

}

func (h *Handler) UpdateAddress(c *gin.Context) {
	fmt.Println("update address")

}

func Admin(c *gin.Context) {
	fmt.Println("admin")
}

//TODO WishList
// err := db.QueryRow("SELECT count(product_id) cnt FROM tbl_wishlist WHERE user_id = ? AND product_id = ?", userid, pid).Scan(&count)
// func AddWishList(c *gin.Context) {
// 	fmt.Println("AddWishList")
// }

// func RemoveWishList(c *gin.Context) {
// 	fmt.Println("RemoveWishList")
// }

// func Addwishlist(c *gin.Context) {

// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]

// 	if userid == nil {
// 		c.Redirect(301, "/")
// 	} else {
// 		db := mysqldb.SetupDB()
// 		fmt.Println("sess uid", userid)
// 		pid := c.Request.PostFormValue("product_id")

// 		fmt.Println("pid:", pid)

// 		created_date := time.Now().Format("Jan 2, 2006 03:04:05 PM")

// 		var count int

// 		er := db.QueryRow("SELECT count(product_id) cnt FROM tbl_wishlist WHERE user_id = ? AND product_id = ?", userid, pid).Scan(&count)
// 		if er != nil {
// 			fmt.Println(er)
// 		}
// 		fmt.Println("count", count)
// 		if count != 1 {

// 			insWish, err := db.Prepare("INSERT INTO  tbl_wishlist(product_id,user_id,created_date) VALUES(?,?,?)")

// 			if err != nil {
// 				fmt.Println(err)
// 			}
// 			insWish.Exec(pid, userid, created_date)

// 			json.NewEncoder(c.Writer).Encode("Added in your wishlist")

// 		} else {

// 			json.NewEncoder(c.Writer).Encode("Already in your wishlist")
// 		}
// 		defer db.Close()
// 	}

// }

// func Wishlist(c *gin.Context) {

// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]
// 	fmt.Println("userid", userid)
// 	if userid == nil {
// 		c.Redirect(301, "/viewwishlist")
// 	} else {
// 		db := mysqldb.SetupDB()

// 		WishRows, err := db.Query("SELECT product_id,id FROM tbl_wishlist where user_id=?", userid)

// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 		wishlist := models.Products{}
// 		res1 := []models.Products{}
// 		for WishRows.Next() {
// 			var wid, product_id int
// 			_ = WishRows.Scan(&product_id, &wid)

// 			var title, image_path string
// 			var price float32
// 			var quantity int
// 			_ = db.QueryRow("SELECT title,price,image_path FROM tbl_products WHERE id=?", product_id).Scan(&title, &price, &image_path)

// 			db.QueryRow("SELECT quantity FROM tbl_orders WHERE product_id=? AND user_id=?", product_id, userid).Scan(&quantity)
// 			wishlist.Title = title

// 			wishlist.Price = price
// 			wishlist.Imagepath = image_path
// 			wishlist.ID = wid
// 			wishlist.Overallrating = product_id
// 			wishlist.Value = quantity
// 			res1 = append(res1, wishlist)
// 		}
// 		var ordercount int
// 		_ = db.QueryRow("SELECT count(id)  FROM tbl_orders WHERE user_id = ? ", userid).Scan(&ordercount)

// 		fmt.Println("ordercount", ordercount)

// 		name := session.Values["firstname"]

// 		c.HTML(200, "wishlist.html", gin.H{"wishlist": res1, "orderscount": ordercount, "name": name})

// 		defer db.Close()
// 	}

// }

// func Deletewishlist(c *gin.Context) {
// 	db := mysqldb.SetupDB()
// 	wid := c.Query("wid")
// 	fmt.Println("wid", wid)
// 	delWish, err := db.Prepare("DELETE FROM  tbl_wishlist WHERE id=?")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	delWish.Exec(wid)

// 	defer db.Close()
// 	c.Redirect(301, "/wishlist")

// }
// func Deletewishlistall(c *gin.Context) {
// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]

// 	fmt.Println("sess user:", userid)

// 	if userid == nil {
// 		c.Redirect(301, "/")
// 	}
// 	db := mysqldb.SetupDB()
// 	delWish, err := db.Prepare("DELETE FROM  tbl_wishlist WHERE user_id=?")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	delWish.Exec(userid)

// 	defer db.Close()
// 	c.Redirect(301, "/wishlist")
// }

//TODO CART
func (h *Handler) GetCartItem(c *gin.Context) {
	fmt.Println("get cart product")
}

func (h *Handler) RemoveCartItem(c *gin.Context) {
	fmt.Println("remove cart product")
	// productId := c.Query("id")
	// if productId == "" {
	// 	log.Panicln("product id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
	// 	return
	// }

	// if userId == "" {
	// 	log.Panicln("user id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
	// 	return
	// }
	// // productId,err := getID
	// if err != nil {
	// 	log.Println(err)
	// 	c.AbortWithStatus(http.StatusInternalServerError)
	// 	return
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// defer cancel()
	// err := database.RemoveCartItem(ctx, productId, userId)
	// if err != nil {
	// 	c.IndentedJSON(http.StatusInternalServerError, err)
	// }
	// c.IndentedJSON(200, "Successfully removed item from cart")

}

func (h *Handler) AddCartItem(c *gin.Context) {
	// 	fmt.Println("add cart product")
	// productId := c.Query("id")
	// if productId == "" {
	// 	log.Panicln("product id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("product id is empty"))
	// 	return
	// }

	// if userId == "" {
	// 	log.Panicln("user id is empty")
	// 	_ = c.AbortWithError(http.StatusBadRequest, errors.New("user id is empty"))
	// 	return
	// }
	// // productId,err := getID
	// if err != nil {
	// 	log.Println(err)
	// 	c.AbortWithStatus(http.StatusInternalServerError)
	// 	return
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	// defer cancel()
	// err := database.RemoveCartItem(ctx, productId, userId)
	// if err != nil {
	// 	c.IndentedJSON(http.StatusInternalServerError, err)
	// }
	// c.IndentedJSON(200, "Successfully removed item from cart")

}

// func Addtoorder(c *gin.Context) {

// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]

// 	if userid == nil {
// 		c.Redirect(301, "/")
// 	} else {
// 		db := mysqldb.SetupDB()
// 		fmt.Println("sess uid", userid)
// 		pid := c.Request.PostFormValue("product_id")
// 		fmt.Println("pid:", pid)

// 		created_date := time.Now().Format("Jan 2, 2006 03:04:05 PM")

// 		quantity := 1

// 		var count int

// 		_ = db.QueryRow("SELECT count(product_id) cnt FROM tbl_orders WHERE user_id = ? AND product_id = ?", userid, pid).Scan(&count)

// 		if count != 1 {
// 			insOrder, err := db.Prepare("INSERT INTO  tbl_orders(product_id,user_id,quantity,created_date) VALUES(?,?,?,?)")

// 			if err != nil {
// 				fmt.Println(err)
// 			}
// 			insOrder.Exec(pid, userid, quantity, created_date)

// 			var ordercount int
// 			_ = db.QueryRow("SELECT count(id)  FROM tbl_orders WHERE user_id = ? ", userid).Scan(&ordercount)

// 			m := map[string]interface{}{
// 				"msg":   "Added in your Cartlist",
// 				"count": ordercount,
// 			}

// 			json.NewEncoder(c.Writer).Encode(m)

// 		} else {

// 			m := map[string]interface{}{
// 				"msg": "This product already in your cartlist",
// 			}
// 			json.NewEncoder(c.Writer).Encode(m)
// 		}
// 		defer db.Close()
// 	}

// }

// func Viewmyorders(c *gin.Context) {
// 	session, _ := store.Get(c.Request, "mysession")

// 	userid := session.Values["userid"]

// 	name := session.Values["firstname"]

// 	if userid == nil {
// 		c.Redirect(301, "/")
// 	} else {
// 		db := mysqldb.SetupDB()

// 		fmt.Println("sess user:", userid)

// 		orderRows, err := db.Query("SELECT tbl_orders.created_date	,tbl_orders.id, title,price,image_path FROM tbl_products INNER JOIN tbl_orders ON tbl_orders.product_id=tbl_products.id WHERE tbl_orders.user_id=?", userid)

// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		orderlist := models.Products{}
// 		res2 := []models.Products{}
// 		for orderRows.Next() {
// 			var title, image_path, created_date string
// 			var price float32
// 			var orderid int
// 			err = orderRows.Scan(&created_date, &orderid, &title, &price, &image_path)
// 			if err != nil {
// 				fmt.Println(err)
// 			}

// 			orderlist.Title = title
// 			orderlist.Price = price
// 			orderlist.Imagepath = image_path
// 			orderlist.ID = orderid
// 			orderlist.Createddate = created_date
// 			res2 = append(res2, orderlist)
// 		}
// 		var ordercount int
// 		_ = db.QueryRow("SELECT count(id)  FROM tbl_orders WHERE user_id = ? ", userid).Scan(&ordercount)

// 		c.HTML(200, "myorder.html", gin.H{"orderlist": res2, "orderscount": ordercount, "name": name})

// 		defer db.Close()
// 	}
// }

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

//TODO Order
func (h *Handler) GetOrder(c *gin.Context) {

}
func (h *Handler) GetOrders(c *gin.Context) {

}
func (h *Handler) AddOrder(c *gin.Context) {

}

func (h *Handler) CategoryList(c *gin.Context) {}

func (h *Handler) PasswordForgot(c *gin.Context) {
	var data map[string]string

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &data); !ok {
		return
	}

	token := RandStringRunes(12)
	passwordReset := &model.PasswordReset{
		Email: data["email"],
		Token: token,
	}
	ctx := c.Request.Context()

	err := h.UserService.PasswordForgot(ctx,passwordReset)

	from := "admin@example.com"

	to := []string{
		data["email"],
	}
	url := "http://localhost:3000/reset_password/" + token

	message := []byte("Click <a href=\"" + url + "\">here</a> to reset your password!")

	err = smtp.SendMail("0.0.0.0:1025", nil, from, to, message)

	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "success",
	})
}

func (h *Handler) PasswordReset(c *gin.Context) {
	var data map[string]string

	if ok := bindData(c, &data); !ok {
		return
	}
	if data["password"] != data["password_confirm"] {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Passwords do not match!",
		})
	}
	ctx := c.Request.Context()
	var passwordReset = model.PasswordReset{}
	token := data["token"]

	err := h.UserService.PasswordReset(ctx,token,&passwordReset)
	if err != nil {
		log.Printf("Failed to update user password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "user password update",
	})
}

func (h *Handler) PasswordUpdate(c *gin.Context) {
	var req map[string]string

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &req); !ok {
		return
	}
	if req["password"] != req["password_confirm"] {
		c.Status(400)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "passwords do not match",
		})
	}
	ctx := c.Request.Context()
	authUser := c.MustGet("user").(*model.User)
	u := &model.User{
		UID: authUser.UID,
		Password:req["password"],
	}
	err := h.UserService.PasswordUpdate(ctx,u)
	if err != nil {
		log.Printf("Failed to update user password: %v\n", err.Error())
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "user password update",
	})
}


func RandStringRunes(n int) string {
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

type UserToken struct {
	Id        uint
	UserId    uint
	Token     string
	CreatedAt time.Time
	ExpiredAt time.Time
}
