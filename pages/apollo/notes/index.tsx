import React  from 'react';
import Link from 'next/link';
import { gql } from "@apollo/client";
import Layout from '../../../components/layout'
import IndexRow from './IndexRow';
import client from '../../../apollo-client'
import LibCookie from '../../../lib/LibCookie'
//import LibContent from '../../../client/lib/LibContent';
import LibAuth from '../../../client/lib/LibAuth';
//import LibApiFind from '../../../client/lib/LibApiFind';

interface IProps {
  items: Array<object>,
  history:string[],
}
interface IState {
//  items: Array<any>,
  items: any[],
}
interface IObject {
  id: number,
  title: string
}
//
class NotesIndex extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
//console.log(items);  
    return {
      items: [],
    }
  }
  constructor(props){
    super(props)
    this.state = { items: [] };
//console.log(props);   
  }       
  async componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
console.log("uid=", uid);
      const data = await client.query({
        query: gql`
        query {
          notes {
            id
            title
            content
            category
            noteType
          }
        }        
        `,
        fetchPolicy: "network-only"
      });
//console.log(data.data.notes);
      this.setState({items: data.data.notes })      

    }  
  }
  render() {
    const data = this.state.items;
console.log(data);
    return (
    <Layout>
    <div className="container py-4">
      <h3>Notes - index</h3>
      <Link href="/apollo/notes/Create">
        <a className="btn btn-primary mt-2">New</a>
      </Link>
      <hr />
      <table className="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item: any ,index: number) => {
//console.log(item.values.title);
        return (
          <IndexRow key={index} id={item.id} title={item.title} />
        )
      })}      
      </tbody>
      </table>

    </div>
    </Layout>
    );
  }
}
export default NotesIndex;
