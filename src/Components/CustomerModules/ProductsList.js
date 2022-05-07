import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


function ProductsList(props) {

    const [productsList, setProductsList] = useState([]);
    React.useEffect(() => {
        console.log("in products list------------------");

      fetch(`http://localhost:8088/product/getAllProducts`)
            .then((res) => res.json())
            .then((data) => setProductsList([...data]));

            console.log(productsList);

    }, []);

    const showProduct = info => e => {
        console.log("in show product")
        localStorage.setItem("productInfo", JSON.stringify(info));
        window.location.href="/ProductDescription"
    }

    //create a new array by filtering the original array
    const filteredData = productsList.filter((el) => {
        //if no input the return the original

        if (props.input === '') {
            return "";
        }
        //return the item which contains the user input
        else {
            return el.productName.toLowerCase().includes(props.input)
        }
    })


    return (

        <div>

             { filteredData.map(product => (

                            <div class="container">

                            <Card sx={{ width: 250, alignItems:"center", margin:"10px", backgroundColor:"#CAFFBF"}} key={product.id}>
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
                                <Typography variant="body2" color="textPrimary">
                                <tr>

                                <td>Sell Price Per Unit:</td><td> Rs.{product.price}</td>
                                </tr>
                                </Typography>
                                </tbody></table>
                                </CardContent>
                            </CardActionArea>
                                </Card>
                            </div>

            ))
                }
        </div>


    )
}

export default ProductsList