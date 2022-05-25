// import {makeStyles} from "@material-ui/styles"
// import React from "react"
// import ImageUploading, {ImageListType} from "react-images-uploading"
// import AddIcon from "@material-ui/icons/Add"
// import CancelIcon from "@material-ui/icons/Cancel"
// import axios from "axios"
// import {Grid} from "@material-ui/core"
// const BaseURL = "http://localhost:8080/api"

// const useStyles: any = makeStyles(() => ({
//   upload: {
//     padding: "1em",
//     borderWidth: 2,
//     borderRadius: 5,
//     outline: "none",
//     borderStyle: "dashed",
//     backgroundColor: "#fafafa",
//     color: "black",
//     fontWeight: "bold",
//     fontSize: "1em",
//     width: "100%",
//     minHeight: "15em",
//   },
//   show: {
//     display: "grid",
//     gap: 30,
//     gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
//     width: "100%",
//     // padding: "1em 0",
//     marginTop: "0.2em",
//   },
//   cancel: {
//     position: "absolute",
//     bottom: "85%",
//     left: "85%",
//     backgroundColor: "white",
//     borderRadius: "50%",
//   },
//   imageItem: {
//     position: "relative",
//     width: "7em",
//     height: "7em",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
// }))

export function ImageUpload() {
  const classes = useStyles()
  const [images, setImages] = React.useState([])
  const maxNumber = 5
  //alert

  const onChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[])
    const newImageArr = Array.from(imageList).filter((_f, i) => addUpdateIndex?.includes(i))
    const formData = new FormData()
    newImageArr.forEach((file: any) => formData.append("file", file))
    console.log(newImageArr)
    try {
      await fetch(`${BaseURL}/products`, {
        method: "POST",
        headers: {"content-type": "multipart/form-data"},
        credentials: "include",
        body: JSON.stringify(formData),
      })
    } catch (e) {
      console.log(e)
    }
  }
  const onErrorImageUploading: any = (
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
    if (errors.maxNumber) alert("Register Max 5")
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
        {({imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps}) => (
          <Grid
            className="upload__image-wrapper"
            container
            style={{justifyContent: "space-between", gap: 20}}
          >
            <Grid item sm={12} style={{width: "100%"}}>
              <button
                className={classes.upload}
                style={isDragging ? {color: "red"} : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <p>Click or Drop images here</p>
                <AddIcon />
              </button>
            </Grid>
            <Grid item sm={12} style={{width: "67%"}}>
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
            </Grid>
          </Grid>
        )}
      </ImageUploading>
    </div>
  )
}
