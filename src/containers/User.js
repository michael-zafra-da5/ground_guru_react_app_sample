import React, { useEffect, useState } from "react";
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData, deleteUserData } from "../actions/index";
import { BarLoader } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import { FETCH_API_DATA } from "../actions/types";
import { Typography, Button, Grid, TextField, MenuItem } from "@material-ui/core";
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

let isLoaded = false;

function User() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.apiReducer.data);
    const dataType = useSelector(state => state.apiReducer.type);
    const apiLoading = useSelector(state => state.apiReducer.isLoadingData);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isEdit, setEditStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [status, setStatus] = useState('active');
    const genderList = [{
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female'}
    ];

    const statusList = [{
        value: 'active',
        label: 'Active',
      },
      {
        value: 'inactive',
        label: 'Inactive'}
    ];

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        dispatch(deleteUserData(id));
    };

    useEffect(() => {
        if (!isLoaded) {
            isLoaded = true;
            dispatch(fetchUserData(id));
        }
    });

    return (
    <div className="App">
      <header className="App-header">
        <p>User page {id}</p>
        <Button onClick={() => {
            navigate("/");
        }} size="small" variant="contained">Back</Button>

        { apiLoading === true ? 
            <BarLoader text={"Loading..."} center={false} width={"150px"} height={"150px"}/> 
            : 
            <div>
                {data !== undefined && dataType === FETCH_API_DATA ? 
                <div>
                    {/* { Object.keys(data).map((key,index) => 
                        <p>{data[key]}</p>
                    )} */}
                    {isEdit ? 
                    <div>
                        <TextField
                            InputProps={{
                                style: {
                                    color: "white"
                                }
                            }} id="outlined-basic" label="Name" variant="outlined" value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}/>
                        <TextField
                            InputProps={{
                                style: {
                                    color: "white",
                                }
                            }} id="outlined-basic" label="Email" variant="outlined"  value={email} 
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}/>

                        <TextField
                            InputProps={{
                                style: {
                                    color: "white"
                                }
                            }}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={gender}
                            onChange={(event) => {
                                setGender(event.target.value);
                            }}
                            helperText="Please select your gender"
                            color="textSecondary"
                            >
                            {genderList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            InputProps={{
                                style: {
                                    color: "white"
                                }
                            }}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                            }}
                            helperText="Please select your gender"
                            color="textSecondary"
                            >
                            {statusList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        
                        <Button onClick={() => {
                            setEditStatus(!isEdit);
                            dispatch(updateUserData({"name": name, "email": email, "gender": gender, "status":status}, id));
                        }} size="small" variant="contained">Save Changes</Button>
                    </div>
                    :
                    <div>
                        <Typography
                            variant="h6"
                        >
                            Name: {data["name"]}
                        </Typography>
                    
                        <Typography
                            variant="h6"
                        >
                            Email: {data["email"]}
                        </Typography>
                    
                        <Typography
                            variant="h6"
                        >
                            Gender: {data["gender"]}
                        </Typography>
                    
                        <Typography
                            style={{
                            marginBottom: 12,
                            }}
                            variant="h6"
                        >
                            Status: {data["status"]}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button onClick={() => {
                                    setEditStatus(!isEdit)
                                    setName(data['name']);
                                    setEmail(data['email']);
                                    setGender(data['gender']);
                                    setStatus(data['status']);
                                }} size="small" variant="contained">Update</Button>
                            </Grid>

                            <Grid item xs={6}>
                                <Button onClick={handleClickOpen} size="small" variant="contained">Delete</Button>
                            </Grid>
                        </Grid>
                    </div>}
                </div>
                : ''}
            </div>
        }
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        </header>
    </div>
    );
}

export default User;