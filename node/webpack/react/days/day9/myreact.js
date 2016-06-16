'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './style.less';
import $ from 'jquery';
//蓝：分类item
var ProductCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});
//虹：产品item
var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                    {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});
//绿：分类和产品item集合。
var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});
//蓝：查询框
var SearchBar = React.createClass({
    handleChange:function(){
        //上级传入。
        this.props.onUserInput( this.refs.filterTextInput.value,
                                this.refs.inStockOnlyInput.checked
        );
    },
    render: function() {
        return (
            <form>
                <input type="text"  ref="filterTextInput" placeholder="searching....."  value={this.props.filterText} onChange={this.handleChange}/>
                <p>
                    <input type="checkbox" ref="inStockOnlyInput" checked={this.props.inStockOnly} />
          {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
});
//整体组合
var FilterableProductTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            inStockOnly: false
        };
    },
    handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },
    render: function() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
});


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('container')
);