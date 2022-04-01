import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { AccountProfile } from '../../components/account/account-profile';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useDispatch, useSelector } from "react-redux";
import { getUser, sideNavAction } from "../../actions/index";
import { API_ERROR, FETCH_API_DATA } from "../../actions/types";
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = () => {
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
        navigate('/login');
      }
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log('initial loading ' + token);
      dispatch(sideNavAction({'status':'open', 'page':'loaded'}));
      setLoaded(!isLoaded);
      dispatch(getUser(token));
    }

    if (apiLoading !== false && dataType === FETCH_API_DATA && data !== undefined) {
      console.log('loaded list ' + data.data);
      // navigate("/home");
    }

    if (apiLoading !== false && !open && error !== undefined && data === undefined && dataType === API_ERROR) {
      setDialogMessage({title: 'Invalid', message: (error.message !== undefined ? error.message : error.error)});
      handleClickOpen()
    }
  }, [isLoaded, apiLoading, dataType, data, open, error, dispatch]);

return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile data={data !== undefined ? (data.data !== undefined ? data.data : '') : ''}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails data={data !== undefined ? (data.data !== undefined ? data.data : '') : ''}/>
          </Grid>
        </Grid>
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

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
