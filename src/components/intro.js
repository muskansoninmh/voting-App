import { makeStyles } from "@material-ui/core";
import React from "react";
import image from '../assests/vote.png';

const useStyles = makeStyles({
    
    root:{
        height: "78.5vh",
        background: "#0b223dfc",
        paddingTop: 100
    },
    img:{
        display: "flex",
        justifyContent: "center"
    }
});

const IntroPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <div className={classes.img}>
            <img src={image} width="30%" height="10%"/>
        </div>
        </div>
    )
}

export default IntroPage;