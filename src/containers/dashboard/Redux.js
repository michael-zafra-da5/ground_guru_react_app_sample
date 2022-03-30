import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from "../../actions/index";
import { UserList } from '../../components/UserList'
import { BarLoader } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import { useForm } from 'react-hook-form';
import { FETCH_API_DATA, API_ERROR, CREATE_USER } from "../../actions/types";
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Button } from "@material-ui/core";

function Redux() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const dataType = useSelector(state => state.apiReducer.type);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);
  const error = useSelector(state => state.apiReducer.error);

  const { register, handleSubmit, formState : { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    dispatch(createUser(data))
  }; 

  const [isLoaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
      if (!isLoaded) {
        console.log('initial loading');
        setLoaded(!isLoaded);
        dispatch(fetchUsers());
      }

      if (apiLoading !== false && dataType === CREATE_USER) {
        dispatch(fetchUsers());
      }

      console.log('data:'+data);
      if (!open && error !== undefined && data === undefined && dataType === API_ERROR) {
        console.log('error '+error);
        setDialogMessage(error.message);
        handleClickOpen()
        dispatch(fetchUsers());
      }
  }, [isLoaded, apiLoading, dataType, data, open, error, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        { apiLoading === true ? 
          <BarLoader text={"Loading..."} center={false} width={"150px"} height={"150px"}/> 
        : 
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                  Name:
                <input defaultValue="" {...register("name", { required: true })}/>
              </label>
              {errors.name && <span>This field is required</span>}

              <label>
                  Email:
                <input defaultValue="" {...register("email", { required: true })}/>
              </label>
              {errors.email && <span>This field is required</span>}

              <label>
                  Gender:
                <input defaultValue="male" {...register("gender", { required: true })}/>
              </label>
              {errors.gender && <span>This field is required</span>}

              <label>
                  Status:
                <input defaultValue="active" {...register("status", { required: true })}/>
              </label>
              {errors.status && <span>This field is required</span>}

              <input type="submit" />
            </form>

            <button onClick={() => dispatch(fetchUsers())}>Refresh User List</button>
            {data !== undefined && dataType === FETCH_API_DATA ? <UserList data={data}></UserList> : ''}
          </div>
        }
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogTitle id="alert-dialog-title">
              {"Invalid"}
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage !== '' ? dialogMessage : 'Something went wrong.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </header>
      

    </div>
  );
}

export default Redux;
