import React, { useEffect } from 'react';

const Profile = (props) => {
    const [state, setState] = React.useState({
        profile: null,
        error: ''
    });

    const loadUserProfile = (getProfile) => {
        getProfile((profile, error) => {
            setState((state) => ({ ...state, profile, error }));
        });
    };

    useEffect(() => {
        loadUserProfile(props.auth.getProfile);
    }, []);

    const { profile } = state || {};
    if (!profile) return null;

    return (
        <>
            <h1>Profile</h1>
            <p>{profile.nickname}</p>
            <img style={{ maxWidth: 50, maxHeight: 50 }} src={profile.picture} alt="profile pic" />
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
    );
};

export default Profile;
