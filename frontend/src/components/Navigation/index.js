import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import NewImageFormModal from '../NewImageFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NewImageFormModal />
            </>

        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }
    return (
        <>
            <div className='main-navbar'>
                <div className='left-navbar'>
                    <NavLink exact to="/"> <div className='home-button'>Estádium</div></NavLink>
                </div>
                <div className='right-navbar'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </>
    );
}

export default Navigation;
