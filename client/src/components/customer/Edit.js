import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import CustomerForm from './Form';
import { getCustomerByIdQuery, updateCustomerMutation } from '../../queries/customer';
import { getCurrentUrl } from '../../utils/url-helper';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getCustomerByIdQuery.loading === false) {
            let { customer } = props.getCustomerByIdQuery;

            this.setState({
                customer: {
                    name: customer.name,
                    age: customer.age,
                },
            });
        }
    }

    handleBackClick() {
        this.props.history.push(`${getCurrentUrl(this.props.match)}/list`);
    }

    handleSubmit(customer, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = customer;
        const id = this.props.getCustomerByIdQuery.customer.id;

        this.props.updateCustomerMutation({
            variables: { id, data },
        }).then(response => this.handleBackClick());
    }

    displayForm() {
        let data = this.props.getCustomerByIdQuery;

        if (data.loading) {
            return (<div className="spinner" />);
        }
        else {
            return (
                <CustomerForm
                    handleBackClick={this.handleBackClick}
                    handleSubmit={this.handleSubmit}
                    customer={this.state.customer}
                    loading={this.state.loading} />
            );
        }
    }

    render() {
        return (
            <div>
                {this.displayForm()}
            </div>
        );
    }
}

export default compose(
    graphql(getCustomerByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getCustomerByIdQuery',
    }),
    graphql(updateCustomerMutation, { name: 'updateCustomerMutation' }),
)(Edit);
