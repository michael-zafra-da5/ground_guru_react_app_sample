import React, { useEffect } from "react";
import '../App.css';
import { useDispatch } from "react-redux";
import 'react-spinner-animated/dist/index.css';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from "../components/dashboard-layout";
import Users from './dashboard/users';
import Account from './dashboard/account';
import Redux from "./dashboard/Redux";
import Home from "./dashboard/home";

function Main() {
    const dispatch = useDispatch();
    const { page } = useParams();

    useEffect(() => {
    }, [page, dispatch]);

    return (
        <DashboardLayout>
            {
                {
                    'dashboard' : <Home/>,
                    'users' : <Users/>,
                    'redux' : <Redux/>,
                    'account' : <Account/>,
                }[page]
            }
        </DashboardLayout>
    );
}

export default Main;