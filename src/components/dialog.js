import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, dialogAction } from '../store/actions/action';

export default function DeleteDialog() {

  const openDialog = useSelector(state => state.votingApp.openDialog);
  const dispatch = useDispatch();
  const editCandidate = useSelector(state => state.votingApp.editCandidate);

  const handleClose = () => {
    dispatch(dialogAction(false));
  };
  const handleDelete = () => {
    dispatch(deleteUserAction(editCandidate?.Uid));
    dispatch(dialogAction(false));
    dispatch(editCandidate());
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >{"Delete Candidate"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Are You Sure You Want to delete the Candidate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>handleDelete()} color="primary" variant="contained" >
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained" >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}