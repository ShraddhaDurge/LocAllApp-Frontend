import { React, useState, Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, TextField, Button, makeStyles, Box, Card, CardContent } from '@material-ui/core';
import { Form, Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';



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
			if (!DataisLoaded) return <div>
					<h1> Pleses wait some time.... </h1> </div> ;


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
            						//setSuccess(true);
            						//setMesg(response.data.message);
            						//setOpen(true);
            						//navigate('/adminHome', { replace:true })
            						console.log("accepted")
            				}

            		})
            		.catch((error) => {
            				if (error.response.status === 400) {
            						console.log(error.response.data.message);
            						//setOpen(true);
            						//setMesg(error.response.data.message);
            				}
            				else {
            						//setOpen(true);
            						//setMesg("Something went wrong");
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
				window.location.reload()
            };

			return (
			<div className = "App">
				<div>
      		<h1>Welcome to Vendor Verification!</h1><br /><br />

    		</div>

					{

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
													<img src={`data:image/png;base64,${item.license}`} width={200}  onClick={show(item.license)} />
													</Link>
													</td>

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
                 				 	</center>
								</Form>
          		)}
			 </Formik>

					}
					<button><Link to="/adminHome" className="btn btn-primary">Back to Home Page</Link></button>
			</div>
			);
	}
}
export default VendorVerification;