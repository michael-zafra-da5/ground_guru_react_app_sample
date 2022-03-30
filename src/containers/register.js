import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/index";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { API_ERROR, CREATE_USER } from "../actions/types";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const dataType = useSelector(state => state.apiReducer.type);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);
  const error = useSelector(state => state.apiReducer.error);

  const [isLoaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({message:'', title:'', type:''});
  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);

      if(dialogMessage.type === CREATE_USER) {
        navigate("/");
      }
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log('initial loading');
      setLoaded(!isLoaded);
    }

    if (apiLoading !== false && dataType === CREATE_USER && data !== undefined) {
      setDialogMessage({title:'Registration Success', message:data.message, type: CREATE_USER});
      handleClickOpen()
    }

    if (apiLoading !== false && !open && error !== undefined && data === undefined && dataType === API_ERROR) {
      setDialogMessage({title: 'Invalid', message: (error.message !== undefined ? error.message : error.error)});
      handleClickOpen()
    }
  }, [isLoaded, apiLoading, dataType, data, open, error, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      dispatch(registerUser(
        {
          "email":formik.values.email,
          "password":formik.values.password,
          "first_name":formik.values.firstName,
          "last_name":formik.values.lastName
        }
        ));
    }
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Terms and Conditions
                  </Link>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
                <Link
                  onClick={() => { navigate('/login'); }}
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
            </Typography>
          </form>
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
  );
};

export default Register;
