import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useLRAuth } from "loginradius-react";
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "rgba(52, 52, 52, 0.8)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));

export default function VotingAppBar() {
  const classes = useStyles();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
  useLRAuth();
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title} onClick={() => navigate('/')}>
            Voting App
          </Typography>
          {user?.Roles.includes("Admin") && <Button color="inherit" onClick={() => navigate('/admin')}>Admin Panel</Button>}
          {!isAuthenticated && <Button color="inherit" onClick={async () => { loginWithRedirect(); }}>Login</Button>}
          {isAuthenticated && <Button color="inherit" onClick={() => logout()}>logout</Button>}  
        </Toolbar>
      </AppBar>
    </div>
  );
  
}