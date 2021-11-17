import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
//import cookies from 'next-cookies'
import { gql } from "@apollo/client";
import client from '../../apollo-client'

import LibCookie from "../../lib/LibCookie"
import Layout from '../../components/layout'

interface IState {
  title: string,
  content: string,
  _token: string,
}
interface IProps {
  csrf: any,
  user_id: string,
}
//
export default class TaskCreate extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
//console.log(json)
    return {}
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
//console.log(props)
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
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.addItem()
  } 
  async addItem(){
    try {
      const result = await client.mutate({
        mutation:gql`
        mutation {
          addTask(title: "${this.state.title}"){
            id
          }
        }            
      `
      });
console.log(result);
      if(result.data.addTask.id === 'undefined'){
        throw new Error('Error , addTask');
      }
      Router.push('/tasks');
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  } 
  render() {
    return (
      <Layout>
        <div className="container">
          <Link href="/tasks">
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h1>Tasks - Create</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control"
                onChange={this.handleChangeTitle.bind(this)} />
              </div>
            </div>
          </div>
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Create
              </button>
          </div>                
          <hr />
        </div>
      </Layout>
    )    
  } 
}

