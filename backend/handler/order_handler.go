package handler

import (
	// "errors"
	"github.com/gin-gonic/gin"
	// "backend/model"
)

// type CreateOrderRequest struct {
// 	Code      string
// 	FirstName string
// 	LastName  string
// 	Email     string
// 	Address   string
// 	Country   string
// 	City      string
// 	Zip       string
// 	Products  []map[string]int
// }

//TODO Order
func (h *Handler) CreateOrder(c *gin.Context) {
}

// 	var req CreateOrderRequest
// 	if ok := bindData(c, &req); !ok {
// 		return
// 	}
// 	type detailsReq struct {
// 		Name    string `json:"name" binding:"omitempty,max=50"`
// 		Email   string `json:"email" binding:"required,email"`
// 		Website string `json:"website" binding:"omitempty,url"`
// 	}
// 	// Should be returned with current imageURL
// 	u := &model.User{
// 		UID:     authUser.UID,
// 		Name:    req.Name,
// 		Email:   req.Email,
// 		Website: req.Website,
// 	}

// 	ctx := c.Request.Context()
// 	err := h.UserService.UpdateDetails(ctx, u)

// 	if err != nil {
// 		log.Printf("Failed to update user: %v\n", err.Error())

// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"order": order,
// 	})
// }

// omitempty must be listed first (tags evaluated sequentially, it seems)
type orderReq struct {
	Name    string `json:"name" binding:"omitempty,max=50"`
	Email   string `json:"email" binding:"required,email"`
	Website string `json:"website" binding:"omitempty,url"`
}

// Details handler
// func (h *Handler) Details(c *gin.Context) {
// 	authUser := c.MustGet("user").(*model.User)

// 	var req detailsReq

// 	if ok := bindData(c, &req); !ok {
// 		return
// 	}

// 	// Should be returned with current imageURL
// 	u := &model.User{
// 		UID:     authUser.UID,
// 		Name:    req.Name,
// 		Email:   req.Email,
// 		Website: req.Website,
// 	}

// 	ctx := c.Request.Context()
// 	err := h.UserService.UpdateDetails(ctx, u)

// 	if err != nil {
// 		log.Printf("Failed to update user: %v\n", err.Error())

// 		c.JSON(apperrors.Status(err), gin.H{
// 			"error": err,
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"user": u,
// 	})
// }

func (h *Handler) GetOrder(c *gin.Context) {

}
func (h *Handler) GetOrderList(c *gin.Context) {
	// authUser := c.MustGet("user").(*model.User)
	// var req detailsReq

	// ctx := c.Request.Context()
	// err := h.UserService.UpdateDetails(ctx, order)

}

func (h *Handler) UpdateOrder(c *gin.Context) {

}

func (h *Handler) DeleteOrder(c *gin.Context) {

}

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
