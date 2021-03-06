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
var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];
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
    render() {
        //此函数返回遍历后的节点
        var commentNodes = this.props.data.map((comment)=> {
            return (

            <Comment author={comment.author}>
                            {comment.text}
            </Comment>

            )

        });//map

        return (<div class="comment-list">
            {commentNodes}
        </div>);
    }//render

});



//***********************************************************************//
//BOX组件
var CommentBox = React.createClass({
    //es6，类中方法声明方式
    render(){
        return (
            <div className="comment-box">

                <h1>comments</h1>
            {/*******从上级传入data，并不能直接在此写入*********/}
                <CommentList data={this.props.data}/>


            </div>);
    }
});
//传入data
ReactDOM.render(<CommentBox data={data} />,document.getElementById('content'));
//***********************************************************************//
