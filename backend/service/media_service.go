package service

import (
	"backend/model"
	"backend/utils"
	"bytes"
	"io/ioutil"
	"mime/multipart"
)

type mediaService struct {
}

type MediaServiceConfig struct {
}

func NewMediaService(c *MediaServiceConfig) model.MediaService {
	return &mediaService{}
}

func (s *mediaService) FileUpload(file *multipart.FileHeader) (string, error) {

	f, err := file.Open()
	if err != nil {
		return "err", err
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		return "err", err
	}
	uploadUrl, err := utils.ImageUploadHelper(bytes.NewBuffer(b))
	if err != nil {
		return "", err
	}
	return uploadUrl, nil
}

func (s *mediaService) RemoteUpload(url model.Url) (string, error) {
	// //validate
	// err := validate.Struct(url)
	// if err != nil {
	// 	return "", err
	// }
	// var err error

	//upload
	// uploadUrl, errUrl := utils.ImageUploadHelper(url.Url)
	// if errUrl != nil {
	// 	return "", err
	// }
	// return uploadUrl, nil
	return "", nil
}
