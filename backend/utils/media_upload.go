package utils

import (
	"io"
	"backend/config"
	"context"
	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"time"
)

func ImageUploadHelper(data io.Reader) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	//create cloudinary instance
	cld, err := cloudinary.NewFromParams(config.EnvCloudName(), config.EnvCloudAPIKey(), config.EnvCloudAPISecret())
	if err != nil {
		return "", err
	}

	//upload file
	uploadParam, err := cld.Upload.Upload(ctx, data, uploader.UploadParams{Folder: config.EnvCloudUploadFolder()})
	if err != nil {
		return "", err
	}
	return uploadParam.SecureURL, nil
}
