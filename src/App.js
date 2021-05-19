import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Profile from './Profile';
import Auth from './Auth/Auth';
import Callback from './Callback';
import Public from './Public';
import Private from './Private';
import Catalogue from './Catalogue';
import PrivateRoute from './PrivateRoute';
import AuthContext from './AuthContext';

function App(props) {
    const [auth, setAuth] = useState(new Auth(props.history));
    const [tokenRenewalComplete, setTokenRenewalCompleteStatus] = useState(false);

    useEffect(() => {
        auth.renewToken(() => setTokenRenewalCompleteStatus(true));
    }, [tokenRenewalComplete]);

    if (!tokenRenewalComplete)
        return (
            <svg className="spinner" role="alert" aria-live="assertive">
                <circle cx="30" cy="30" r="20" className="circle" />
            </svg>
        );

    return (
        <AuthContext.Provider value={auth}>
            <Nav auth={auth} />
            <div className="body">
                <Route path="/" exact render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/callback" render={(props) => <Callback auth={auth} {...props} />} />
                <PrivateRoute path="/profile" auth={auth} component={Profile} />
                <Route path="/public" component={Public} />
                <PrivateRoute path="/private" auth={auth} component={Private} />
                <PrivateRoute
                    path="/catalogue"
                    component={Catalogue}
                    auth={auth}
                    scopes={['read:catalogue']}
                />
            </div>
        </AuthContext.Provider>
    );
}

export default App;
