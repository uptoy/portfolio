import { Grid, Box } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { LineBarChart, BrowserUsage, InfoBox, NewOrders, MonthlySales } from 'src/components/admin'
import { cyan, pink, purple, orange, grey } from '@mui/material/colors'
import { AdminLayout } from 'src/components/dashboard'
import Data from 'src/data'

const cyan600 = cyan['600']
const pink600 = pink['600']
const purple600 = purple['600']
const orange600 = orange['600']
const grey600 = grey['600']


const AdminDashboard = () => {
  // const classes = useStyles()
  return (
    <AdminLayout>
      <Box
        component="div"
        sx={{
          paddingTop: 60,
          padding: 20
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={3}
          >
            <InfoBox Icon={ShoppingCartIcon} spanBgColor={pink600} title="Total Profit" value="1500k" />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={3}
          >
            <InfoBox Icon={ThumbUpIcon} spanBgColor={cyan600} title="Likes" value="4231" />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={3}
          >
            <InfoBox Icon={AssessmentIcon} spanBgColor={purple600} title="Sales" value="460" />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={3}
          >
            <InfoBox Icon={FaceIcon} spanBgColor={orange600} title="New Members" value="248" />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={6}
          >
            <NewOrders data={Data.dashBoardPage.newOrders} />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={6}
          >
            <MonthlySales data={Data.dashBoardPage.monthlySales} />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={6}
          >
            <LineBarChart data={Data.dashBoardPage.lineBarChart} />
          </Grid>
          <Grid
            item
            sx={{
              padding: '1em'
            }}
            xs={12}
            md={6}
          >
            <BrowserUsage data={Data.dashBoardPage.browserUsage} />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default AdminDashboard

// const Sample = () => {
//   return (
//     <>
//       <Typography variant="h3" sx={{}}>
//         Category Edit
//       </Typography>
//       <Box component="div" sx={{}}></Box>
//     </>
//   )
// }
