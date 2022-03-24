import React, { Fragment } from 'react'
import { Avatar, Button, Grid, TextField, Box } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import Snack from '../Snackbar';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';


const CategorywiseProducts = (props) => {
    const { viewAllP, setViewAllP } = props;
    console.log("in view alll "+props);
    let navigate = useNavigate();
    const marginTop = { marginTop: '10px', marginBottom: '10px' }
    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, mesg: '' });

    const handleClose = () => {
        setViewAllP({
            openViewAll: false
          })
    };

    const showProduct = info => e => {
        console.log("in show product")
        localStorage.setItem("productInfo", JSON.stringify(info));
        window.location.href="/ProductDescription"
    }

    const [productsList, setProductsList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
     const category=JSON.parse(localStorage.getItem("categoryName"))

    React.useEffect(() => {

      const category=JSON.parse(localStorage.getItem("categoryName"))
      console.log(category);
      axios.get(`http://localhost:8088/product/getCategoryProducts/${category}`)
      .then((res) => {
         setProductsList([...res.data]);
         setisLoading(false);
         console.log(productsList);
      })


    }, [category]);


    return(
        <html>
            <style>{`
            .container{
                display: inline-block;
                flex-direction: row;
                justify-content: flex-end;
                alignItems: center;
            }
            .dialogcontainer {
                align: center;
                font-weight: normal;
                line-height: normal;
            }

            td{
                align: left;
                padding: 5px;
                colspan:2;
            }
            `}</style>
        <body >

        <Fragment>
            <Dialog class="dialogcontainer"
                maxWidth="lg"
                //fullWidth={true}

                open={viewAllP.openViewAll}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >    <center>
                    <DialogTitle id="past-event-dialog-title" style={{backgroundColor:"#9FA8DA"}}>{category}</DialogTitle>

                    <DialogContent style={{backgroundColor:"#9FA8DA", alignItems:"center"}} >
                        <Box >
                        {isLoading ? (
                        <div className='spinner-border text-primary' role='status'>
                        {' '}
                        <span className='sr-only'>Loading...</span>{' '}
                        </div>
                    ) : (

				productsList.map(product => {
                            return(
                                <div class="container">

                                <Card sx={{ maxWidth: 350, alignItems:"center", margin:"10px"}} key={product.id}>
                                <CardActionArea onClick={showProduct(product)}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={`data:image/png;base64,${product.productImage}`}
                                    alt="img of product"
                                    />

                                    <CardContent>
                                        <table><tbody><tr>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <td> {product.productName}</td>
                                    </Typography></tr>
                                    <Typography variant="body2" color="textSecondary">
                                       {/* <tr>
                                    <td>Description:</td><td> {product.productDesc}</td>
                                   </tr>*/} <tr>

                                    <td>Sell Price Per Unit:</td><td> Rs.{product.price}</td>
                                    </tr>{/*<tr>

                                    <td>Available Quantity:</td><td> {product.quantAvailable}</td>
                                    </tr><tr>

                                    <td>Tags:</td><td>   {product.productTags.map((tag, i) => (
                                        <span key={i}>#{tag.tag}    </span>))}</td>
                                    </tr>*/}
                                    </Typography>
                                    </tbody></table>
                                    </CardContent>
                                </CardActionArea>
                                    </Card>
                                </div>
                            )
				})

                )}

                </Box>
                    </DialogContent>
                </center>

                <Snack
                    notify={notify}
                    setNotify={setNotify}
                />

            </Dialog>
        </Fragment>
        </body>
        </html>
    )
}

export default CategorywiseProducts;