import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import AuthContext from './AuthContext';

//in props destructuring I am aliasing the component with a name that starts with a capital letter,
//because I'm referencing it to render it out below
function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                // 1. Redirect to login if not logged in.
                if (!auth.isAuthenticated()) return auth.login();

                // 2. Display message if user lacks required scope(s).
                if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                    return (
                        <h1>
                            Unauthorized - You need the following scope(s) to view this page:{' '}
                            {scopes.join(',')}.
                        </h1>
                    );
                }

                // 3. Render component
                return <Component auth={auth} {...props} />;
            }}
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
    scopes: []
};

export default PrivateRoute;
