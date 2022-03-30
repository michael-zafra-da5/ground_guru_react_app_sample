import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import Login from './auth/login';
import User from './dashboard/User';
import Register from './auth/register';
import NotFound from '../components/NotFound';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard-layout';
import Main from '../containers/Main';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

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
                <Route path="/user/:id" element={<User />}/>
                <Route path="/aboutUs" element={<App />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
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
