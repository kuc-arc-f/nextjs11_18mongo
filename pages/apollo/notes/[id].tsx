import React  from 'react';
import Layout from '../../../components/layout'
import { gql } from "@apollo/client";
import client from '../../../apollo-client'
//import LibContent from '../../../lib/LibContent';
//import LibNote from '../../../lib/LibNote';
//
function Page(props) {
  const item = props.item.row
  const tags = props.item.tags;
console.log(item);
//console.log(tags);
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>{item.content}
      </div>      
      <hr />
      <div>category: {item.category}
      </div>
      <hr />
      <div>noteType: {item.noteType}
      </div>
      <hr />
      <div>Tags:<br />
      {tags.map((item: any, index: number) => {
        return (<span className="mx-2" key={index}>{item.name}</span>)
      })
      }
      </div>    
      <hr />
      <div>ID : {item.id}
      </div>
    </div>
  </Layout>
  )
}
/* getServerSideProps */
export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const data = await client.query({
    query: gql`
    query {
      note(id: "${id}") {
        id
        title
        content
        noteType
        category
      }
    }
    `,
    fetchPolicy: "network-only"
  });
console.log(data.data.note); 
  const row:any = data.data.note;
  //noteTag
  const dataTag = await client.query({
    query: gql`
    query {
      noteTags(noteId: "${id}") {
        id
        name
      }
    }    
    `,
    fetchPolicy: "network-only"
  });
console.log(dataTag.data.noteTags);

  const item = {
    row: row,
    id: row.id,
    title: row.title,
    tags: dataTag.data.noteTags, 
//    tags: dataTag.data.noteTags, radio_1: row.values.radio_1, pub_date: pub_date,
  }
  return {
    props: { item: item } 
  }
}
export default Page