import React,{ useState, PureComponent, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography,Card, CardContent,CardActionArea, ListItem, ListItemText } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import ProductWiseSalesChart from "./ProductWiseSalesChart.js";
import SalesReportChart from "./SalesReportChart.js";
import { Table, TableCell, TableBody, TableHead, TableRow, TableContainer } from '@material-ui/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import VendorAnalytics from '../Images/VendorAnalytics.png';

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
      maxWidth: "200px",
      maxHeight: "130px",
      alignItems:"center",
      margin:"10px",
      color: "white",
      backgroundColor:"#9FE2BF",
      borderRadius: '25px'
      },
  card1:{
    maxWidth: "200px",
    maxHeight: "130px",
    alignItems:"center",
    margin:"10px",
    color: "white",
    backgroundColor:"#FFBF00",
    borderRadius: '25px'
    },
    card3:{
      maxHeight: "130px",
      maxWidth: "200px",
      alignItems:"center",
      margin:"10px",
      color: "white",
      backgroundColor:"#FF7F50",
      borderRadius: '25px'
      },
  card4:{
        maxHeight: "130px",
        maxWidth: "200px",
        alignItems:"center",
        margin:"10px",
        color: "white",
        backgroundColor:"#6495ED",
        borderRadius: '25px'
       },
  }
);

const VendorReports=()=>{
     const paperStyle={width:"72%", height:"99%", margin:"0px 330px",overflowY: 'scroll', overflowX: 'hidden'}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}

    const businessInfo=JSON.parse(localStorage.getItem("myBusinessProfile"))
    const classes=useStyles();

    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const [reports,setReports]=useState([]);
    const [topProducts, setTopProducts] =useState([]);
    const [lastProducts, setLastProducts] =useState([]);
    const [noProducts, setNoProducts] =useState(false);
    let navigate = useNavigate();
    const businessId = businessInfo.business_id;
       React.useEffect(() => {
         axios.get(`http://localhost:8088/vendor/getReportAnalytics/${businessId}`)
       .then((res) => {
              console.log(res.data)
              setReports(res.data)
              localStorage.setItem('productSales',JSON.stringify(res.data.productWiseSales))
              localStorage.setItem('monthRevenue',JSON.stringify(res.data.monthWiseRevenue))
              setTopProducts(res.data.vendorTopProducts)
              if(res.data.vendorLastProducts.length !== 0){
                setLastProducts(res.data.vendorLastProducts)
              } else {
                setNoProducts(true);
              }
       })
     }, [businessId]);

    const handleClose = (event, reason) => {
      if(success)
          setOpen(false);
    };

    const showProduct = info => e => {
        console.log("in show product", info)
        axios.get(`http://localhost:8088/product/getByProductName/${info}`)
        .then(res=>{
            console.log(res)
           localStorage.removeItem("productInfo");
           localStorage.setItem("productInfo", JSON.stringify(res.data));
           localStorage.setItem("backButtonLoc", JSON.stringify("VendorReports"));
           navigate('/vendorDisplayProduct', { replace: true })
        })
        .catch(err=>{
            console.log(err)

        })

    }

        const exportCsv = (list) => {
            const csvExporter = new ExportToCsv(options);
            console.log(list)
            csvExporter.generateCsv(list);
        }
    const productSales=JSON.parse(localStorage.getItem("productSales"))
    const monthRevenue=JSON.parse(localStorage.getItem("monthRevenue"))

    return(
    <Grid>
    <VendorSidebar/>
        <Grid style={gridStyle}>

        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"20px 20px", backgroundColor:'#9575CD', backgroundImage: `url(${VendorAnalytics})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height:"20%"}}>
                <Typography variant='h5' color="inherit" align="center" style={{padding:"30px"}}>Reports & Analytics</Typography>
            </Grid>

           <Grid container spacing={2} direction="row" >
                   <Grid item xs={3}>
                       <Card  className={classes.card1}>
                       <CardActionArea>
                             <CardContent>

                               <ListItem alignItems='center'>

                                 <ListItemText>
                                 <center>
                                 <Typography gutterBottom variant="subtitle1" component="h1">
                                 Total Sales
                               </Typography>
                               <Typography gutterBottom variant="h4" component="h2">
                               {reports.totalSales}
                               </Typography>
                               </center>
                                 </ListItemText>
                               </ListItem>

                             </CardContent>
                             </CardActionArea>
                       </Card>

                   </Grid>
                   <Grid item xs={3}>
                       <Card  className={classes.card2}>
                       <CardActionArea>
                             <CardContent>

                               <ListItem alignItems='center'>

                                 <ListItemText>
                                 <center>
                                 <Typography gutterBottom variant="subtitle1" component="h1">
                                  Revenue
                               </Typography>
                               <Typography gutterBottom variant="h4" component="h3">
                               ₹{reports.revenue}
                               </Typography>
                               </center>
                                 </ListItemText>
                               </ListItem>

                             </CardContent>
                             </CardActionArea>
                       </Card>

                   </Grid>
                   <Grid item xs={3}>
                       <Card  className={classes.card3}>
                       <CardActionArea>
                             <CardContent>

                               <ListItem alignItems='center'>

                                 <ListItemText>
                                 <center>
                                 <Typography gutterBottom variant="subtitle1" component="h1">
                                  Total Stocks
                               </Typography>
                               <Typography gutterBottom variant="h4" component="h3">
                               {reports.totalStocks}
                               </Typography>
                               </center>
                                 </ListItemText>
                               </ListItem>

                             </CardContent>
                             </CardActionArea>
                       </Card>

                   </Grid>
                   <Grid item xs={3}>
                       <Card  className={classes.card4}>
                       <CardActionArea>
                             <CardContent>

                               <ListItem alignItems='center'>

                                 <ListItemText>
                                 <center>
                                 <Typography gutterBottom variant="subtitle1" component="h1">
                                 Total Buyers
                               </Typography>
                               <Typography gutterBottom variant="h4" component="h3">
                               {reports.totalBuyers}
                               </Typography>
                               </center>
                                 </ListItemText>
                               </ListItem>

                             </CardContent>
                             </CardActionArea>
                       </Card>
               </Grid>
               </Grid>
               <br />
                  <Typography gutterBottom variant="h6" color="secondary" align="center" >
                                         Analytics
                                     </Typography>
                                     <br />
               <Grid container spacing={1} direction="row">

                   <Grid item xs={6}>
                        <Typography gutterBottom variant="body1" color="textSecondary" align="center" >
                           Product wise Sales &nbsp;&nbsp;<IconButton aria-label="download" onClick={() => exportCsv(productSales)}> <FileDownloadIcon /> </IconButton>
                       </Typography>
                       <ProductWiseSalesChart />
                   </Grid>
                   <Grid item xs={5}>
                      <Typography gutterBottom variant="body1" color="textSecondary" align="center" >
                          Month wise Revenue &nbsp;&nbsp;<IconButton aria-label="download" onClick={() => exportCsv(monthRevenue)}> <FileDownloadIcon /> </IconButton>
                      </Typography>
                        <SalesReportChart />
                   </Grid >
                </Grid >
               <Grid container style={{padding:'20px'}}>

                   <Grid item xs={6} md={12}>
                    <Typography gutterBottom variant="h6" color="secondary" align="center" >
                        Top Selling Products       <IconButton aria-label="download" onClick={() => exportCsv(topProducts)}> <FileDownloadIcon /> </IconButton>
                    </Typography>

                   <TableContainer component={Paper}  className={classes.ncontainer}>
                     <Table className={classes.table} aria-label="simple table">
                       <TableHead>
                         <TableRow>
                           <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Product Name</TableCell>
                           <TableCell align="center" style={{backgroundColor:"#73C6B6"}}>Total Sales</TableCell>
                           <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Revenue </TableCell>
                           <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Inventory </TableCell>
                           <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>See Details </TableCell>
                         </TableRow>
                       </TableHead>

                       <TableBody>

                         {topProducts.map((row) => (

                           <TableRow key={row.firstname}>

                             <TableCell align="center" >{row.productName}</TableCell>
                             <TableCell align="center">{row.totalSales}</TableCell>
                             <TableCell align="center">{row.totalRevenue}</TableCell>
                             <TableCell align="center">{row.inventory}</TableCell>
                             <TableCell align="center"><Button variant="text" color="primary" onClick={showProduct(row.productName)}> see details </Button></TableCell>
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                   </TableContainer>

                   </Grid>


                   <Grid item xs={6} md={12}>
                   <Typography gutterBottom variant="h6" color="secondary" align="center" >
                       Least Selling Products       <IconButton aria-label="download" onClick={() => exportCsv(topProducts)} disabled={noProducts}> <FileDownloadIcon /> </IconButton>
                   </Typography>
                   { !noProducts ? (
                  <TableContainer component={Paper}  className={classes.ncontainer}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Product Name</TableCell>
                          <TableCell align="center" style={{backgroundColor:"#73C6B6"}}>Total Sales</TableCell>
                          <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Revenue </TableCell>
                          <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>Inventory </TableCell>
                          <TableCell align="center"  style={{backgroundColor:"#73C6B6"}}>See Details </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>

                        {lastProducts.map((row) => (

                          <TableRow key={row.firstname}>

                            <TableCell align="center" >{row.productName}</TableCell>
                            <TableCell align="center">{row.totalSales}</TableCell>
                            <TableCell align="center">{row.totalRevenue}</TableCell>
                            <TableCell align="center">{row.inventory}</TableCell>
                            <TableCell align="center"><Button variant="text" color="primary" onClick={showProduct(row.productName)}> see details </Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>) : (
                    <Paper style={{backgroundColor:"#73C6B6"}}>
                    <Typography gutterBottom variant="subtitle1" align="center" >
                        No Least Selling Products!
                   </Typography>
                   </Paper>
                  )}


                  </Grid>

               </Grid>

        </Paper>
        <Snackbar
//        className={classes.root}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={mesg}
        action={
          <Fragment>

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
        />

        {/*<Footer/>*/}
    </Grid>
    </Grid>
)

}

export default VendorReports;
