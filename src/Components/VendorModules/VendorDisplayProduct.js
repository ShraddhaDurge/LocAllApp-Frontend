import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, TextField, Button,Typography, Container } from '@material-ui/core';
import axios from 'axios';

function VendorDisplayProduct(props){
    const paperStyle={padding :'20px', width:'120vh', margin:"20px", align: 'center', position:'relative'}
    const gridStyle={backgroundColor: '#E3F2FD', postion:'fixed', height:'100vh', overflow:'auto', margin:"0px"}
    const btnstyle = { margin:'20px auto',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
    const linkstyle={color:'#FFF', hover: "#000", textDecoration: 'none', cursor: 'pointer', padding:'10px 10px' }
    const pid=JSON.parse(localStorage.getItem("product id"))
    console.log("pid="+pid)

    const productInfo = JSON.parse(localStorage.getItem("productInfo"))
    console.log("productInfo in display= "+productInfo)

    return(
        <html style={{height:'100%'}}>
            <style>{`
						table, th, td{

							border-collapse: collapse;
						}
						th, td{
							align: left;
							padding: 10px;
							max-width: 200px;
						}

					`}</style>
        <body style={{height:'100vh'}}>
        <center>
        <Grid style={gridStyle}>
        <center>
        <Paper elevation={20} style={paperStyle}>
        <Grid align='center' style={{padding:"30px 10px"}}>
            <center>
            <Container>
            <table><tbody><tr>

                <Typography gutterBottom variant="h5" component="div">
                    <td>Product:</td><td> {productInfo.productName}</td>
                </Typography></tr>
                <Typography variant="body2" color="text.secondary">
                    <tr>
                <td>Description:</td><td> {productInfo.productDesc}</td>
                </tr><tr>

                <td>Selling Price Per Unit:</td><td> Rs.{productInfo.price}</td>
                </tr><tr>

                <td>Available Quantity:</td><td> {productInfo.quantAvailable}</td>
                </tr><tr>

                <td>Tags:</td><td>   {productInfo.productTags.map((tag, i) => (
                    <span key={i}>#{tag.tag}    </span>))}</td>
                </tr>
                </Typography>
            </tbody></table>
            <br/>
            <Button type='submit' variant="contained" style={btnstyle} fullWidth>
            <Link to="/inventoryManagement" style={linkstyle}>Go Back</Link>
            </Button>

            </Container>
            </center>
            <br/>
            </Grid >

        </Paper>
        </center>
        </Grid>
        </center>
        </body>
        </html>
        )

}
export default VendorDisplayProduct;