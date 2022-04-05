import React, { useEffect, useState } from "react";
import { Box, Container, Button } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useDispatch, useSelector } from "react-redux";
import { getUsers,sideNavAction, tokenAction } from "../../actions/index";
import { API_ERROR, FETCH_API_DATA } from "../../actions/types";
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Users = () => 
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const dataType = useSelector(state => state.apiReducer.type);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);
  const error = useSelector(state => state.apiReducer.error);
  const token = useSelector(state => state.tokenReducer.access_token);

  const [isLoaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({message:'', title:'', type:''});

  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);

      if(dialogMessage.message === 'Not Authorized, token failed.') {
        dispatch(tokenAction(null));
        navigate('/login');
      }
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log('initial loading ' + token);
      dispatch(sideNavAction({'status':'open', 'page':'loaded'}));
      setLoaded(!isLoaded);
      dispatch(getUsers(token));
    }

    if (apiLoading !== false && dataType === FETCH_API_DATA && data !== undefined) {
      console.log('loaded list ' + data.data);
      // navigate("/home");
    }

    if (apiLoading !== false && !open && error !== undefined && data === undefined && dataType === API_ERROR) {
      setDialogMessage({title: 'Invalid', message: (error.message !== undefined ? error.message : error.error)});
      handleClickOpen()
    }
  }, [token, isLoaded, apiLoading, dataType, data, open, error, dispatch]);


  return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          {data !== undefined && dataType === FETCH_API_DATA ? <CustomerListResults customers={data.data !== undefined ? data.data : []} /> : ''}
        </Box>
      </Container>
    </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-title">
          {dialogMessage.title !== '' ? dialogMessage.title : 'Invalid'}
          </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage.message !== '' ? dialogMessage.message : 'Something went wrong.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
  </>
)};
Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
