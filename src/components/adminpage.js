import React, { useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import AdminDrawer from "./drawer";
import { useDispatch, useSelector } from "react-redux";
import { dialogAction, drawerAction, editCandidateAction, getCandidateListAction } from "../store/actions/action";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from "./dialog";

const useStyles = makeStyles({
    root: {
        margin: "20px"
    },
    addButton: {
      display: "flex",
      justifyContent: "end"
    },
    tableContainer: {
      margin: 10,
      marginTop: 50
    },
    table: {
      minWidth: 650,
    },
  });

const AdminPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(()=> {
      dispatch(getCandidateListAction());
    },[])
    const candidateList = useSelector(state=> state.votingApp.candidateList)

    const handleEdit = (candidate, value) => {
      dispatch(editCandidateAction(candidate))
      value === "Edit" ? dispatch(drawerAction(true, "Edit")) :
        dispatch(dialogAction(true));

    }

    return (
        <div className={classes.root}>
            <div className={classes.addButton}>
            <Button variant="contained" color="primary" onClick={() => dispatch(drawerAction(true,"Add"))}>
                Add
            </Button>
            </div>
            <div className={classes.tableContainer}>
              <Typography variant="h4">
                Candidate List
              </Typography>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="left">Email id</TableCell>
            <TableCell align="left">Contact No</TableCell>
            <TableCell align="left">About</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidateList.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {`${row.FirstName} ${row.LastName}`}
              </TableCell>
              <TableCell align="left">{row.Email?.[0].Value}</TableCell>
              <TableCell align="left">{row.PhoneId}</TableCell>
              <TableCell align="left">{row.About}</TableCell>
              <TableCell align="left">
                <EditIcon onClick={() => handleEdit(row, "Edit")}/>
                <DeleteIcon onClick={() => handleEdit(row,"Delete")}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
            <AdminDrawer />
            <DeleteDialog />
           
        </div>
    );   
}

export default AdminPage;