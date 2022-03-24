import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper,Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../Images/logo1.png';
import Homebar from "./Homebar";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import Image from '../Images/3.png';
import Tagline from '../Images/6.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { HashLink as Link } from 'react-router-hash-link';

const RecommendedProducts=()=>{

    let navigate = useNavigate();

      const productDescription = product => e =>  {
       localStorage.setItem("productInfo", JSON.stringify(product));
       navigate('/productDescription', {replace: true})
    };

      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const [productsList, setProductsList] = useState([]);
            const [isLoading, setisLoading] = useState(true)
            React.useEffect(() => {

              fetch(`http://localhost:8088/product/getMostPopularProducts`)
            .then((res) => res.json())
            .then((data) => setProductsList([...data]))
            .then(setisLoading(false));

            console.log(productsList);
          }, []);

    return(

        <Grid>

            <Typography variant='h5' color="primary" align="center" >Top picks for you</Typography>

            <br />
            <br />
            <Carousel responsive={responsive}>

                        {isLoading ? (
                        <div className='spinner-border text-primary' role='status'>
                        {' '}
                        <span className='sr-only'>Loading...</span>{' '}
                        </div>
                    ) : (

				productsList.map(product => {
                            return(
                                <div class="container">

                                <Card sx={{ minWidth: 250, maxWidth: 400, alignItems:"center", margin:"10px",backgroundColor:"#D1C4E9"}} key={product.id}>
                                <CardActionArea onClick={productDescription(product)}>
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
                                    <Typography variant="body2" color="text.secondary">
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


            </Carousel>

    </Grid>
)

}

export default RecommendedProducts;