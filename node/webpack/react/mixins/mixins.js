'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

//声明一个mixin公用组件
var mountMixin = {
    componentWillMount:function(){
        console.log('mixin will mount');
    },
    componentDidMount:function(){
        console.log('mixin did mount');
    },
    componentWillUnmount:function(){
       console.log('mixin will unmount');
    }
};


var Test = React.createClass({
    mixins:[mountMixin],
    componentWillMount:function(){
        console.log('test will mount');
    },
    componentDidMount:function(){
        console.log('test did mount');
    },
    render:function(){
        return (
            <p>aaaaa</p>
        );
    }
});

ReactDOM.render(<Test />,document.getElementById('test'));
