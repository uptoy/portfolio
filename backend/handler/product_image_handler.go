package handler

// import (
// 	"fmt"
// 	"github.com/gin-gonic/gin"
// 	"net/http"
// 	"strconv"
// 	// "path/filepath"
// )

// func (h *Handler) ProductImageBulkInsert(c *gin.Context) {
// 	form, err := c.MultipartForm()
// 	if err != nil {
// 		c.String(http.StatusBadRequest, "get form err: %s", err.Error())
// 		return
// 	}
// 	files := form.File["files"]
// 	productName := form.Value["product_name"][0]
// 	slug := form.Value["slug"][0]
// 	brand := form.Value["brand"][0]
// 	p := form.Value["price"][0]
// 	price, _ := strconv.Atoi(p)
// 	cis := form.Value["count_in_stock"][0]
// 	count_in_stock, _ := strconv.Atoi(cis)
// 	description := form.Value["description"][0]
// 	ci := form.Value["category_id"][0]
// 	category_id, _ := strconv.Atoi(ci)

// 	fmt.Println("files", files)
// 	fmt.Println("productName", productName)
// 	fmt.Println("slug", slug)
// 	fmt.Println("brand", brand)
// 	fmt.Println("price", int64(price))
// 	fmt.Println("count_in_stock", int64(count_in_stock))
// 	fmt.Println("description", description)
// 	fmt.Println("category_id", int64(category_id))
// 	// for _, file := range files {
// 	// 	fmt.Println("file", file)
// 	// 	filename := filepath.Base(file.Filename)
// 	// 	if err := c.SaveUploadedFile(file, filename); err != nil {
// 	// 		c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
// 	// 		return
// 	// 	}
// 	// }
// 	ctx := c.Request.Context()
// 	err1 := h.ProductService.ImageCreate(ctx, files)
// 	fmt.Println("err1", err1)
// 	c.String(http.StatusOK, "Uploaded successfully %d files with fields name=%s and email=%s.")
// }

// 	return func(c *gin.Context) {
// 		//upload
// 		formfile, _, err := c.Request.FormFile("file")
// 		if err != nil {
// 			c.JSON(
// 				http.StatusInternalServerError,
// 				MediaDto{
// 					StatusCode: http.StatusInternalServerError,
// 					Message:    "error",
// 					Data:       map[string]interface{}{"data": "Select a file to upload"},
// 				})
// 			return
// 		}

// 		uploadUrl, err := h.ProductService
// 		if err != nil {
// 			c.JSON(
// 				http.StatusInternalServerError,
// 				MediaDto{
// 					StatusCode: http.StatusInternalServerError,
// 					Message:    "error",
// 					Data:       map[string]interface{}{"data": "Error uploading file"},
// 				})
// 			return
// 		}

// 		c.JSON(
// 			http.StatusOK,
// 			MediaDto{
// 				StatusCode: http.StatusOK,
// 				Message:    "success",
// 				Data:       map[string]interface{}{"data": uploadUrl},
// 			})
// 	}
// }

// func RemoteUpload() gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		var url model.Url

// 		//validate the request body
// 		if err := c.BindJSON(&url); err != nil {
// 			c.JSON(
// 				http.StatusBadRequest,
// 				MediaDto{
// 					StatusCode: http.StatusBadRequest,
// 					Message:    "error",
// 					Data:       map[string]interface{}{"data": err.Error()},
// 				})
// 			return
// 		}

// 		uploadUrl, err := service.NewMediaUpload().RemoteUpload(url)
// 		if err != nil {
// 			c.JSON(
// 				http.StatusInternalServerError,
// 				MediaDto{
// 					StatusCode: http.StatusInternalServerError,
// 					Message:    "error",
// 					Data:       map[string]interface{}{"data": "Error uploading file"},
// 				})
// 			return
// 		}

// 		c.JSON(
// 			http.StatusOK,
// 			MediaDto{
// 				StatusCode: http.StatusOK,
// 				Message:    "success",
// 				Data:       map[string]interface{}{"data": uploadUrl},
// 			})
// 	}
// }

// // package handler

// // import (
// // 	// "fmt"
// // 	// "mime/multipart"
// // 	"net/http"
// // 	// "os"

// // 	"github.com/gin-gonic/gin"
// // 	"github.com/google/uuid"
// // 	"log"

// // 	"path/filepath"
// // )

// // func (h *Handler) ImageLocalSaveMulti(c *gin.Context) {
// // 	form, _ := c.MultipartForm()
// // 	files := form.File["upload[]"]

// // 	for _, file := range files {
// // 		log.Println(file.Filename)
// // 		// Upload the file to specific dst.
// // 		c.SaveUploadedFile(file, "./images/"+uuid.New().String()+filepath.Ext(file.Filename))
// // 	}
// // 	// context.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
// // 	c.JSON(http.StatusOK, gin.H{
// // 		"status": "ok",
// // 		"data":   files,
// // 	})

// // }
// // // type image struct {
// // // 	Image *multipart.FileHeader `form:"image" binding:"required"`
// // // }

// // // func (h *Handler) ImageLocalSave(c *gin.Context) {
// // // 	var imageObj image
// // // 	if err := c.ShouldBind(&imageObj); err != nil {
// // // 		c.String(http.StatusBadRequest, "bad request")
// // // 		return
// // // 	}

// // // 	if err := c.ShouldBindUri(&imageObj); err != nil {
// // // 		c.String(http.StatusBadRequest, "bad request")
// // // 		return
// // // 	}

// // // 	fmt.Println("images/" + imageObj.Image.Filename)
// // // 	uid, _ := uuid.NewRandom()

// // // 	filename := uid.String() + ".png"
// // // 	if err := os.Rename(imageObj.Image.Filename, filename); err != nil {
// // // 		fmt.Println(err)
// // // 	}
// // // 	err := c.SaveUploadedFile(imageObj.Image, "images/"+filename)
// // // 	if err != nil {
// // // 		c.String(http.StatusInternalServerError, "unknown error")
// // // 		return
// // // 	}

// // // 	c.JSON(http.StatusOK, gin.H{
// // // 		"status": "ok",
// // // 		"data":   imageObj,
// // // 	})
// // // }

// // // import (
// // // 	"fmt"
// // // 	"github.com/google/uuid"
// // // 	// "mime/multipart"

// // // 	"github.com/gin-gonic/gin"
// // // 	"net/http"
// // // )

// // // type ImageName struct {
// // // 	NAME string `json:"name"`
// // // }

// // // func (h *Handler) ImageBulkUpload(c *gin.Context) {
// // // 	form, _ := c.MultipartForm()
// // // 	files := form.File["images[]"]
// // // 	var imageNames []ImageName
// // // 	imageName := ImageName{}
// // // 	for _, file := range files {
// // // 		u, err := uuid.NewRandom()
// // // 		if err != nil {
// // // 			fmt.Println(err)
// // // 		}
// // // 		uu := u.String()
// // // 		err1 := h.ImageService.ProductImageToS3(file, uu)
// // // 		if err1 != nil {
// // // 			return
// // // 		}
// // // 		imageName.NAME = uu
// // // 		imageNames = append(imageNames, imageName)
// // // 	}
// // // 	c.JSON(http.StatusOK, gin.H{
// // // 		"image_name": imageNames,
// // // 	})
// // // }

// // // func ImageUpload(c *gin.Context) {
// // // 	var Images productImage
// // // 	if err := c.ShouldBind(&Images); err != nil {
// // // 		c.String(http.StatusBadRequest, "bad request")
// // // 		return
// // // 	}

// // // 	if err := c.ShouldBindUri(&Images); err != nil {
// // // 		c.String(http.StatusBadRequest, "bad request")
// // // 		return
// // // 	}
// // // 	fmt.Println("Images", Images.ProductImage[0].Filename)

// // // 	// filenames := append(filenames, image)
// // // 	// fmt.Println("filenames", filenames)

// // // 	// err := c.SaveUploadedFile(userObj.Avatar, userObj.Avatar.Filename)
// // // 	// if err != nil {
// // // 	// 	c.String(http.StatusInternalServerError, "unknown error")
// // // 	// 	return
// // // 	// }

// // // 	c.JSON(http.StatusOK, gin.H{
// // // 		"status": "ok",
// // // 		"data":   Images,
// // // 	})
// // // }

// // // {
// // // 	"data": {
// // // 			"Id": 0,
// // // 			"Avatar": {
// // // 					"Filename": "2.png",
// // // 					"Header": {
// // // 							"Content-Disposition": [
// // // 									"form-data; name=\"image\"; filename=\"2.png\""
// // // 							],
// // // 							"Content-Type": [
// // // 									"image/png"
// // // 							]
// // // 					},
// // // 					"Size": 172906
// // // 			}
// // // 	},
// // // 	"status": "ok"
// // // }

// // // type productImage struct {
// // // 	ProductImage []*multipart.FileHeader `form:"image" binding:"required"`
// // // }

// // // package handler

// // // import (
// // // 	"fmt"
// // // 	"github.com/gin-gonic/gin"
// // // 	"net/http"
// // // )

// // // func (h *Handler) ImageUploadSingle(c *gin.Context) {
// // // 	file, _ := c.FormFile("file")
// // // 	fmt.Println("file", file)
// // // 	if err := c.SaveUploadedFile(file, "./upload/"+file.Filename); err != nil {
// // // 		fmt.Println(err)
// // // 	}
// // // 	c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
// // // }

// // // func (h *Handler) ImageUploadMulti(c *gin.Context) {
// // // 	form, _ := c.MultipartForm()
// // // 	files := form.File["file[]"]

// // // 	for _, file := range files {
// // // 		if err := c.SaveUploadedFile(file, "./upload/"+file.Filename); err != nil {
// // // 			fmt.Println(err)
// // // 		}
// // // 	}
// // // 	c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))

// // // }
