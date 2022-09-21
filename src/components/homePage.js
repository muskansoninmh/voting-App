import { Button, FormControl, InputBase, InputLabel, makeStyles, Typography } from "@material-ui/core";
import { useLRAuth } from "loginradius-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateListAction, isVotedAction, updateUserAction } from "../store/actions/action";
import Select from '@material-ui/core/Select';
import background from '../assests/background.png'

const useStyles = makeStyles({
    root: {
        padding: "20px",
        
    },
    voteContainer: {
      display: "grid",
      justifyContent: "center"
    },
    formControl: {
        minWidth: 400,
      },
      buttonGrid:{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
       
      }, 
      button: {
        width: 100
      },
      img: {
        height: 280,
        display: "flex",
        justifyContent: "center"
      }
});

const HomePage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { isAuthenticated,user } =
    useLRAuth();
    const candidateList = useSelector(state => state.votingApp.candidateList);
    const isVoted = useSelector(state => state.votingApp.isVoted);
    const [candidateId, setCandidateId] = React.useState('');
    
    useEffect(() => {
       if(isAuthenticated){
         dispatch(getCandidateListAction(user?.Uid));
        }
    },[isAuthenticated])

    const handleChange = (event) => {
        const id = event.target.value;
        setCandidateId(id)
      };
      const updateProfile = async () => {
        const res = await dispatch(updateUserAction({ company: "true" }, user.Uid));
        res === 200 && dispatch(isVotedAction());


      }
    const handleVote = async function () {
        const candidateToVote = candidateList.filter((obj) => obj.Uid === candidateId);
        const votes = Number(candidateToVote?.[0].TotalVotes) === candidateList?.length ?
         Number(candidateToVote?.[0].TotalVotes) :
         Number(candidateToVote?.[0].TotalVotes) + 1;
        const votersList = candidateToVote?.[0].VotedList + ` , ${user?.FirstName}`
        await dispatch(updateUserAction({ religion: votes, political: votersList }, candidateId));
        setTimeout(updateProfile,1000);
    }
    return (
        <div className={classes.root}>
            <Typography variant="h2">
            Hello, {user?.FullName}
            </Typography>
           
            <div className={classes.voteContainer}>
              <div className={classes.img}>
              <img src={background}  height= "80%"/>
              </div>
            {!(user?.Company === "false" && !isVoted) && <Typography variant="h6" align="center">
                You have Already Voted
              </Typography>}
            <div>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Select Candidate</InputLabel>
        <Select
          native
          onChange={handleChange}
          value={candidateId}
        > <option aria-label="None" value="" />
            {candidateList.map((obj) => (
                <option value={obj?.Uid} key={obj?.totalVotes}>{obj?.FirstName}</option>
            ))}
        </Select>
        </FormControl>
        </div>
        <div className={classes.buttonGrid}>

        <Button 
        className={classes.button}
        variant="contained"
         color ="primary"
          disabled={(user?.Company === "false" && !isVoted)? false : true }
           onClick={handleVote}>

            Vote
        </Button>
        </div>
        </div>
        </div>

    );
}

export default HomePage;