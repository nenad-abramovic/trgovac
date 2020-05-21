import React from 'react';
import Search from '../components/search/Search';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Main = () => {
    return(
        <main>
            <p>огласи</p>
            <Search />
            <Register />
            <Login />
        </main>
    );
};

export default Main;