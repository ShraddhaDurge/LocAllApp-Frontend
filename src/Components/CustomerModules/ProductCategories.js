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
import CategorywiseProducts from "./CategorywiseProducts";

const ProductCategories=()=>{
    const [viewAllP, setViewAllP] = useState({ openViewAll: false });

    let navigate = useNavigate();

    const categoryProducts = category => e =>  {
      localStorage.setItem("categoryName", JSON.stringify(category));
        setViewAllP({
          openViewAll: true
        })
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

      const [categoryList, setCategoryList] = useState([]);
      const [isLoading, setisLoading] = useState(true)
        const pincode=JSON.parse(localStorage.getItem("customerPincode"))
      React.useEffect(() => {

          fetch(`http://localhost:8088/product/getProductCategories/${pincode}`)
        .then((res) => res.json())
        .then((data) => setCategoryList([...data]))
        .then(setisLoading(false));

        console.log(categoryList);

      }, [pincode]);

    return(

        <Grid>
            <Typography variant='h5' color="primary" align="center" >Product Categories</Typography>
            <br />
            <br />
            <Carousel responsive={responsive}>

                        {isLoading ? (
                        <div className='spinner-border text-primary' role='status'>
                        {' '}
                        <span className='sr-only'>Loading...</span>{' '}
                        </div>
                    ) : (

				categoryList.map(category => {
                            return(
                                <div class="container">

                                <Card sx={{ minWidth: 300, maxWidth: 500, alignItems:"center", margin:"10px",backgroundColor:"#FFCCBC"}} key={category.category}>
                                <CardActionArea onClick={categoryProducts(category.category)}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    width="300"
                                    image={`data:image/png;base64,${category.image}`}
                                    alt="img of product"
                                    />
                                    <CardContent>
                                        <table><tbody><tr>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <td> {category.category}</td>
                                    </Typography></tr>
                                    </tbody></table>
                                    </CardContent>
                                </CardActionArea>
                                    </Card>
                                </div>
                            )
				})

                )}


            </Carousel>


        <CategorywiseProducts viewAllP={viewAllP}
            setViewAllP={setViewAllP} />

    </Grid>
)

}

export default ProductCategories;