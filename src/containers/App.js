import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Register from './auth/register';
import UserReactRedux from './dashboard/UserReactRedux';
import NotFound from '../components/NotFound';
import Main from '../containers/Main';
import { DashboardLayout } from '../components/dashboard-layout';
import { useSelector } from "react-redux";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const token = useSelector(state => state.tokenReducer.access_token);

  // const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* {getLayout(<Component {...pageProps} />)} */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/user/:id" element={<UserReactRedux />}/>
                <Route path="/aboutUs" element={<App />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={token ? <Navigate to="/home" replace /> : <Login /> }/>
                <Route path="/home/:page" element={<Main />}/>
                <Route path="/home" element={<DashboardLayout />}/>
                <Route path="*" element={<NotFound />}/>
                <Route />
              </Routes>
            </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
