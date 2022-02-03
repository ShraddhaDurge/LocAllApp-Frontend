import React from 'react';
import { Link } from 'react-router-dom';

function DisplayImage(){

    const imageInfo=JSON.parse(localStorage.getItem("image info"))
    localStorage.removeItem("image info")

    if(imageInfo==null){
        return(
            <>
        <center>
            <br/><br/>
            <h2>Cannot Access Image without clicking on License</h2>
        <br/>

        <button><Link to="/vendorVerification" className="btn btn-primary">Go Back</Link></button>
        </center>
        <br/>

        </>
        )
    }

    else
    {
        return(
        <>
        <center>

        <img src={`data:image/png;base64,${imageInfo}`}></img>
        <br/>

        <button><Link to="/vendorVerification" className="btn btn-primary">Go Back</Link></button>
        </center>
        <br/>

        </>
        )
    }

}
export default DisplayImage;