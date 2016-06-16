'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
class HelloWorld extends React.Component{
    render(){
        return (
            <p>
                hello,you aaa!
                It is {this.props.date.toTimeString()}

            </p>
        );
    }
}

var sampleNameSpace = {
    myDirective:HelloWorld
};
setInterval(function(){
    ReactDOM.render(
        <sampleNameSpace.myDirective date={new Date()} />,
        document.getElementById('test')

    );
},1000);