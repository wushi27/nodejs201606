//this is my first component
//CommentBox组件
//注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头。
/*
- CommentBox
    - CommentList
        - Comment
    - CommentForm
*/
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './style.less';
//Comment组件
//让我们创建 Comment 组件，
// 该组件依赖于从父级传入的数据。
// 从父组件传入的数据会做为子组件的 属性（ property ） ，
// 这些 属性（ properties ） 可以通过 this.props 访问到。
// 使用属性（ props ）
// 我们就可以读到从 CommentList 传到 Comment 的数据，
// 然后渲染一些标记：
var Comment = React.createClass({
    render(){
        return( <div className="comment">
                    <h2 className="comment-author">
                         {this.props.author}
                    </h2>
                    <div>
                         {this.props.children}
                    </div>

                </div>
            );
    }
});
//comment list组件,往comment组件传递数据
var CommentList = React.createClass({
    render(){
        return (<div className="comment-list">
            <Comment author="peter">this is one comment</Comment>
            <Comment author="jackson">this is two comment</Comment>
        </div>);
    }
});

//***********************************************************************//
//form组件
var CommentForm = React.createClass({
    render(){
        return (<div className="comment-form">
            hello, commentform

        </div>);
    }
});
//***********************************************************************//
//BOX组件
var CommentBox = React.createClass({
    //es6，类中方法声明方式
    render(){
        return (
            <div className="comment-box">

                <h1>comments</h1>
            {/*******insert其他组件*********/}
                <CommentList />
                <CommentForm />
             {/*******insert其他组件*********/}
            </div>);
    }
});
//调用渲染方法。
ReactDOM.render(<CommentBox />,document.getElementById('content'));
//***********************************************************************//
