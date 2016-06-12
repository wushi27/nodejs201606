'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
var Hello = React.createClass({
    getInitialState:function(){
        return {
            opacity:1
        };
    },
    componentDidMount:function(){
        this.timer  = setInterval(function(){
            var opacity = this.state.opacity;
            opacity-=0.2;
            if(opacity<0.1){
                opacity = 1;
            }
            this.setState({
                opacity:opacity
            });
        }.bind(this),1000);
    },

    render:function(){
        return (
            <div style={{opacity:this.state.opacity}}>
                hello,{this.props.name}
            </div>
        );
    }



});

ReactDOM.render(<Hello name="this world" />,document.getElementById('test'));