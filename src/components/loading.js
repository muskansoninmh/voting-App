import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        margin: "20px"
    },
    formControl: {
        minWidth: 200,
      },
      progressBar:{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 300
      }
});

const Loading =() => {
    const classes = useStyles()
   
        return(
          <div className={classes.progressBar}>
          <CircularProgress size={100} thickness={2.6}/>
        </div>
        )

}
export default Loading;