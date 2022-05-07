import {React, useState, useEffect, useReducer,Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
//import Footer from "./Footer";
import Snack from '../Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VendorSidebar from "./VendorSidebar";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ViewAllProducts from "./ViewAllProducts";
import Image from '../Images/Inventory-Management2.jpg';
//import Image from '../Images/Inventory5.png';
const InventoryManagement=()=>{

     const paperStyle={width:"72%", height:"99%", margin:"0px 330px"}
     const headStyle={margin:0,fontFamily:'san-serif',color:'blue'}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const imgstyle={height:100,width:180}
    const gridStyle={backgroundColor: '#E3F2FD',height:528 ,margin:"0px 0px",padding :'20px 0px'}
    const gridItem= {border: '1px solid lightgray', borderRadius: '20px', backgroundColor: '#Faf0e6', marginTop: '1px', width: 300, marginLeft: '30px'}
    const crudButtonStyle= { margin: '20px', align:'center', alignItems:"center" }
    const root= {marginLeft: '3px'}
    const [notify, setNotify] = useState({ isOpen: false, mesg: "" });
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);
    const [success,setSuccess]=useState(false);
    const [dele, setDelete] = useState({ isOp: false });
    const [add, setAdd] = useState({ open: false });
    const [editp, setEditp] = useState({ openEdit: false });
    const [viewAllP, setViewAllP] = useState({ openViewAll: false });
    const info2=JSON.parse(localStorage.getItem("businessInfo"));
    let navigate = useNavigate();

const handleDialogue = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);
  };
  const deleteProduct = () => {
  var canDelete=true;
       if(info2.status === 'Pending'){
          canDelete= false;
          setNotify({
              isOpen: true,
               mesg: "Please try again after getting verified!"
            })
       }
    setDelete({
      isOp: canDelete

    })

  };

  const addProduct = () => {
    var canAdd=true;
         if(info2.status === 'Pending'){
            canAdd= false;
            setNotify({
                isOpen: true,
                 mesg: "Please try again after getting verified!"
              })
         }
    setAdd({
            open: canAdd

    })
  };

  const editProduct = () => {
  var canEdit=true;
     if(info2.status === 'Pending'){
        canEdit= false;
        setNotify({
            isOpen: true,
             mesg: "Please try again after getting verified!"
          })
     }
    setEditp({
      openEdit: canEdit

    })
  };

  const viewAllProducts = () => {
    var canViewAllProducts=true;
       if(info2.status === 'Pending'){
        canViewAllProducts= false;
          setNotify({
              isOpen: true,
               mesg: "Please try again after getting verified!"
            })
       }
      setViewAllP({
        openViewAll: canViewAllProducts

      })
    };

    return(

        <Grid>
        <VendorSidebar/>
        <Grid style={gridStyle}>


        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
                <Paper style={{backgroundColor:'#00BCD4', backgroundImage: `url(${Image})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height:120, paddingTop:"80px", paddingLeft:"300px", marginBottom:"20px"}}>
                    <Typography variant='h5' color="textPrimary" align="center">Inventory Management</Typography>
                </Paper>
            </Grid>

            <Grid container spacing={1} style={crudButtonStyle}>

                      <Grid item xs={4} style={{margin:'5px 30px 10px 110px'}} >
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#F48FB1', height:120, width: 250}}>
                              <Typography gutterBottom variant="body1"  color="Black" align="center" onClick={addProduct}  style={{ fontSize:18, cursor: 'pointer', padding:'50px 10px'}}>
                                Add Product
                              </Typography>
                        </Paper>

                      </Grid>
                      <Grid item xs={4} style={{margin:'5px 30px 10px 70px'}}>
                        <Paper style={crudButtonStyle} style={{backgroundColor:'#CE93D8', height:120, width: 250}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={editProduct} style={{ fontSize:18, cursor: 'pointer', padding:'50px 10px' }}>
                            Edit Product
                          </Typography></Paper>
                      </Grid>
                      <Grid item xs={4} style={{margin:'5px 30px 10px 110px'}}>
                        <Paper className={crudButtonStyle} style={{backgroundColor:'#80CBC4', height:120, width: 250}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={deleteProduct} style={{ fontSize:18,cursor: 'pointer', padding:'50px 10px' }}>
                            Delete Product
                          </Typography></Paper>
                      </Grid>
                      <Grid item xs={4} style={{margin:'5px 30px 10px 70px'}}>
                        <Paper className={crudButtonStyle} style={{backgroundColor:'#FFE082', height:120, width: 250}}>
                          <Typography gutterBottom variant="body1" color="Black" align="center" onClick={viewAllProducts} style={{ fontSize:18,cursor: 'pointer', padding:'50px 10px' }}>
                            View All Products
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
             <ViewAllProducts viewAllP={viewAllP}
                setViewAllP={setViewAllP} />
    </Grid>
    </Grid>
)

}

export default InventoryManagement;