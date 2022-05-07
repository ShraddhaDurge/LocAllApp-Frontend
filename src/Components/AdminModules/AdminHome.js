import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography,Card, CardContent,CardActionArea, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import logo from '../Images/logo1.png';
import AdminHomebar from './AdminHomebar'
import graph from '../Images/graph.png';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import DiscountIcon from '@mui/icons-material/Discount';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import TimelineIcon from '@mui/icons-material/Timeline';
import CategoryWiseSalesChart from './CategoryWiseSalesChart';
import MonthWiseRevenue from './MonthWiseRevenue';
import { ExportToCsv } from 'export-to-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@material-ui/core/IconButton';

const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Customer Orders',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

const useStyles = makeStyles({
  card2:{
        minHeight: "200px",
        minWidth: "300px",
      maxHeight: "300px",
      maxWidth: "500px",
      alignItems:"center",
      margin:"30px",
      padding:"20px",
//      color: "black",
//      backgroundColor:"#9FE2BF",
      borderRadius: '25px'
      },
  card1:{
        height: "200px",
        width: "380px",
    alignItems:"center",
         margin:"5px",
//    color: "black",
    backgroundColor:"#B39DDB",
    borderRadius: '25px'
    },
    card3:{
        height: "50%",
        width: "90%",
      maxHeight: "300px",
      maxWidth: "500px",
      alignItems:"center",
           margin:"30px",
            padding:"20px",
//      color: "white",
//      backgroundColor:"#FF7F50",
      borderRadius: '25px'
      },
      card5:{
            height: "130px",
            width: "150px",
            alignItems:"center",
            margin:"5px",
            color: "white",
            backgroundColor:"#7E57C2",
            borderRadius: '25px'
           },
  }
);


const AdminHome=()=>{

  let navigate = useNavigate();
  const classes=useStyles();
    const [reports,setReports]=useState([]);
    const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
    const userid = dataInfo.id;

    useEffect(() => {
           axios.get(`http://localhost:8088/admin/getAnalytics`)
           .then((res) => {
                  console.log(res.data)
                  setReports(res.data)
                  localStorage.setItem('categorySales',JSON.stringify(res.data.categorySales));
                  localStorage.setItem('monthTotalRevenue',JSON.stringify(res.data.monthWiseRevenues));
           })
           .catch(err=>{
                   console.log(err)
               })
         },[userid]);

    const exportCsv = (list) => {
        const csvExporter = new ExportToCsv(options);
        console.log(list)
        csvExporter.generateCsv(list);
    }
    const categorySales=JSON.parse(localStorage.getItem("categorySales"))

    return(

        <Grid style={{margin:"20px"}}>
        <AdminHomebar />
        <Grid >
            <Grid align='center'>
                <Typography variant='h5' color="textSecondary" align="center">Admin Homepage</Typography>
            </Grid>

            <br/>
            <Grid container spacing={1} direction="row" >
               <Grid item xs={4}>
                   <Card  className={classes.card1}>
                   <CardActionArea>
                         <CardContent>
                             <center>
                           <Typography gutterBottom variant="subtitle1" component="h1">
                             Sales Overview
                           </Typography>
                            <Grid container spacing={5} direction="row" >
                              <Grid item xs={6}>
                              <Card  className={classes.card5}>
                                 <CardActionArea>
                                       <CardContent>
                                       <DiscountIcon />
                                            <Typography gutterBottom variant="body1" component="h1">

                                        Total Sales
                                         </Typography>
                                         <Typography gutterBottom variant="h4" component="h1">
                                         {reports.totalSales}
                                         </Typography>
                                       </CardContent>
                                  </CardActionArea>
                              </Card>
                              </Grid>
                              <Grid item xs={6}>
                              <Card  className={classes.card5}>
                                   <CardActionArea>
                                         <CardContent>
                                         <TimelineIcon/>
                                           <Typography gutterBottom variant="body1" component="h1">
                                             Revenue
                                           </Typography>
                                           <Typography gutterBottom variant="h4" component="h1">
                                           {reports.revenue}
                                           </Typography>
                                         </CardContent>
                                    </CardActionArea>
                                </Card>
                                </Grid>
                                </Grid>
                           </center>

                         </CardContent>
                         </CardActionArea>
                   </Card>

               </Grid>
               <Grid item xs={4}>
                   <Card  className={classes.card1}>
                   <CardActionArea>
                         <CardContent>

                             <center>
                             <Typography gutterBottom variant="subtitle1" component="h1">
                              Users Overview
                           </Typography>

                            <Grid container spacing={5} direction="row" >
                              <Grid item xs={6}>
                              <Card  className={classes.card5}>
                                 <CardActionArea>
                                       <CardContent>
                                       <GroupIcon/>
                                            <Typography gutterBottom variant="body1" component="h1">
                                            Total Customers

                                         </Typography>
                                         <Typography gutterBottom variant="h4" component="h1">
                                         {reports.totalCustomers}
                                         </Typography>
                                       </CardContent>
                                  </CardActionArea>
                              </Card>
                              </Grid>
                              <Grid item xs={6}>
                              <Card  className={classes.card5}>
                                   <CardActionArea>
                                         <CardContent>
                                         <StoreIcon/>
                                           <Typography gutterBottom variant="body1" component="h1">
                                            Total Vendors
                                           </Typography>
                                           <Typography gutterBottom variant="h4" component="h1">
                                           {reports.totalVendors}
                                           </Typography>
                                         </CardContent>
                                    </CardActionArea>
                                </Card>
                                </Grid>
                                </Grid>
                           </center>
                         </CardContent>
                         </CardActionArea>
                   </Card>

               </Grid>
               <Grid item xs={4}>
                   <Card  className={classes.card1}>
                   <CardActionArea>
                         <CardContent>
                             <center>
                             <Typography gutterBottom variant="subtitle1" component="h1">
                              Products Overview
                           </Typography>

                           <Grid container spacing={5} direction="row" >
                                 <Grid item xs={6}>
                                 <Card  className={classes.card5}>
                                    <CardActionArea>
                                          <CardContent>
                                           <InventoryIcon />
                                               <Typography gutterBottom variant="body1" component="h1">
                                                Total Products
                                            </Typography>
                                            <Typography gutterBottom variant="h4" component="h1">
                                            {reports.totalProducts}
                                            </Typography>
                                          </CardContent>
                                     </CardActionArea>
                                 </Card>
                                 </Grid>
                                 <Grid item xs={6}>
                                 <Card  className={classes.card5}>
                                      <CardActionArea>
                                            <CardContent>
                                            <CategoryIcon/>
                                              <Typography gutterBottom variant="body1" component="h1">
                                                 Categories
                                              </Typography>
                                              <Typography gutterBottom variant="h4" component="h1">
                                              {reports.totalCategories}
                                              </Typography>
                                            </CardContent>
                                       </CardActionArea>
                                   </Card>
                                   </Grid>
                                   </Grid>
                           </center>

                         </CardContent>
                         </CardActionArea>
                   </Card>

               </Grid>

           </Grid>

    </Grid>
    <br />
          <Typography gutterBottom variant="h5" color="primary" align="center" >
             Analytics
         </Typography>
         <br />
     <Grid container spacing={1} direction="row" style={{margin:"5px"}}>
         <Grid item xs={6}>
            <Paper style={{padding:"5px 0px", width:"640px"}}>
                <Typography gutterBottom variant="subtitle1" color="primary" align="center" >
                   Category wise Sales &nbsp;&nbsp;<IconButton aria-label="download" onClick={() => exportCsv(categorySales)}> <FileDownloadIcon /> </IconButton>
               </Typography>
                <CategoryWiseSalesChart />
            </Paper>
         </Grid>
         <Grid item xs={5} style={{margin:"0px 40px"}}>
             <Paper style={{padding:"5px", width:"540px"}}>
                 <Typography gutterBottom variant="subtitle1" color="primary" align="center" >
                    Month wise Revenue &nbsp;&nbsp;<IconButton aria-label="download" onClick={() => exportCsv(categorySales)}> <FileDownloadIcon /> </IconButton>
                </Typography>
                 <MonthWiseRevenue />
             </Paper>
          </Grid>
    </Grid>
    </Grid>
)

}

export default AdminHome;
