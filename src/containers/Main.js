import React, { useEffect } from "react";
import '../App.css';
import { useDispatch } from "react-redux";
import 'react-spinner-animated/dist/index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from "../components/dashboard-layout";
import Users from './dashboard/users';
import Account from './dashboard/account';
import Redux from "./dashboard/Redux";

function Main() {
    const dispatch = useDispatch();
    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    }, [page, dispatch]);

    return (
        <DashboardLayout>
            {
                {
                    'users' : <Users/>,
                    'redux' : <Redux/>,
                    'account' : <Account/>,
                }[page]
            }
        </DashboardLayout>
    );
}

export default Main;