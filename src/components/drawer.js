import { makeStyles, SwipeableDrawer, TextField, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerAction, editCandidateAction, registerUserAction, updateUserAction } from "../store/actions/action";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    form: {
        width: 500,
        margin: 20
    },
    addButton: {
      display: "flex",
      justifyContent: "end"
    },
    formHeader: {
      marginTop: 10,
      display: "flex",
      justifyContent: "space-between",
      '& .MuiTypography-h5':{
        fontWeight: 700
      }
    },
    formBody:{
        marginTop: 20
    },
    formFooter:{
        marginTop: 20,
        display: "flex",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 20,
        right: 30
    },
    button: {
        marginRight: 10
    }
  });


const AdminDrawer = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const open = useSelector(state => state.votingApp.open);
    const drawerName = useSelector(state => state.votingApp.drawerName);
    const editCandidate = useSelector(state => state.votingApp.editCandidate);
    const [candidateObj, setCandidateObj] = useState({
        "firstName":  '',
        "lastName": '',
        "email":  [{type: 'primary', value : ''}],
        "password":  '',
        "phoneId": '',
        "about": '',
    });
    const handleChange = (e) => {
        if(drawerName === "Add")
        {setCandidateObj({
            "firstName": e.target.id === 'firstName' ? e.target.value : candidateObj.firstName,
            "lastName": e.target.id === 'lastName' ? e.target.value : candidateObj.lastName,
            "email": [{type: "primary", value: e.target.id === 'email' ? e.target.value : candidateObj.email[0].value}],
            "password": e.target.id === 'password' ? e.target.value : candidateObj.password,
            "phoneId": e.target.id === 'phoneId' ? e.target.value : candidateObj.phoneId,
            "about": e.target.id === 'about' ? e.target.value : candidateObj.about,
            "religion": '0',
            "company": 'false',
        })}
        else if(drawerName === "Edit"){
            
            setCandidateObj({
            "firstName": e.target.id === 'firstName' ? e.target.value : editCandidate.FirstName,
            "lastName": e.target.id === 'lastName' ? e.target.value : editCandidate.LastName,
            "phoneId": e.target.id === 'phoneId' ? e.target.value : editCandidate.PhoneId,
            "about": e.target.id === 'about' ? e.target.value : editCandidate.About
        })
        }
    }
    const CloseDrawer = () => {
        dispatch(drawerAction(false))
        dispatch(editCandidateAction());
        
    }
    const handleSubmit = async () => {
        if(drawerName === "Edit"){
            await dispatch(updateUserAction(candidateObj,editCandidate.Uid))
        }
        else if(drawerName === "Add"){
        await dispatch(registerUserAction(candidateObj))
        }
        CloseDrawer();
    }
    return (
            <SwipeableDrawer
      anchor="right"
      open={open} 
      onClose={CloseDrawer}
    >
        <div className={classes.form}>

        <div className={classes.formHeader}>
        <Typography variant="h5">{`${drawerName} Candidate`}</Typography>
        <CloseIcon onClick={CloseDrawer}/>
        </div>
        <div className={classes.formBody}>
            <TextField 
                fullWidth
                id="firstName" 
                defaultValue={editCandidate?.FirstName}
                label="First Name" 
                variant="outlined"
                margin="normal" 
                onChange={handleChange}
                />
            <TextField 
                fullWidth
                id="lastName" 
                defaultValue={editCandidate?.LastName}
                label="Last Name" 
                variant="outlined"
                margin="normal" 
                onChange={handleChange}
                />
                
            <TextField 
                fullWidth
                id="email" 
                defaultValue={editCandidate?.Email?.[0]?.Value}
                label="Email Id" 
                variant="outlined" 
                margin="normal"
                disabled = {drawerName === "Edit" ? true : false}
                onChange={handleChange}/>
            <TextField 
                fullWidth
                id="password" 
                label="Password" 
                defaultValue={editCandidate?.Password}
                variant="outlined"
                margin="normal"
                type='password'
                disabled = {drawerName === "Edit" ? true : false}
                onChange={handleChange} />
            <TextField 
                fullWidth
                id="phoneId" 
                label="Contact Number" 
                defaultValue={editCandidate?.PhoneId}
                variant="outlined"
                margin="normal"
                onChange={handleChange} />
            <TextField 
                fullWidth
                id="about" 
                label="About" 
                defaultValue={editCandidate?.About}
                variant="outlined" 
                margin="normal"
                onChange={handleChange}/>

        </div>
        <div className={classes.formFooter}>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            className={classes.button}>
                {`${drawerName === "Edit" ? "Update" : "Submit"}`}
            </Button>
            <Button variant="contained" color="primary" onClick={() => dispatch(drawerAction(false))}>
                Cancel
            </Button>
        </div>
        </div>

    </SwipeableDrawer>
    );
}

export default AdminDrawer;