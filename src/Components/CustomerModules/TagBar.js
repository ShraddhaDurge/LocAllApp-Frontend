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
import TagProduct from './TagProduct';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  paper: { minWidth: "90%", minHeight:"90%" },
}));

function TagBar(props){

   const { searchTagsDialog, setSearchTagsDialog } = props;
     let navigate = useNavigate();
     const handleClose = () => {
        setSearchTagsDialog({
            isOpen: false
        });
        navigate('/customerHome', { replace: true })
    };

    const [tagsList, setTagsList] = useState([]);
    React.useEffect(() => {
        console.log("in tags list------------------");

      fetch(`http://localhost:8088/product/getProductTags`)
            .then((res) => res.json())
            .then((data) => setTagsList([...data]));

            console.log(tagsList);

    }, [1]);

    const [showTagsDialog, setShowTagsDialog] = React.useState({ isOp: false });

    const showTags = info => e => {
        console.log("in show product")
        localStorage.setItem("TagInfo", JSON.stringify(info));

        setShowTagsDialog({isOp:true})

    }


    const classes = useStyles();

  return(
    <Dialog classes={{ paper: classes.paper}}
    open={searchTagsDialog.isOp}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="Tags"></DialogTitle>
      <DialogContent>
      <div>
             <Typography gutterBottom variant="h5" component="div">
                 &nbsp;Select a tag:
             </Typography>
             { tagsList.map(tag => (

                            <div class="container">

                            <Card sx={{ width: 200, alignItems:"center", margin:"5px", backgroundColor:"#CAFFBF"}} key={tag.tagId}>
                            <CardActionArea onClick={showTags(tag)}>


                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        #{tag.tag}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                                </Card>
                            </div>

            ))
                }
            <TagProduct showTagsDialog={showTagsDialog}
          setShowTagsDialog={setShowTagsDialog} />
      </div>
    </DialogContent>
  </Dialog>
)
};
export default TagBar;