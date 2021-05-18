import React, { useState, useEffect } from 'react';

function Private(props) {
    const [state, setState] = useState({ message: '' });

    useEffect(() => {
        fetch('/private', {
            headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` }
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((response) => setState({ message: response.message }))
            .catch((error) => setState({ message: error.message }));
    }, []);

    return (
        <>
            <h1>Private</h1>
            <p>{state.message}</p>;
        </>
    );
}

export default Private;
