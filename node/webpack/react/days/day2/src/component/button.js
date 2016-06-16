//声明一个组件button。
import React,{Component} from 'react';
import './button.less';
class Button extends Component{
    handleClick(){
        alert('click you');
    }
    render(){
        //const style = require('button.less');
        return(
            <button className="my-button" onClick = {this.handleClick.bind(this)}>
                点击
            </button>
        );
    }
}
export default Button;//导出组件