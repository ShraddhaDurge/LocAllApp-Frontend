import { React, useState, Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper, TextField, Button, makeStyles, Box, Card, CardContent } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import logo from '../Images/logo1.png';

class VendorVerification extends Component{

  constructor(props) {
        super(props);
		this.state = {
				items: [],
				DataisLoaded: false
		};
	};

	state = { isOpen: false };

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log('cliked');
  };

	// ComponentDidMount is used to execute the code
	componentDidMount() {
			fetch("http://localhost:8088/admin/vendorsToVerify")
					.then((res) => res.json())
					.then((json) => {
							this.setState({
									items: json,
									DataisLoaded: true,
							});
					})
	}

	render() {
			const { DataisLoaded, items } = this.state;
			//const navigation = useNavigation();
			const paperStyle={padding :'20px', width:'150vh', margin:"20px", align: 'center', position:'relative'}
			const gridStyle={backgroundColor: '#E3F2FD', postion:'fixed', height:'100vh', overflow:'auto', margin:"0px"}
			const btnstyle = { margin:'20px auto', padding:'4px',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#2196F3'}
			const linkstyle={fontSize:"15px", color:'#FFF', hover: "#000", textDecoration: 'none', cursor: 'pointer', padding:'10px 10px' }
			const statustxtstyle={color:'#FFF', hover: "#000", textDecoration: 'none', cursor: 'pointer'}
			const acceptbtnstyle = { margin:'20px auto', padding:'4px',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#77DD77'}
			const denybtnstyle = { margin:'20px auto', padding:'4px',display:'flex',justifyContent:'center',alignItems:'center', width:'30%',height:'20%', backgroundColor: '#FF6961'}



			if (!DataisLoaded) {
				return(
				<html style={{height:'100%'}}>
				<body style={{height:'100vh'}}>
				<center>
				<Grid style={gridStyle}>
				<center>
				<Paper elevation={20} style={paperStyle}>
				<Grid align='center' style={{padding:"30px 10px"}}>
				<Typography variant='h5' color="textSecondary" align="center">No Vendors Pending to Verify</Typography>
				<Button type='submit' variant="contained" style={btnstyle} fullWidth>
				<Link to="/adminHome" style={linkstyle}>Back to Home Page</Link>
				</Button>
				</Grid>
				</Paper>
				</center>
				</Grid>
				</center>
				</body>
				</html>
				);
			}



			const show = license => e => {
				localStorage.setItem('image info', JSON.stringify(license));
				this.props.history.push('/displayImage');
			}

			const acceptVendor = business_id => e => {
            		console.log("Business id: "+business_id)
            		console.log("Status: Accepted")

            		axios.post(`http://localhost:8088/admin/acceptVendor/${business_id}`)
            		.then((response) => {
            				var res = response.status;
            				console.log(response.data)
            				console.log(response.status)
            				if (res === 200) {
//            						setSuccess(true);
//            						setMesg(response.data.message);
//            						setOpen(true);
            						//navigate('/adminHome', { replace:true })
            						console.log("accepted")
            				}

            		})
            		.catch((error) => {
            				if (error.response.status === 400) {
            						console.log(error.response.data.message);
//            						setOpen(true);
//            						setMesg(error.response.data.message);
            				}
            				else {
//            						setOpen(true);
//            						setMesg("Something went wrong");
            						console.log(error)
            				}
            		});
					window.location.reload()
            };

            const rejectVendor = business_id => e => {
            	// param is the argument you passed to the function
            	// e is the event object that returned
            	console.log("Business id: "+business_id)
            	console.log("Status: Accepted")

            	axios.post(`http://localhost:8088/admin/rejectVendor/${business_id}`)
            	.then((response) => {
            			var res = response.status;
            			console.log(response.data)
            			console.log(response.status)
            			if (res === 200) {
//            					setSuccess(true);
//            					setMesg(response.data.message);
//            					setOpen(true);
            					//navigate('/adminHome', { replace:true })
            					console.log("accepted successfully!")

            			}

            	})
            	.catch((error) => {
            			if (error.response.status === 400) {
            					console.log(error.response.data.message);
//            					setOpen(true);
//            					setMesg(error.response.data.message);
//            					props.resetForm()

            			}
            			else {
//            					setOpen(true);
//            					setMesg("Something went wrong");
            					console.log(error)
            			}
            	});
				window.location.reload()
            };

			return (
				<html style={{height:'100%'}}>
					<style>{`
						table, th, td{
							border-color: #E3F2FD;
							border-style:outset;
							border-collapse: collapse;
						}
						th, td{
							align: left;
							padding: 5px;
							max-width: 200px;
						}

					`}</style>
				<body style={{height:'100vh'}}>
				<center>
				<Grid style={gridStyle}>
				<center>
				<Paper elevation={20} style={paperStyle}>
				<Grid align='center' style={{padding:"0px 10px"}}>
					<center>
					 <Grid align='center' style={{padding:"10px 10px"}}>
                         <img src={logo} alt="logo" height="60" width="270" align="center" />
                     </Grid>
                	<Typography variant='h5' color="textSecondary" align="center">Welcome to Vendor Verification</Typography>
            		<br/>

					<Formik>
						{(props) => (
							<Form>
								<center>
								<div className="Table">
								<table>
									<tbody>
									<tr>
										<th>Business Name</th>
										<th>Business Category</th>
										<th>Address</th>
										<th>Pincodes</th>
										<th>GSTIN</th>
										<th>License</th>
										<th>Status</th>
									</tr>

									{items.map((item) => {
										return (
											<tr key={item.business_id}>
												<td>{ item.businessName }</td>
												<td>{ item.businessCategory }</td>
												<td>{ item.address }</td>
												<td>{item.pincodes.map((pincode, i) => (
																	<p key={i}>
																	{pincode.pincode}
																	</p>
																))}
													</td>
												<td>{ item.gstin }</td>
												<td>
												<Link to="/displayImage" className="btn btn-primary">
												<img src={`data:image/png;base64,${item.license}`} width={100}  onClick={show(item.license)} />
												</Link>
												</td>

												<td>
												<Button type='submit' variant="contained" backgroundColor="#81C784" style={acceptbtnstyle} fullWidth onClick={acceptVendor(item.business_id)}>
												<Typography variant='subtitle2' style={statustxtstyle} align="center">
													Accept
												</Typography>
												</Button>

												<Button type='submit' variant="contained" style={denybtnstyle} fullWidth onClick={rejectVendor(item.business_id)}>
												<Typography variant='subtitle2' style={statustxtstyle} align="center">
													Deny
												</Typography>
												</Button>
												{/*
												<button type="button" onClick={acceptVendor(item.business_id)}> Accept </button>
												<button type="button" onClick={rejectVendor(item.business_id)}> Deny </button>
												*/}
												</td>
											</tr>
										)
									})}
									</tbody>
								</table>
								</div>
								</center>
							</Form>
						)}
					</Formik>

					<Button type='submit' variant="contained" style={btnstyle} fullWidth>
            		<Link to="/adminHome" style={linkstyle}>Back to Home Page</Link>
            		</Button>
					</center>
           	<br/>
            </Grid >


        </Paper>
        </center>
        </Grid>
        </center>

        </body>
        </html>
			);
	}
}
export default VendorVerification;