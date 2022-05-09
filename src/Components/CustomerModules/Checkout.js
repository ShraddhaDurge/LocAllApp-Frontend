import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Homebar from "./Homebar";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import logo from '../Images/logo.png';
import axios from 'axios';
import PaymentsIcon from '@mui/icons-material/Payments';
import Snack from '../Snackbar';
import 'react-multi-carousel/lib/styles.css';
import white from '../Images/white.png';
import { createTheme } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
//import Spinner from '../Images/Spinner.gif';
import moment from "moment";
import LoadingButton from '@mui/lab/LoadingButton';
import firebase from '../firebase';

const theme = createTheme({
 typography: {
   body1: {
     fontWeight: 600 // or 'bold'
   }
 }
})

const Checkout=()=>{

    let navigate = useNavigate();
    const goToCustomerProfile = () => {
          navigate('/customerProfile', {replace: true})
         };

      const [productsList, setProductsList] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      const [isLoading, setIsLoading] = useState(true)
      const [isEmpty, setIsEmpty] = useState(true)
      const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
      const paperStyle={padding :'20px', width:'90%', margin: 'auto', align: 'center', position:'relative'}
      const divStyle={ margin: 'auto', align: 'center', justifyContent:"center"}
      const [checkout, setCheckOut]=useState(false);
      const [orders, setOrders] = useState([]);
      const myInfo=JSON.parse(localStorage.getItem("myInfo"))
      const userid = myInfo.id;

       const [loading, setLoading] = useState(false);
      const [order, setOrder] = useState({
        name: '',
        description: '',
        price: '',
        quantity: ''
      });

      useEffect(() => {

        setCheckOut(false);
        axios.get(`http://localhost:8088/customer/getBasket/${userid}`)
        .then((res) => {
             setProductsList([...res.data.basketItems])
             setTotalPrice(res.data.totalCost)
             console.log(productsList)
             localStorage.setItem('totalCost',JSON.stringify(res.data.totalCost))
             setIsLoading(false);
            })

//        console.log(productsList);

    }, [userid]);

const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

 const displayRazorpay = async (amount) => {

    setLoading(true)

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      setNotify({
         isOpen:true,
         mesg:"You are offline... Failed to load Razorpay SDK"
     })
      return;
    }

    const options = {
      key: "rzp_test_OKWL987xFRJxCa",
      currency: "INR",
      amount: amount * 100,
      name: "LocAll",
      description: "Thanks for purchasing!",
      image: logo,

      handler: function (response) {
        console.log(response);
        axios.get(`http://localhost:8088/customer/setOrderPaymentStatus/${userid}`)
               .then(res=>{
                   setLoading(false);
                   console.log(res)

                    setNotify({
                               isOpen:true,
                               mesg:"Payment done Successfully!"
                           })
                   firebase.analytics().logEvent('items_purchased');
                   const myTimeout = setTimeout(navigate('/customerHome', {replace: true}), 10000);
               })
               .catch(err=>{
                   console.log(err)
                   setNotify({
                      isOpen:true,
                      mesg:"Something went wrong"
                  })
               })
      },
      prefill: {
        name: "LocAll",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
    const customerProfile=JSON.parse(localStorage.getItem("customerProfile"))
    return(
        <html style={{height:'100%'}}>
					<style>{`
					    table{
					        table-layout: fixed;
					    }
						th, td{
							padding: 10px;
							max-width: 300px;
							width: 250px;
							text-align: left;
						}
					`}</style>
				<body style={{height:'100vh'}}>
        <Grid>
        <Homebar />


            <Paper elevation={20} style={paperStyle}>

                <Grid container style={divStyle}>
                <Grid item xs={7} style={{ padding:"20px"}}>
                <center>
                <h2>Order Summary</h2>
                </center>
               <hr/>
                <Grid item xs={8} >

                <table>
                <tr>
                <th />
                <th>Product</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Discounted Price</th>
                </tr>

                {isLoading ? (
                        <div className='spinner-border text-primary' role='status'>
                        {' '}
                        <span className='sr-only'><h2>No Items in Basket</h2></span>{' '}
                        </div>
                    ) : (


				productsList.map(product => {
                            return(
                                <tr key={product.basketId}>
                                    <td><img src={`data:image/png;base64,${product.product.productImage}`} width={150} alt="product"/></td>
                                    <td>{product.product.productName}</td>
                                    <td>{product.quantSelected}</td>
                                    <td>Rs. {product.product.price}</td>
                                    <td>Rs. {product.discountedPrice}</td>
                                </tr>

                               )
				})


                )}

                </table>

                </Grid>
                <hr/>
                <br/>
                <center>
                <Grid item xs={10} color="secondary" >
                <Typography variant="h6" style={{fontWeight: 600}}>
                Subtotal:  Rs. {totalPrice}
                </Typography>
                </Grid>
                </center>
                </Grid>

                <Grid item xs={5} style={{padding:"20px", backgroundColor:"#FFECB3", alignItems:"center",justifyContent:"center"}}>
                 <center>
                <br/>
                <Typography gutterBottom variant="h5">
                Payment
                </Typography>

                <Typography gutterBottom variant="body1" >
                <table>
                    <tr key={customerProfile.billingAddress}>
                        <td>Billing Address: {customerProfile.billingAddress}</td>
                        <td><Button color="primary" variant="contained" onClick={goToCustomerProfile}>Change</Button></td>

                    </tr>
                    <tr key={customerProfile.shippingAddress}>
                        <td>Shipping Address: {customerProfile.shippingAddress}</td>
                        <td><Button color="primary" variant="contained" onClick={goToCustomerProfile}>Change</Button></td>
                    </tr>
                </table>
                <br />
                <br />

                </Typography>
                { loading ? (
                        <LoadingButton
                                  size="small"
                                  loading={loading}
                                  loadingPosition="end"
                                  variant="contained"
                                >
                                  Please Wait
                                </LoadingButton>
                    ) : (
                        <Button color="primary" variant="contained" onClick={() => displayRazorpay(totalPrice)}>
                                         Pay using &nbsp; &nbsp; <img src={white} width={150} alt="razorpay"/>
                                         </Button>
                    )
                }

                </center>
                </Grid>

                </Grid>
            </Paper>


    </Grid>
    <Snack
        notify={notify}
        setNotify={setNotify}
    />
    </body>
    </html>
)

}

export default Checkout;