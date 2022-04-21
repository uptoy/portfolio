import SimpleModal from "components/modal/SimpleModal"
import {TextField, Button, Select, MenuItem, FormControl} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {createStyles} from "@material-ui/core/styles"
import React, {useState} from "react"
import theme from "theme"

interface IProps {
  open: boolean
  handleClose(): void
}

const useStyles: any = makeStyles(() =>
  createStyles({
    submit_container: {
      marginLeft: "auto",
      marginTop: "1em",
      width: "9.5em",
    },
    formControl: {
      margin: theme.spacing(1, 0),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

// create
// edit
const ProductManageModal = (props: IProps) => {
  const classes = useStyles()
  const [age, setAge] = React.useState("")
  const handleChange = (event: any) => {
    setAge(event.target.value)
  }

  return (
    <>
      <SimpleModal open={props.open} handleClose={props.handleClose}>
        <p style={{textAlign: "left"}}>Add New Product</p>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="product_name"
          label="Product Name"
          name="product_name"
          autoFocus
        />
        <FormControl fullWidth className={classes.formControl}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{"aria-label": "Without label"}}
          >
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            <MenuItem value={10}>Category1</MenuItem>
            <MenuItem value={20}>Category2</MenuItem>
            <MenuItem value={30}>Category3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="stock"
          label="stock"
          name="stock"
        />
        <div className={classes.submit_container}>
          <Button variant="contained" style={{marginRight: "1em"}} onClick={props.handleClose}>
            Back
          </Button>
          <Button variant="contained">Save</Button>
        </div>
      </SimpleModal>
    </>
  )
}

export default ProductManageModal
