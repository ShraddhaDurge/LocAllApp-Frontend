import React,{useState,useEffect} from 'react';
import {Grid, Card, Box, Button, CardContent, CardMedia, Typography, makeStyles} from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMesage } from 'formik';
import Homebar from "./Homebar";
//import Footer from './Footer';
import Snack from '../Snackbar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Image from '../Images/2593108.png';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles=makeStyles({
card:{
    backgroundColor:"#81D4FA",
    width:"1000px",
    height:"450px",
    padding:"auto auto",
    margin:"10px 80px",
    boxShadow: '0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)'
}
,button:{
    color:"primary",
    '&:hover':{
        backgroundColor:"#2471A3",
    },
    marginTop:"20px",

}
});

const initialValues = {
          quantSelected: 0
      }

const ProductDescription = (props) => {

    const headStyle = {margin:'0', color:'#6200EE'}
    const [notify,setNotify]=useState({isOpen:false,mesg:''});
    const productInfo = JSON.parse(localStorage.getItem("productInfo"))
    const [itemCount, setItemCount] = React.useState(1);

    const onSubmit = (values, props) => {

        const productId = productInfo.productId

        const Order = {
            productId: productId,
            quantSelected: itemCount
            }

        const dataInfo = JSON.parse(localStorage.getItem("myInfo"))
        const custId = dataInfo.id;
        axios.post(`http://localhost:8088/customer/addToBasket/${custId}`, Order)
        .then((response) => {
            var res=response.status
            console.log(response)
            console.log(response.status)
            if (res === 200) {
                setNotify({
                    isOpen:true,
                    mesg:"Added to basket"
                })
            }
        })
        .catch((error) => {
            if (error.response.status === 400) {
                setNotify({
                    isOpen:true,
                    mesg:error.response.message
                })

            }
            else{
            console.log(error)
            setNotify({
                isOpen:true,
                mesg:"Something went wrong!"
            })}
        });
    };

    const classes=useStyles();
    return(
        <Box>
            <Homebar/>
      <Box m={5}>

            <Grid container  spacing={6} >

                <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.card}>
                          <CardContent>
                          <Grid container spacing={5}>
                             <Grid item xs={6} style={{ margin:'0px 0px', padding:'0px 0px'}}>
                                 <img src={`data:image/png;base64,${productInfo.productImage}`} background_size= "cover" border-radius= "200px" background_repeat= "no-repeat" alt="Event image" height= "480" width="550"/>
                             </Grid>
                            <Grid item xs={4} style={{ margin:'0px auto', padding:'20px 50px', align:"center"}}>
                               <br></br>
                               <Typography gutterBottom variant="h3" component="div" color="primary" >
                                    <b>
                                    {productInfo.productName}
                                    </b>
                               </Typography>
                               <Typography display="inline" gutterBottom variant="h5" component="div">
                                   <CurrencyRupeeIcon/>{productInfo.price} &nbsp;
                                   </Typography>
                                   <Typography display="inline" gutterBottom variant="subtitle1" component="div">
                                       per item
                                  </Typography>
                              <br/>
                              <br/>
                              <Typography gutterBottom variant="h6" component="div" color="textSecondary">
                              Product Description:
                               </Typography>
                              <Typography gutterBottom variant="h6" component="div">
                                    {productInfo.productDesc}
                               </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                  {productInfo.productTags.map((tag, i) => (<span key={i}>#{tag.tag}</span>))}
                                  </Typography>
                                  <br/>
                                  <br/>

                             <Typography gutterBottom variant="h6" component="div">
                                  <Badge color="secondary" badgeContent={itemCount}>
                                            <ShoppingBasketIcon />{" "}
                                          </Badge>
                                          <ButtonGroup>
                                            <Button
                                              onClick={() => {
                                                setItemCount(Math.max(itemCount - 1, 0));
                                              }}
                                            >
                                              {" "}
                                              <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button
                                              onClick={() => {
                                                setItemCount(itemCount + 1);
                                              }}
                                            >
                                              {" "}
                                              <AddIcon fontSize="small" />
                                            </Button>
                                          </ButtonGroup>

                              </Typography>

                                <Button type='submit'  variant="contained" color="primary" disabled={props.isSubmitting}
                                className={classes.button} onClick={onSubmit} >{props.isSubmitting ? "Loading" : "Add to basket"}&nbsp;&nbsp;&nbsp;&nbsp;  <ShoppingBasketIcon /></Button>

                                </Grid>
                            </Grid>
                          </CardContent>
                    </Card>
                </Grid>

            </Grid>
            <Snack
              notify={notify}
              setNotify={setNotify}
              />
      </Box>
    </Box>
    )
}

export default ProductDescription;