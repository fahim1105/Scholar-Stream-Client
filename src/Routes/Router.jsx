import React from 'react';

import { createBrowserRouter } from "react-router";
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Components/Home/Home';
import RootLayout from '../Layout/RootLayout';
import AllScholarships from '../Pages/AllScholarships/AllScholarships';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PrivetRoutes from './PrivetRoutes';
import ScholarshipDetails from '../Pages/ScholarshipDetails/ScholarshipDetails';
import DashboardLayout from '../Layout/DashboardLayout';
import AddScholarship from '../Pages/Dashboard/AddScholarship/AddScholarship';
import ManageScholarship from '../Pages/Dashboard/ManageScholarship/ManageScholarship';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUsers';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/all-scholarships",
                Component: AllScholarships
            },
            {
                path: "/scholarship-details/:id",
                element: <PrivetRoutes><ScholarshipDetails></ScholarshipDetails></PrivetRoutes>,
            }
        ]

    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoutes><DashboardLayout></DashboardLayout></PrivetRoutes>,
        children: [
            {
                path: "add-scholarship",
                Component: AddScholarship
            },
            {
                path: "manage-scholarship",
                Component: ManageScholarship
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            }
            

        ]
    }
]);