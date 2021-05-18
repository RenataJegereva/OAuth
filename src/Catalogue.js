import React, { Component } from 'react';

class Catalogue extends Component {
    state = {
        catalogueItems: []
    };

    componentDidMount() {
        fetch('/catalogue', {
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((response) => this.setState({ catalogueItems: response.catalogueItems }))
            .catch((error) => this.setState({ message: error.message }));

        fetch('/admin', {
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((response) => console.log(response))
            .catch((error) => this.setState({ message: error.message }));
    }

    render() {
        return (
            <>
                <h1>Catalogue</h1>
                <ul>
                    {this.state.catalogueItems.map((catalogueItem) => {
                        return <li key={catalogueItem.id}>{catalogueItem.title}</li>;
                    })}
                </ul>
            </>
        );
    }
}

export default Catalogue;
