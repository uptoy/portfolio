package handler

// import (
// 	"backend/model"
// 	"backend/service"
// 	"github.com/gin-gonic/gin"
// 	"mime/multipart"
// 	"net/http"
// )

// type MediaDto struct {
// 	StatusCode int                    `json:"statusCode"`
// 	Message    string                 `json:"message"`
// 	Data       map[string]interface{} `json:"data"`
// }

// func (h *Handler) FileUpload() gin.HandlerFunc {
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
