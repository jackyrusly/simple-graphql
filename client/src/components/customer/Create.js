import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import CustomerForm from './Form';
import { createCustomerMutation } from '../../queries/customer';
import { getCurrentUrl } from '../../utils/url-helper';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick() {
        this.props.history.push(`${getCurrentUrl(this.props.match)}/list`);
    }

    handleSubmit(customer, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = customer;
        
        this.props.createCustomerMutation({
            variables: { data },
        }).then(response => this.handleBackClick());
    }

    render() {
        return (
            <CustomerForm
                handleBackClick={this.handleBackClick}
                handleSubmit={this.handleSubmit}
                loading={this.state.loading} />
        );
    }
}

export default compose(
    graphql(createCustomerMutation, { name: 'createCustomerMutation' }),
)(Create);
