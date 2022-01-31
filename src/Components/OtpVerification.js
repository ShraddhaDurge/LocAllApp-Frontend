import React, { Component } from 'react'
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core'
import Snack from './Snackbar';
import { useNavigate } from 'react-router-dom';

export default function OtpVerification(props) {

    const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });


    const { otpdialog, setOtpdialog } = props;
     let navigate = useNavigate();

    const handleChange = (e) => {
             const {name, value} = e.target
             this.setState({
             [name]: value
             })
        }

    const handleClose = () => {
        setOtpdialog({
            isOpen: false
        });
    };


    const handleSubmit = (e) => {
            e.preventDefault()
            const code = this.state.otp
            console.log(code)
            window.confirmationResult.confirm(code).then((result) => {
              // User signed in successfully.
              const user = result.user;
              console.log(JSON.stringify(user))
              alert("User is verified")
              // ...
            }).catch((error) => {
              // User couldn't sign in (bad verification code?)
              // ...
            });


    };


    return (
        <Dialog
            fullWidth={true}

            open={otpdialog.isOp}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="enter otp">Enter OTP</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                   <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
                </Grid>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
            <Snack
                notify={notify}
                setNotify={setNotify}
            />

        </Dialog>
    )
}