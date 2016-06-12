'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

var MyTitle = React.createClass({
    propTypes:{
        title:React.PropTypes.string.isRequired
        },
    render:function(){
        return <h1>{this.props.title}</h1>
    }
});

var data = 111;
ReactDOM.render(
    <MyTitle title={data} />,
    document.getElementById('test')

);