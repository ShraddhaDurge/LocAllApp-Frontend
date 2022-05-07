import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import Checkbox from '@mui/material/Checkbox';
import { ExportToCsv } from 'export-to-csv';
import csv from '../Images/csv.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import order from '../Images/order.png';

const OrderManagement=()=>{
    const paperStyle={width:"72%", height:"99%", margin:"0px 330px",overflowY: 'scroll'}

    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}

    const myInfo=JSON.parse(localStorage.getItem("myInfo"))
    const businessInfo=JSON.parse(localStorage.getItem("businessInfo"))

    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const [productsList, setProductsList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    const [checked, setChecked] = useState(false);
    const[filterParam, setFilterParam] = useState('');
    const[sortParam, setSortParam] = useState('');
    const[element, setElement] = useState('');
    const[filterSelected, isFilterSelected] = useState(false);
    const [filterList, setFilterList] = useState([]);

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

    let navigate = useNavigate();
          const businessId = businessInfo.business_id;
          React.useEffect(() => {
            axios.get(`http://localhost:8088/vendor/getCustomerOrders/${businessId}`)
          .then((res) => {
                 console.log(res.data)
                 if(res.data.length !== 0){
                    setProductsList([...res.data])
                     localStorage.setItem('filteredList',JSON.stringify([...res.data]))
                     setisLoading(false)
                    }
                 })
          .catch(err=>{
             console.log(err)
         })
        }, [businessId]);

    const handleClose = (event, reason) => {
          setOpen(false);
  };

        const handleChecked = (basketId, check) => {
          setChecked(check);
            axios.get(`http://localhost:8088/vendor/setOrderDeliveredStatus/${basketId}`)
                  .then((res) => {
                         console.log(res.data)
                         axios.get(`http://localhost:8088/vendor/getCustomerOrders/${businessId}`)
                           .then((res) => {
                                  console.log(res.data)
                                  if(res.data.length !== 0){
                                     setProductsList([...res.data])
                                     localStorage.removeItem("filteredList");
                                     localStorage.setItem('filteredList',JSON.stringify([...res.data]))
                                     }
                                  })
                         })
        };
        const handleFilter = (filter) => {

            isFilterSelected(true);
            setisLoading(true);
            console.log(filter)
            localStorage.removeItem("filter");
            setFilterParam(filter)
            if(filter === "Product Name"){
                const para = [...new Set(productsList.map(item => item.productName))];

            localStorage.setItem('filter',JSON.stringify(para))
//                console.log(filterList);
            } else if(filter === "Delivery Status") {
                const para = [...new Set(productsList.map(item => item.deliveryStatus))];
                 localStorage.setItem('filter',JSON.stringify(para))

            } else if(filter === "Area Code") {
                 const para = [...new Set(productsList.map(item => item.shippingAddress.substring(item.shippingAddress.length - 6)))];
                  localStorage.setItem('filter',JSON.stringify(para))
            } else if(filter === "Order Date") {
                 const para = [...new Set(productsList.map(item => item.orderDate.substring(0, 10)))];
                  localStorage.setItem('filter',JSON.stringify(para))
            } else {
                 localStorage.setItem('filteredList',JSON.stringify(productsList))
                 setisLoading(false);
                 isFilterSelected(false);
            }

            const filtered=JSON.parse(localStorage.getItem("filter"))
            console.log(filtered);
        }

        const handleFilterElement = (element) => {
            isFilterSelected(true);
            const filter=JSON.parse(localStorage.getItem("filter"))
            console.log(filterParam);
            console.log(element)
            setElement(element)
            localStorage.removeItem("filteredList");

            if(filterParam === "Product Name"){
                  var filteredProducts = [];
                      productsList.map( product => {
                          if(product.productName === element) {
                              filteredProducts.push(product);
                          }
                      })
                localStorage.setItem('filteredList',JSON.stringify([...new Set(filteredProducts)]))
            } else if(filterParam === "Delivery Status") {
                 var filteredProducts = [];
                      productsList.map( product => {
                          if(product.deliveryStatus === element) {
                              filteredProducts.push(product);
                          }
                      })
                localStorage.setItem('filteredList',JSON.stringify([...new Set(filteredProducts)]))

            } else if(filterParam === "Area Code") {
                    var filteredProducts = [];
                       productsList.map( product => {
                           if(product.shippingAddress.substring(product.shippingAddress.length - 6) === element) {
                               filteredProducts.push(product);
                           }
                       })
                 localStorage.setItem('filteredList',JSON.stringify([...new Set(filteredProducts)]))
            } else {
                 var filteredProducts = [];
                      productsList.map( product => {
                          if(product.orderDate.substring(0, 10) === element) {
                              filteredProducts.push(product);
                          }
                      })
                localStorage.setItem('filteredList',JSON.stringify([...new Set(filteredProducts)]))
            }
            setisLoading(false);
            console.log(filteredList);
        }

        const handleSort = (sortBy) => {
                    setSortParam(sortBy);
                    console.log(sortParam)

                    if(sortBy === "Product Name"){
                        setFilterList(productsList.sort((a, b) => a.productName.localeCompare(b.productName)));
                        console.log(productsList);
                    } else if(sortBy === "Delivery Status") {
                        setFilterList(productsList.sort((a, b) => a.deliveryStatus.localeCompare(b.deliveryStatus)));
                    } else if(sortBy === "Area Code") {
                         setFilterList(productsList.sort((a, b) => a.shippingAddress.substring(a.shippingAddress.length - 6).localeCompare(b.shippingAddress.substring(b.shippingAddress.length - 6))));
                    } else {
                         setFilterList(productsList.sort((a, b) => a.orderDate.localeCompare(b.orderDate)));
                    }
                }

    const exportCsv = () => {
        const csvExporter = new ExportToCsv(options);
        let newArray = filterList.map(function(item) {
            delete item.productImage;
            return item;
        });
        console.log(newArray)
        csvExporter.generateCsv(newArray);
    }

    const filteredList=JSON.parse(localStorage.getItem("filteredList"))
    const filtered=JSON.parse(localStorage.getItem("filter"))
    return(
    <html style={{height:'100%'}}>
        <style>{`
            table{
                table-layout: fixed;
            }
            th, td{
                padding: 10px;
                max-width: "100%";
                width: "95%";
                text-align: left;
            }
        `}</style>
    <body style={{height:'100vh'}}>
    <Grid>
    <VendorSidebar/>
        <Grid style={gridStyle}>

        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"20px 20px", backgroundColor:'#1abda0', backgroundImage: `url(${order})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height:"20%"}}>
                <Typography variant='h5' color="inherit" align="center" style={{padding:"30px"}}>Order Management</Typography>
            </Grid>
            <Grid align="right" style={{padding:"10px"}}>

            <Button variant="outlined" color="success" onClick={exportCsv} style={{minHeight: '40px'}} >Export  <img src={csv} alt="csvfile"/></Button>
            &nbsp;&nbsp;
            <FormControl sx={{  minWidth: 100 }} size="small">
              <InputLabel id="demo-simple-select">Filter By</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple"
                value={filterParam}
                label="Filter Orders By"
                autoWidth
                onChange={(e) => {
                       handleFilter(e.target.value);
                 }}
              >
                <MenuItem value="All">All Orders</MenuItem>
                <MenuItem value="Product Name">Product name</MenuItem>
                <MenuItem value="Delivery Status">Delivery Status</MenuItem>
                <MenuItem value="Area Code">Area Code</MenuItem>
                <MenuItem value="Order Date">Order Date</MenuItem>
              </Select>
            </FormControl>
            &nbsp;&nbsp;
            {filterSelected && (<FormControl sx={{  minWidth: 100 }} size="small">
              <InputLabel id="demo-simple-select">Select {filterParam}</InputLabel>
              <Select
                labelId="demo-simple-select"
                id="demo-simple"
                value={element}
                label="Filter Orders By"
                autoWidth
                onChange={(e) => {
                       handleFilterElement(e.target.value);
                 }}
              >
              {filtered.map((product) => (
                      <MenuItem value={product}>{product}</MenuItem>
                  ))}
              </Select>
            </FormControl>)}
            &nbsp;&nbsp;
                <FormControl sx={{ minWidth: 100 }} size="small">
                  <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortParam}
                    label="Sort Orders By"
                    autoWidth
                    onChange={(e) => {
                           handleSort(e.target.value);
                     }}
                  >
                     <MenuItem value="Product Name">Product name</MenuItem>
                    <MenuItem value="Delivery Status">Delivery Status</MenuItem>
                    <MenuItem value="Area Code">Area Code</MenuItem>
                    <MenuItem value="Order Date">Order Date</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid>

            <table>
            <tr>
            <th />
            <th>Product</th>
            <th>Quantity</th>
            <th>Purchased Price</th>
            <th>Order Date</th>
            <th>Shipping Address</th>
            <th>Delivery Status</th>
            </tr>
            {isLoading ? (
                    <div className='spinner-border text-primary' role='status'>
                    {' '}
                    <span className='sr-only'><h2>No Orders Yet</h2></span>{' '}
                    </div>
                ) : (
                    filteredList.map(basketItem => {

                        return(
                            <tr key={basketItem.id}>
                                <td><img src={`data:image/png;base64,${basketItem.productImage}`} width={100} alt="product" style={{cursor: 'pointer'}} /></td>
                                <td>{basketItem.productName}</td>
                                <td>{basketItem.quantSelected}</td>
                                <td>Rs. {basketItem.discountedPrice}</td>
                                <td>{basketItem.orderDate.substring(0, 10)}</td>
                                <td>{basketItem.shippingAddress}</td>
                                <td>{basketItem.deliveryStatus}
                                <Checkbox
                                        checked={basketItem.deliveryStatus === "Delivered" ? true : false}
                                        onChange={(event, newValue) => {handleChecked(basketItem.id, newValue);}}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        label="Delivered"
                                        disabled = {basketItem.deliveryStatus === "Delivered" ? true : false}
                                      />
                                </td>

                                 <td>

                                </td>
                            </tr>

                           )
            })


            )}

            </table>

            <hr/>

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
    </body>
    </html>
)

}

export default OrderManagement;
