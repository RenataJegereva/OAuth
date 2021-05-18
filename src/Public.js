import React, { useState, useEffect } from 'react';

function Public() {
    const [state, setState] = useState({ message: '' });

    useEffect(() => {
        fetch('/public')
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((response) => setState({ message: response.message }))
            .catch((error) => setState({ message: error.message }));
    }, []);

    return (
        <>
            <h1>Public</h1>
            <p>{state.message}</p>
        </>
    );
}

export default Public;
