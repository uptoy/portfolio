package handler

// import (
// 	"fmt"
// 	"github.com/aws/aws-sdk-go/aws"
// 	"github.com/aws/aws-sdk-go/aws/awserr"
// 	"github.com/aws/aws-sdk-go/aws/session"
// 	"github.com/aws/aws-sdk-go/service/s3"
// 	"github.com/gin-gonic/gin"
// 	"io/ioutil"
// 	"os"
// 	"strings"
// )

// var (
// 	s3session *s3.S3
// )

// const (
// 	BUCKET_NAME = "portfolio-inoue"
// 	REGION      = "ap-northeast-1"
// )

// func init() {
// 	s3session = s3.New(session.Must(session.NewSession(&aws.Config{
// 		Region: aws.String(REGION),
// 	})))
// }

// func (h *Handler) ListBuckets(c *gin.Context) (resp *s3.ListBucketsOutput) {
// 	resp, err := s3session.ListBuckets(&s3.ListBucketsInput{})
// 	if err != nil {
// 		panic(err)
// 	}
// 	return resp
// }

// func (h *Handler) CreateBucket(c *gin.Context) (resp *s3.CreateBucketOutput) {
// 	resp, err := s3session.CreateBucket(&s3.CreateBucketInput{
// 		Bucket: aws.String(BUCKET_NAME),
// 		CreateBucketConfiguration: &s3.CreateBucketConfiguration{
// 			LocationConstraint: aws.String(REGION),
// 		},
// 	})
// 	if err != nil {
// 		if aerr, ok := err.(awserr.Error); ok {
// 			switch aerr.Code() {
// 			case s3.ErrCodeBucketAlreadyExists:
// 				fmt.Println("Bucket name already in use!")
// 				panic(err)
// 			case s3.ErrCodeBucketAlreadyOwnedByYou:
// 				fmt.Println("Bucket exists and is owned by you!")
// 			default:
// 				panic(err)
// 			}
// 		}
// 	}
// 	return resp
// }

// func (h *Handler) ImageUpload(c *gin.Context) (resp *s3.PutObjectOutput) {
// 	filename := "images/sample.txt"
// 	f, err := os.Open(filename)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println("Uploading:", filename)
// 	resp, err = s3session.PutObject(&s3.PutObjectInput{
// 		Body:   f,
// 		Bucket: aws.String(BUCKET_NAME),
// 		Key:    aws.String(strings.Split(filename, "/")[1]),
// 		ACL:    aws.String(s3.BucketCannedACLPublicRead),
// 	})
// 	if err != nil {
// 		panic(err)
// 	}
// 	return resp
// }

// func (h *Handler) ImageList(c *gin.Context) (resp *s3.ListObjectsV2Output) {
// 	resp, err := s3session.ListObjectsV2(&s3.ListObjectsV2Input{
// 		Bucket: aws.String(BUCKET_NAME),
// 	})
// 	if err != nil {
// 		panic(err)
// 	}
// 	return resp
// }

// func (h *Handler) ImageDownload(c *gin.Context) error {
// 	filename := "sample.txt"
// 	fmt.Println("Downloading: ", filename)
// 	resp, err := s3session.GetObject(&s3.GetObjectInput{
// 		Bucket: aws.String(BUCKET_NAME),
// 		Key:    aws.String(filename),
// 	})
// 	if err != nil {
// 		panic(err)
// 	}
// 	body, _ := ioutil.ReadAll(resp.Body)
// 	err = ioutil.WriteFile(filename, body, 0644)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return nil
// }

// func (h *Handler) ImageDelete(c *gin.Context) (resp *s3.DeleteObjectOutput) {
// 	filename := "sample.txt"
// 	fmt.Println("Deleting: ", filename)
// 	resp, err := s3session.DeleteObject(&s3.DeleteObjectInput{
// 		Bucket: aws.String(BUCKET_NAME),
// 		Key:    aws.String(filename),
// 	})
// 	if err != nil {
// 		panic(err)
// 	}
// 	return resp
// }
