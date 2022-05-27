import React,{ useState, PureComponent, useEffect, useReducer,Fragment} from 'react';
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
import logo1 from '../Images/LocAll (8).png';
import axios from 'axios';
import PaymentsIcon from '@mui/icons-material/Payments';
import Snack from '../Snackbar';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@mui/material/Rating';
import moment from "moment";

const PastOrders = () => {

    let navigate = useNavigate();

      const [rating, setRating] = useState(0) // initial rating value
      const [productsList, setProductsList] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      const [isLoading, setisLoading] = useState(true)
      const [isEmpty, setIsEmpty] = useState(true)
      const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
      const paperStyle={padding :'20px', width:'90%', margin: 'auto', align: 'center', position:'relative'}
      const [date, setDate] = useState('');
      const myInfo=JSON.parse(localStorage.getItem("myInfo"))
      const userid = myInfo.id;


     useEffect(() => {
          console.log("in use effect products list------------------");

          axios.get(`http://localhost:8088/customer/viewPastOrders/${userid}`)
                .then((res) =>
                {
                          setProductsList([...res.data]);
                          console.log("product list",productsList);
                          setisLoading(false)
                })



        }, [userid]);

  const productDescription = product => e =>  {
        localStorage.setItem("productInfo", JSON.stringify(product));
        navigate('/productDescription', {replace: true})
     };

    const AddToBasket = (productId) => {
            const Order = {
                productId: productId,
                quantSelected: 1
            }

            axios.post(`http://localhost:8088/customer/addToBasket/${userid}`, Order)
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
                console.log(error)
                setNotify({
                    isOpen:true,
                    mesg:"Something went wrong!"
                })
                });
         };

      const handleRating = (basketId, rate) => {
             console.log(rate);
             setRating(rate);

             axios.get(`http://localhost:8088/customer/saveProductRating/${basketId}/${rate}`)
               .then((res) => {
                      console.log(res.data)
                      setRating(res.data)
                      axios.get(`http://localhost:8088/customer/viewPastOrders/${userid}`)
                            .then((res) => {
                                   console.log(res.data)
                                   setProductsList([...res.data])
                                   })
                      })
               .catch(err=>{
                     console.log(err)
                 });
    };

  return(
        <html style={{height:'100%'}}>
					<style>{`
					    table{
					        table-layout: fixed;
					    }
						th, td{
							padding: 10px;
							max-width: 1000px;
							width: 1000px;
							text-align: left;
						}
					`}</style>
				<body style={{height:'100vh'}}>
        <Grid>
        <Homebar />

            <br/><br/>
            <center>
            <Paper elevation={20} style={paperStyle}>
                <h2>Past Orders</h2>
                <hr/>
                <Grid>
                <Grid item xs={10}>

                <table>
                <tr>
                <th />
                <th>Product</th>
                <th>Quantity</th>
                <th>Purchased Price</th>
                <th>Order Date</th>
                <th>Delivery Status</th>
                <th>Rate the product</th>
                </tr>

                {isLoading ? (
                        <div className='spinner-border text-primary' role='status'>
                        {' '}
                        <span className='sr-only'><h2>No Items in Basket</h2></span>{' '}
                        </div>
                    ) : (


				productsList.map(basketItem => {

                            return(
                                <tr key={basketItem.basketId}>
                                    <td><img src={`data:image/png;base64,${basketItem.product.productImage}`} width={150} onClick={productDescription(basketItem.product)} alt="product" style={{cursor: 'pointer'}} /></td>
                                    <td>{basketItem.product.productName}</td>
                                    <td>{basketItem.quantSelected}</td>
                                    <td>Rs. {basketItem.discountedPrice}</td>
                                    <td>{basketItem.orderTimestamp.substring(0, 10)}</td>
                                    <td>{basketItem.deliveryStatus}</td>
                                    <td>
                                    <Rating
                                      name="simple-controlled"
                                      value={basketItem.productRatingByUser}
                                      onChange={(event, newValue) => {
                                        handleRating(basketItem.basketId, newValue)
                                      }}

                                    />

                                     </td>
                                     <td>
                                        <Button type="submit" variant="contained" color="primary" onClick={() => AddToBasket(basketItem.product.productId)}>
                                            Reorder
                                        </Button>
                                    </td>
                                </tr>

                               )
				})


                )}

                </table>

                </Grid>
                <hr/>

                </Grid>


            </Paper>
            </center>

    </Grid>
    <Snack
        notify={notify}
        setNotify={setNotify}
    />
    </body>
    </html>
)

}

export default PastOrders;