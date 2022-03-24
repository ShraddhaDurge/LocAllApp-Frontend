import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/logo1.png';
import Homebar from "./Homebar";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import logo1 from '../Images/LocAll (8).png';
import axios from 'axios';
import PaymentsIcon from '@mui/icons-material/Payments';
import Snack from '../Snackbar';
import 'react-multi-carousel/lib/styles.css';
import PayPal from './PayPal';

const Checkout=()=>{

    let navigate = useNavigate();
    const goToCustomerProfile = () => {
          navigate('/customerProfile', {replace: true})
         };

      const [productsList, setProductsList] = useState([]);
      const [totalPrice, setTotalPrice] = React.useState(0);
      const [isLoading, setisLoading] = useState(true)
      const [isEmpty, setIsEmpty] = useState(true)
      const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
      const paperStyle={padding :'20px', width:'80%', margin: 'auto', align: 'center', position:'relative'}
      const [checkout, setCheckOut]=useState(false);
      const [orders, setOrders] = useState([]);
      const myInfo=JSON.parse(localStorage.getItem("myInfo"))
      const userid = myInfo.id;

      const order = {
        name: '',
        description: '',
        unit_amount: {
        value: ''
        },
        quantity: ''
      }

      React.useEffect(() => {
        axios.get(`http://localhost:8088/customer/getBasket/${userid}`)
        .then((res) => {
             console.log(res.data.basketItems)
             setProductsList([...res.data.basketItems])
             setTotalPrice(res.data.totalCost)

             localStorage.setItem('totalCost',JSON.stringify(res.data.totalCost))
             })
        .then(setisLoading(false));
        console.log(productsList);

       axios.get(`http://localhost:8088/customer/getCustomerProfile/${userid}`)
                  .then(res=>{
                      console.log(res)
                     localStorage.setItem('customerProfile',JSON.stringify(res.data))
                  })
                  .catch(err=>{
                      console.log(err)

                  })
    }, [userid]);

    const createOrderList = () => {


           productsList.map(product => {
            const order = {
               name: product.product.productName,
               description: product.product.productDesc,
               unit_amount: {
               value: product.discountedPrice
               },
               quantity: product.quantSelected
           }
           this.setState(previousState => ({
               orders: [...previousState.orders, order]
           }));
        })
       localStorage.setItem('order',JSON.stringify(orders))
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
                 <center>
                <h2>Order Summery</h2>
                <Grid style={{ padding:"10px", backgroundColor: '#F1F8E9'}}>
                <Grid item xs={10} >

                <table>
                <tr>
                <th />
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
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
                                    <td><img src={`data:image/png;base64,${product.product.productImage}`} width={150} alt="product" style={{cursor: 'pointer'}} /></td>
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
                <Grid item xs={5} color="secondary">
                <h3>Sub Total =  Rs. {totalPrice}</h3>
                </Grid>

                </Grid>

                <Grid>
                <br/>
                <h2>Current Delivery Address </h2>

                <Typography gutterBottom variant="body1" >
                <table>
                    <tr key={customerProfile.billingAddress}>
                        <td>Billing Address: </td>
                        <td>{customerProfile.billingAddress}</td>
                        <td><Button color="primary" variant="contained" onClick={goToCustomerProfile}>Change</Button></td>

                    </tr>
                    <tr key={customerProfile.billingAddress}>
                        <td>Shipping Address: </td>
                        <td>{customerProfile.shippingAddress}</td>
                        <td><Button color="primary" variant="contained" onClick={goToCustomerProfile}>Change</Button></td>
                    </tr>
                </table>
                </Typography>

                </Grid>
                <br />
                <br />
                {checkout ? ( <PayPal />) : (
                 <Button color="primary" variant="contained" onClick={() => {setCheckOut(true);}}>Checkout </Button>
                  )}
                </center>
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