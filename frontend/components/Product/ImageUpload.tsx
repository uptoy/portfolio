import {makeStyles} from "@material-ui/styles"
import React from "react"
import ImageUploading, {ImageListType} from "react-images-uploading"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"
import axios from 'axios'

const useStyles: any = makeStyles(() => ({
  upload: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    margin: "auto",
    borderWidth: 2,
    borderRadius: 5,
    outline: "none",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "black",
    fontWeight: "bold",
    fontSize: "1em",
    width: "100%",
  },
  show: {
    display: "flex",
    width: "100%",
    padding: "1em 0",
  },
  cancel: {
    position: "absolute",
    bottom: "85%",
    left: "85%",
    backgroundColor: "white",
    borderRadius: "50%",
  },
  imageItem: {
    position: "relative",
    width: "5em",
    height: "5em",
    margin: "0.5em",
  },
  image: {
    width: "100%",
    height: "100%",
  },
}))

export function ImageUpload() {
  const classes = useStyles()
  const [images, setImages] = React.useState([])
  const maxNumber = 6
  //alert

  const onChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log("imageList", imageList)
    setImages(imageList as never[])
    const newImageArr = Array.from(imageList).filter((_f, i) => addUpdateIndex?.includes(i))
    const formData = new FormData()
    newImageArr.forEach((file: any) => formData.append("file", file))
    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {"content-type": "multipart/form-data"},
      })
      // const result = await fetch(`${window.location.origin}/${props.object_type}/${props.id}/upload_image`, {
      //   method: "put",
      //   // headers: { "X-CSRF-Token": document.getElementsByName("csrf-token")[0].getAttribute("content") },
      //   body: formData,
      // })
      // const reader = result.body.getReader()
      // const decoder = new TextDecoder()
      // let resultText = ""
      // let flag = false
      // while (!flag) {
      //   const data = await reader.read()
      //   flag = data.done
      //   resultText += decoder.decode(data.value)
      // }
      // const resultObj = JSON.parse(resultText)
      // setImages(resultObj.map(o => o.image.url))
      // setImageObjects(resultObj)
    } catch (e) {
      console.log(e)
    }
  }
  const onErrorImageUploading = (
    errors: {
      maxFileSize?: boolean
      maxNumber?: boolean
      acceptType?: boolean
      resolution?: boolean
    },
    _files: ImageListType
  ) => {
    if (errors.acceptType) alert("Register PNG・JPG・GIF Only")
    if (errors.maxFileSize) alert("Register ◯MB low")
    if (errors.maxNumber) alert("Register Max 6")
  }

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        maxFileSize={5242880}
        onError={onErrorImageUploading}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          // onImageRemoveAll,
        }) => (
          <div className="upload__image-wrapper">
            <button
              className={classes.upload}
              style={isDragging ? {color: "red"} : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <p>Click or Drop images here</p>
              <AddIcon />
            </button>
            {/* &nbsp; */}
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            <div className={classes.show}>
              {imageList.map((image, index) => (
                <div key={index} className={classes.imageItem}>
                  <img
                    className={classes.image}
                    src={image["data_url"]}
                    alt=""
                    onClick={() => onImageUpdate(index)}
                  />
                  <div>
                    <CancelIcon className={classes.cancel} onClick={() => onImageRemove(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
