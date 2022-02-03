import React,{ useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snack from './Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const useStyles = makeStyles((theme) => ({
  gridItem: {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'},
  grid: { margin: 5 }
}));
const InventoryManagement=()=>{
    const paperStyle={padding :'0px 20px 0px 20px',width:800, height:520, margin:"0px 360px"}
    const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}
    const gridItem= {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'}
    const crudButtonStyle= { margin: '20px' }
    const root= {marginLeft: '3px'}
    const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });


    const [success,setSuccess]=useState(false);
    const [mesg,setMesg]=useState('');
    const [open, setOpen] =useState(false);
    const [dele, setDelete] = React.useState({ isOp: false });
    const [add, setAdd] = React.useState({ open: false });
    const [editp, setEditp] = React.useState({ openEdit: false });

    let navigate = useNavigate();

const handleDialogue = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProduct = () => {
    setDelete({
      isOp: true

    })

  };

  const addProduct = () => {
    setAdd({
      open: true

    })
  };

  const editProduct = () => {
    setEditp({
      openEdit: true

    })
  };

    const info1=JSON.parse(localStorage.getItem("myInfo"))
    const info2=JSON.parse(localStorage.getItem("businessInfo"))
    return(

        <Grid>
        <VendorSidebar/>
        <Grid style={gridStyle}>


        <Paper elevation={20} style={paperStyle}>
            <Grid align='center' style={{padding:"30px 10px"}}>

                <Typography variant='h6' color="textSecondary" align="center">Inventory Management</Typography>
            </Grid>
            <br/>

            <Grid container spacing={1} style={crudButtonStyle}>

                      <Grid item xs={6} style={{margin:'10px 10px 10px 180px'}} >
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={addProduct} style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Add Product
                          </Typography></Paper>

                      </Grid>
                      <Grid item xs={6} style={{margin:'10px 10px 10px 180px'}}>
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={editProduct} style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Edit Product
                          </Typography></Paper>
                      </Grid>
                      <Grid item xs={6} style={{margin:'10px 10px 10px 180px'}}>
                        <Paper className={crudButtonStyle} style={{backgroundColor:'#009BFF', height:50}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={deleteProduct} style={{ cursor: 'pointer', padding:'10px 10px' }}>
                            Delete Product
                          </Typography></Paper>
                      </Grid>
                      </Grid>
        </Paper>
        <Snack
                      notify={notify}
                      setNotify={setNotify}
                      />
              <DeleteProduct dele={dele}
                setDelete={setDelete} />
              <AddProduct add={add}
                setAdd={setAdd} />
              <EditProduct editp={editp}
                setEditp={setEditp} />
    </Grid>
    </Grid>
)

}

export default InventoryManagement;