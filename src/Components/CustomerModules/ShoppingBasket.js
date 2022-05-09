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

const ShoppingBasket=()=>{

    let navigate = useNavigate();

     const goToOrderSummery = () => {

        axios.get(`http://localhost:8088/customer/getCustomerProfile/${userid}`)
            .then(res=>{
                console.log(res)
               localStorage.setItem('customerProfile',JSON.stringify(res.data))
            })
            .catch(err=>{
                console.log(err)
            })

        const custProfile=JSON.parse(localStorage.getItem("customerProfile"))
        console.log(custProfile)
        if(custProfile !== ''){
            navigate('/checkout', {replace: true})
        } else {
             setNotify({
                 isOpen:true,
                 mesg:"Please add billing and shipping address"
             })
        }

     };

      const productDescription = product => e =>  {
        localStorage.setItem("productInfo", JSON.stringify(product));
        navigate('/productDescription', {replace: true})
     };

       const onDelete = basketId => e => {

                 console.log(basketId);
                 axios.delete(`http://localhost:8088/customer/delete/${basketId}`)
                 .then((response) => {
                     var res=response.status
                     console.log(response)
                     console.log(response.status)
                     if (res === 200) {
                         setNotify({
                             isOpen:true,
                             mesg:"Removed from basket"
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
             }

      const [productsList, setProductsList] = useState([]);
      const [totalPrice, setTotalPrice] = React.useState(0);
      const [isLoading, setisLoading] = useState(true)
      const [isEmpty, setIsEmpty] = useState(true)
      const [notify, setNotify] = useState({ isOpen: false, mesg: '' });
      const paperStyle={padding :'20px', width:'90%', margin: 'auto', align: 'center', position:'relative'}
      //const payButton={padding:'5px', align:'center'}

      const myInfo=JSON.parse(localStorage.getItem("myInfo"))
      const userid = myInfo.id;
      React.useEffect(() => {
        axios.get(`http://localhost:8088/customer/getBasket/${userid}`)
      .then((res) => {
             console.log(res.data.basketItems)
             setProductsList([...res.data.basketItems])
             setTotalPrice(res.data.totalCost)

             })
      .then(setisLoading(false));
      console.log(productsList);
    }, [userid]);



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
            <center>
            <Paper elevation={20} style={paperStyle}>
                <h2>Your Shopping Basket</h2>
                <hr/>
                <Grid>
                <Grid item xs={10}>

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
                                    <td><img src={`data:image/png;base64,${product.product.productImage}`} width={150} onClick={productDescription(product.product)} alt="product" style={{cursor: 'pointer'}} /></td>
                                    <td>{product.product.productName}</td>
                                    <td>{product.quantSelected}</td>
                                    <td>Rs. {product.product.price}</td>
                                    <td>Rs. {product.discountedPrice}</td>
                                    <td>
                                        <Button type="submit" variant="contained" color="primary" onClick={onDelete(product.basketId)} >
                                            Remove Product
                                        </Button>
                                    </td>
                                </tr>

                               )
				})


                )}

                </table>

                </Grid>
                <hr/>
                <Grid item xs={5} color="secondary" style={{ padding:"20px", backgroundColor: '#E3F2FD'}}>
                <h4>Sub Total =  Rs. {totalPrice}</h4>

                <h4>Shipping  =  Rs. 0</h4>
                <hr/>
                <h3>Total Price = Rs. {totalPrice}</h3>

                <Button color="primary" variant="contained" onClick={goToOrderSummery} disabled={totalPrice === 0}><PaymentsIcon/> &nbsp;Proceed to payment </Button>

                </Grid>
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

export default ShoppingBasket;