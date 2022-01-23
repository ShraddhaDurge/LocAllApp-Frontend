import React from 'react';
// import Button from '@material-ui/core/Button';
import {Snackbar,makeStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles=makeStyles(theme=>({
  root:{
    top:theme.spacing(9)
  }
}
  ))
export default function SimpleSnackbar(props) {
  const {notify, setNotify} = props;
  const classes=useStyles();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify({
      ...notify,
      isOpen:false});
  };

  return (
    <div>

      <Snackbar
       className={classes.root}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notify.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notify.mesg}
        action={
          <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
