import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className="dropdown-menu">
            <button className="profile-icon-button" onClick={openMenu}>
                <i className="far fa-user-circle"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>Hello, {user.username}</li>
                    <Link className="user-images" to={`/myimages`}>
                        <li className="user-images-text">My Images</li>
                    </Link>
                    <Link className="user-favorites" to={`/myfavorites`}>
                        <li className="user-favorites-text">My Favorites</li>
                    </Link>
                    <li className="li-logout"><button className="logout-button-profile" onClick={logout}>Log Out</button></li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
