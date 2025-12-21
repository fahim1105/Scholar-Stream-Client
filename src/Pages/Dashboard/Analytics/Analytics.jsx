import React from 'react';
import UseRole from '../../../Hooks/UseRole';
import AdminAnalytics from './AdminAnalytics';
import Loader from '../../../Components/Loader/Loader';
import ModeratorApplications from '../ModeratorDashboard/ModeratorApplications/ModeratorApplications';

const Analytics = () => {
    const { role, roleLoading } = UseRole();

    if (roleLoading) {
        return <Loader></Loader>
    }

    if (role === 'admin') {
        return <AdminAnalytics></AdminAnalytics>
    }
    else if (role === 'moderator') {
        return <ModeratorApplications></ModeratorApplications>
    }
    else {
        return 
    }

};

export default Analytics;