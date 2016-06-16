'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
//dom array
var arr = [
    <h1>hello,world</h1>,
    <h2>react is ok</h2>


];

ReactDOM.render(
    <div>{arr}</div>,
    document.getElementById('test')

);