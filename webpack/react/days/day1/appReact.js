'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
class HelloWorld extends Component{
    render(){
        return(
            <h1>hello,world</h1>
        )
    }
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('app')


);