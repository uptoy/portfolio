// import * as React from "react"
// import {Button, Grid, Typography, TextField} from "@material-ui/core"
import {useForm, SubmitHandler} from "react-hook-form"
// import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import {IAddress} from "pages/checkout"

// interface IProps {
//   handleNext: () => void
//   setAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>
// }

// const AddressForm: React.VFC<IProps> = ({handleNext, setAddress}) => {
//   const {register, handleSubmit} = useForm<IAddress>()

//   const onSubmit: SubmitHandler<IAddress> = (formData) => {
//     handleNext()
//     setAddress(formData)
//   }

//   return (
//     <>
//       <Typography variant="h6" gutterBottom>
//         Shipping address
//       </Typography>
//       <form noValidate onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="first_name"
//               label="First name"
//               fullWidth
//               variant="outlined"
//               {...register("first_name")}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="last_name"
//               label="Last name"
//               fullWidth
//               variant="outlined"
//               {...register("last_name")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               id="address1"
//               label="Address line 1"
//               fullWidth
//               variant="outlined"
//               {...(register("address1"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               id="address2"
//               label="Address line 2"
//               fullWidth
//               variant="outlined"
//               {...(register("address2"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="city"
//               label="City"
//               fullWidth
//               variant="outlined"
//               {...(register("city"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="state"
//               label="State/Province/Region"
//               fullWidth
//               variant="outlined"
//               {...(register("state"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="zip"
//               label="Zip / Postal code"
//               fullWidth
//               variant="outlined"
//               {...(register("zip"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               id="country"
//               label="Country"
//               fullWidth
//               variant="outlined"
//               {...(register("country"),
//               {
//                 required: true,
//               })}
//             />
//           </Grid>
//         </Grid>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "right",
//             alignItems: "center",
//             marginTop: 20,
//           }}
//         >
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             style={{
//               marginTop: 10,
//               marginLeft: 10,
//               width: "7em",
//               height: "3.4em",
//             }}
//           >
//             <div style={{display: "flex", alignItems: "center"}}>
//               <p style={{margin: 5}}>Save</p>
//               <ArrowForwardIos style={{margin: 5}} />
//             </div>
//           </Button>
//         </div>
//       </form>
//     </>
//   )
// }

// export default AddressForm

import React, {useState} from "react"

interface IForm {
  email: string
  password: string
}

const AddressForm = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const {
    register,
    getValues,
    formState: {dirtyFields},
    watch,
    handleSubmit,
  } = useForm<IForm>()
  // const handleEmailChange = (event: any) => {
  //   setEmail(event.target.value)
  // }

  // const handlePasswordChange = (event: any) => {
  //   setPassword(event.target.value)
  // }
  const onSubmit: SubmitHandler<IForm> = (formData) => {
    console.log("formData", formData)
    // handleNext()
    // setAddress(formData)
  }
  // const watchAllFields = watch()
  // console.log("watchAllFields", watchAllFields)
  // const watchEmail = watch("email", "")
  // const watchPassword = watch("password", "")
  // console.log("watchEmail", watchEmail)
  // const emailValue = getValues("email")
  console.log("dirtyFields", dirtyFields.email && dirtyFields.password)
  // console.log("emailValue")

  // const handleSubmit = (event: any) => {
  //   event.preventDefault()
  //   alert(`Your state values: \n
  //           email: ${email} \n
  //           password: ${password} \n
  //           You can replace this alert with your process`)
  // }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email address</label>
          <input type="email" placeholder="Enter email" {...register("email")} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter password" {...register("password")} />
        </div>
        <button type="submit" disabled={(dirtyFields.email && dirtyFields.password) !== true}>
          Login
        </button>
        {/* <button type="submit">Login</button> */}
      </form>
    </>
  )
}

export default AddressForm
