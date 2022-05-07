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

const useStyles = makeStyles(() => ({
  paper: { minWidth: "90%", minHeight:"90%" },
}));

function SearchBar(props){

  const [inputText, setInputText] = React.useState("");
  const inputHandler = (e) => {
     //convert input text to lower case
     var lowerCase = e.target.value.toLowerCase();
     setInputText(lowerCase);
   };

   const { searchDialog, setSearchDialog } = props;
     let navigate = useNavigate();
     const handleClose = () => {
        setInputText("");
        setSearchDialog({
            isOpen: false
        });
        navigate('/customerHome', { replace: true })
    };


    const classes = useStyles();

  return(
    <Dialog classes={{ paper: classes.paper}}
    open={searchDialog.isOp}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="Products"></DialogTitle>
      <DialogContent>
      <div>
      <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          <br/>
          <hr style={{height:"3px", borderWidth:0, color:"#BEBEBE", backgroundColor:"#BEBEBE"}}></hr>
      <ProductsList input={inputText} />
      </div>
    </DialogContent>
  </Dialog>
)
};
export default SearchBar;