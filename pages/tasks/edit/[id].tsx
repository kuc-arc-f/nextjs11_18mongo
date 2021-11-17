//import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router'
import React from 'react'
import flash from 'next-flash';
//import cookies from 'next-cookies'
import { gql } from "@apollo/client";
import client from '../../../apollo-client'

import LibCookie from "../../../lib/LibCookie"
import Layout from '../../../components/layout'

interface IState {
  title: string,
  content: string,
  _token: string,
}
interface IProps {
  id: string,
  csrf: any,
  item: any,
  user_id: string,
}
//
export default class TaskEdit extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
    console.log("id=", ctx.query.id)
    const id = ctx.query.id
    const data = await client.query({
      query: gql`
      query {
        task(id: "${id}"){
          id
          title
          content
          created_at
        }            
      }
      ` ,
      fetchPolicy: "network-only"
    });
//console.log(data.data.task); 
    return {
      id: id,
      item: data.data.task,
      user_id : '',
      csrf: '',
    };
  }
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
      _token : this.props.csrf.token,
    }
//console.log(this.props )
  }
  componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    const uid = LibCookie.get_cookie(key);
console.log( "user_id=" , uid)    
    if(uid === null){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }     
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    console.log("#deete-id:" , this.props.id)
    try {
      const result = await client.mutate({
        mutation:  gql`
        mutation {
          deleteTask(id: "${this.props.id}"){
            id
          }
        }      
      ` 
      })
console.log(result);
      if(result.data.deleteTask.id === 'undefined'){
        throw new Error('Error , deleteTask');
      }
      Router.push('/tasks');      
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
  console.log("#-handleClick")
    await this.update_item()
  }     
  async update_item(){
    try {
      console.log("#update_item-id:" , this.props.id);
      const result = await client.mutate({
        mutation: gql`
        mutation {
          updateTask(id: "${this.props.id}", title: "${this.state.title}"){
            id
          }
        }            
      `
      });
console.log(result);
      if(result.data.updateTask.id === 'undefined'){
        throw new Error('Error , updateTask');
      }
      Router.push('/tasks');
    } catch (error) {
      console.error(error);
      alert("Error, save item");
    }     
  }  
  render() {
    return (
      <Layout>
        <div className="container">
          <Link href="/tasks">
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h1>Tasks - Edit</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" id="title" className="form-control"
                value={this.state.title}
                onChange={this.handleChangeTitle.bind(this)} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleClick}>Save
            </button>
          </div>
          <hr />                  
          <div className="form-group">
            <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
            </button>
          </div>
          <hr />
          ID : {this.props.id}
        </div>
      </Layout>
    );
  }
}

