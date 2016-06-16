'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

//遍历子节点
var NodeList = React.createClass({
    render:function(){
        return(
            <ul>
                {
                    React.Children.map(this.props.children,function(child){
                      return <li>{child}</li>;
                    })

                }

            </ul>

        );
    }
});


ReactDOM.render(
    <NodeList>
        <span>hello</span>
        <span>world</span>
    </NodeList>,
    document.getElementById('test')


);