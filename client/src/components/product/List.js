import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getProductsQuery } from '../../queries/product';
import { getCurrentUrl } from '../../utils/url-helper';

const ProductCard = (props) => {
    const { product, url } = props;

    return (
        <div className="card">
            <div className="card-content">
                <h4><b>{product.name}</b></h4>
                <p>{product.description}</p>
            </div>
            <div className="card-action">
                <Link to={`${url}/view/${product.id}`}>View</Link>
            </div>
        </div>
    );
};

class List extends Component {
    displayProducts(url) {
        let data = this.props.getProductsQuery;

        if (data.loading) {
            return (<div className="spinner"></div>);
        }
        else {
            const url = getCurrentUrl(this.props.match);
            
            return data.products.map(product => {
                return (
                    <ProductCard key={product.id} product={product} url={url} />
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div className="action-container">
                    <Link to={`${getCurrentUrl(this.props.match)}/create`} className="button">Add Product</Link>
                </div>
                <div className="list">
                    {this.displayProducts()}
                </div>
            </div>
        );
    }
}

export default graphql(getProductsQuery, {
    options: (props) => ({ fetchPolicy: 'network-only' }),
    name: 'getProductsQuery'
})(List);
