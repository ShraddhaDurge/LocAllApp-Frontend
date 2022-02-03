import { React, useState, Fragment, Component } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
//import { useNavigation } from '@react-navigation/native';
import { Grid, Typography, TextField, Button, makeStyles, Box, Card, CardContent } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import background1 from './bg1.jpg';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import UploadGstCertificate from "./UploadGstCertificate";


class VendorVerification extends Component{

  constructor(props) {
        super(props);
		this.state = {
				items: [],
				DataisLoaded: false
		};
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
			if (!DataisLoaded) return <div>
					<h1> Pleses wait some time.... </h1> </div> ;

  		const onSubmit = (values, props) => {

				console.log("CHECKED VENDORS ON THIS PAGE")
				this.props.history.push('/adminHome');
			}

			const goBack = () => {
				this.props.history.push('/adminHome');
				//navigation('/adminHome', { replace: true })
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
            						setSuccess(true);
            						setMesg(response.data.message);
            						setOpen(true);
            						navigate('/adminHome', { replace:true })
            						console.log("accepted")

            				}

            		})
            		.catch((error) => {
            				if (error.response.status === 400) {
            						console.log(error.response.data.message);
            						setOpen(true);
            						setMesg(error.response.data.message);


            				}
            				else {
            						setOpen(true);
            						setMesg("Something went wrong");
            						console.log(error)
            				}
            		});

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
            					//setSuccess(true);
            					//setMesg(response.data.message);
            					//setOpen(true);
            					//navigate('/adminHome', { replace:true })
            					console.log("accepted successfully!")

            			}

            	})
            	.catch((error) => {
            			if (error.response.status === 400) {
            					console.log(error.response.data.message);
            //					setOpen(true);
            //					setMesg(error.response.data.message);
            //					props.resetForm()

            			}
            			else {
            					//setOpen(true);
            					//setMesg("Something went wrong");
            					console.log(error)
            			}
            	});

            };

			return (
			<div className = "App">
				<div>
      		<h1>Welcome to Vendor Verification!</h1><br /><br />
      		<input type="button" onClick={goBack} value="Back to Home Page" />
    		</div>

					<h1> Fetch data from an api in react </h1>  {

						<Formik onSubmit={onSubmit}>
							{(props) => (
								<Form>
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
													<td>< img src={`data:image/png;base64,${item.license}`} height='100px' width='100px'/></td>

													<td>
													<button type="button" onClick={acceptVendor(item.business_id)}> Accept </button>
													<button type="button" onClick={rejectVendor(item.business_id)}> Deny </button>

													</td>


												</tr>
											)
										})}
										</tbody>
									</table>
									</div>
									<center>
                    <Button type='submit'>Submit</Button>
                  </center>
								</Form>
          		)}
			 </Formik>



					}
			</div>



			);

	}
}
export default VendorVerification;