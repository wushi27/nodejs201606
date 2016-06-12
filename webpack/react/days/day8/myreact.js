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
import $ from 'jquery';
console.log($);
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
        console.log(this.props.data);
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
//***************************************************************
//form组件：只需管好自己的事情：1.验证 2.提交 3.提交完成后，字段清空。
var CommentForm = React.createClass({
    handleSubmit(e){
        e.preventDefault();//屏蔽提交动作。
        //获取真实dom节点值。
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        //将提交的字段值，传入box组件的函数。
        this.props.onCommentSubmit({author: author, text: text});

        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render(){

        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
            {/*节点加ref，表示寻找这个真实dom节点*/}
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>


        );
    }
});

//***********************************************************************//
//BOX组件
var CommentBox = React.createClass({
    //初始state状态，整个生命周期只执行一次，用于设置组件的初始化 state
    getInitialState(){
      return {data:[]};
    },
    loadData(){
        $.ajax({
            url:this.props.url,
            dataType:'json',
            success:(data) =>{
                console.log(data);
                this.setState({data:data[0]});//更新状态
            },
            error:(xhr,status,err)=>{
                console.log(this.props.url);
                console.log(status);
                console.log(err.toString());
            }
        });
    },
    componentDidMount(){
        setInterval(this.loadData,this.props.pollInterval);
    },
    //这个方法，其实在form组件里面运行，也就是点击提交动作后。
    handleCommentSubmit(comment){
        //提前更新，2s后是最新状态getdata。
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        //处理表单动作,提交这条数据到服务器。
        $.ajax({
            url:this.props.url,
            dataType:'json',
            type:'post',
            data:comment,
            success:(data) =>{
                console.log(data);
                this.setState({data:data[0]});//更新状态
            },
            error:(xhr,status,err)=>{
                console.log(this.props.url);
                console.log(status);
                console.log(err.toString());
            }
        });
    },
    //es6，类中方法声明方式
    render(){
        return (
            <div className="comment-box">

                <h1>comments</h1>
            {/*******从上级传入data，并不能直接在此写入*********/}
                <CommentList data={this.state.data}/>
                <CommentForm  onCommentSubmit = {this.handleCommentSubmit} />

            </div>);
    }
});

ReactDOM.render(<CommentBox url="http://localhost:9999/getdata" pollInterval={2000}/>,document.getElementById('content'));
//***********************************************************************//
