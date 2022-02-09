import React from 'react';
import { useSelector } from 'react-redux';
import LandingPage from '../LandingPage';
import UserHome from '../UserHome';

function MainPage() {
    const sessionUser = useSelector(state => state.session.user);
    let sessionView;
    if (sessionUser) {
        sessionView = (
            <UserHome user={sessionUser} />
        )
    } else {
        sessionView = (
            <LandingPage />
        )
    };
    return (
        <div>{sessionView}</div>
    )
};

export default MainPage;
