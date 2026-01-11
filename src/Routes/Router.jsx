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
import AdminRoutes from './AdminRoutes';
// import AdminAnalytics from '../Pages/Dashboard/Analytics/Analytics';
import PaymentSuccess from '../Pages/Payment/PaymentSuccess';
import PaymentCancel from '../Pages/Payment/PaymentCancel';
// import AdminProfile from '../Pages/Dashboard/AdminProfile/AdminProfile';
import PaymentHistory from '../Pages/Payment/PaymentHistory';
import ManageUsers from '../Pages/Dashboard/ManageUsers/ManageUser';
import ModeratorRoutes from './ModeratorRoutes';
// import ModeratorProfile from '../Pages/Dashboard/ModeratorDashboard/ModeratorProfile/ModeratorProfile';
// import ModeratorApplications from '../Pages/Dashboard/ModeratorDashboard/ModeratorApplications/ModeratorApplications';
import ManageReviews from '../Pages/Dashboard/ModeratorDashboard/ManageReviews/ManageReviews';
import Analytics from '../Pages/Dashboard/Analytics/Analytics';
import UserProfile from '../Pages/Dashboard/UserDashboard/UserProfile/UserProfile';
import MyApplications from '../Pages/Dashboard/UserDashboard/MyApplications/MyApplications';
import MyReviews from '../Pages/Dashboard/UserDashboard/MyReviews/MyReviews';
import Blogs from '../Pages/Blogs/Blogs';
import ManageBlogs from '../Pages/Dashboard/ManageBlogs/ManageBlogs';
import OurToppers from '../Pages/Topers/Topers';
import ManageToppers from '../Pages/Dashboard/ModeratorDashboard/ManageTopers/ManageTopers';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Documentation from '../Pages/Documentation/Documentation';
import Tutorials from '../Pages/Tutorials/Tutorials';
import Community from '../Pages/Community/Community';
import Careers from '../Pages/Careers/Careers';
import Privacy from '../Pages/Privacy/Privacy';
import Terms from '../Pages/Terms/Terms';

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
                // element: <PrivetRoutes><ScholarshipDetails></ScholarshipDetails></PrivetRoutes>,
                element: <ScholarshipDetails></ScholarshipDetails>
            },
            {
                path: "/blogs",
                element: <PrivetRoutes><Blogs></Blogs></PrivetRoutes>
            },
            {
                path: "/our-topers",
                element: <PrivetRoutes><OurToppers></OurToppers></PrivetRoutes>
            },
            {
                path: "/about-us",
                Component: AboutUs
            },
            {
                path: "/documentation",
                Component: Documentation
            },
            {
                path: "/tutorials",
                Component: Tutorials
            },
            {
                path: "/community",
                Component: Community
            },
            {
                path: "/careers",
                Component: Careers
            },
            {
                path: "/privacy",
                Component: Privacy
            },
            {
                path: "/terms",
                Component: Terms
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
                index: true,
                // element: <AdminRoutes><AdminAnalytics></AdminAnalytics></AdminRoutes>
                element: <Analytics></Analytics>
            },
            {
                path: "payment-success",
                Component: PaymentSuccess
            },
            {
                path: "payment-cancelled",
                Component: PaymentCancel
            },
            {
                path: "payment-history",
                Component: PaymentHistory
            },
            {
                path: "profile",
                Component: UserProfile
            },
            {
                path: "my-reviews",
                Component: MyReviews
            },
            {
                path: "my-applications",
                Component: MyApplications
            },
            {
                path: "add-scholarship",
                element: <AdminRoutes><AddScholarship></AddScholarship></AdminRoutes>
            },
            {
                path: "manage-scholarship",
                element: <AdminRoutes><ManageScholarship></ManageScholarship></AdminRoutes>
            },
            {
                path: 'manage-users',
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            },
            {
                path: "manage-blogs",
                element: <AdminRoutes><ManageBlogs></ManageBlogs></AdminRoutes>
            },
            {
                path: "manage-topers",
                element: <ModeratorRoutes><ManageToppers></ManageToppers></ModeratorRoutes>
            },
            {
                path: "manage-reviews",
                element: <ModeratorRoutes><ManageReviews></ManageReviews></ModeratorRoutes>
            }


        ]
    }
]);