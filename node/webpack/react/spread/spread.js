'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

var MyTitle = React.createClass({
    show:function(){
        console.log(this.props.title);
        console.log(this.props.contents);
        console.log(this.props.name);
    },
    render:function(){
        return <button onClick={this.show}>click me</button>
    }
});

var data = {title:'this is a title',contents:'this is contents'};
ReactDOM.render(
    <MyTitle {...data} name={'my name'}/>,
    document.getElementById('test')

);