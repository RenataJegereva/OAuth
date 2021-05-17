import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const { isAuthenticated, login } = props.auth;
    return (
        <div>
            <h1>Home</h1>
            { isAuthenticated() ? (
                <Link to="profile">View profile</Link>
            ) : (<button onClick={login}>Login</button>
            )}
        </div>
    );
};

export default Home;