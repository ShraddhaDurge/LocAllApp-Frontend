import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import { Dialog} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useNavigate } from 'react-router-dom';
import ProductsList from "./ProductsList";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  paper: { minWidth: "90%", minHeight:"90%" },
}));

function TagProduct(props){

   const { showTagsDialog, setShowTagsDialog } = props;
     let navigate = useNavigate();
     const handleClose = () => {
        setShowTagsDialog({
            isOpen: false
        });
        navigate('/customerHome', { replace: true })
    };

    const [productsList, setProductsList] = useState([]);
    const dataInfo = JSON.parse(localStorage.getItem("TagInfo"))
    const tagName = dataInfo.tag;
    console.log(tagName)
    React.useEffect(() => {
        console.log("in products list------------------");

      fetch(`http://localhost:8088/product/getTagWiseProducts/${tagName}`)
            .then((res) => res.json())
            .then((data) => setProductsList([...data]));

            console.log(productsList);

    }, []);

    const showProduct = info => e => {
        console.log("in show product")
        localStorage.setItem("productInfo", JSON.stringify(info));
        window.location.href="/ProductDescription"
    }


    const classes = useStyles();

  return(
    <Dialog classes={{ paper: classes.paper}}
    open={showTagsDialog.isOp}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="Tags"></DialogTitle>
      <DialogContent>
      <div>
             <Typography gutterBottom variant="h5" component="div">
                 Products containing tag #{tagName}

             </Typography>
             { productsList.map(product => (

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
    </DialogContent>
  </Dialog>
)
};
export default TagProduct;