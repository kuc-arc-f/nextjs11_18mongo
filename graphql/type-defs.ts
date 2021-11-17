import { gql, Config } from "apollo-server-micro";
import { GQL_QUERY } from "./query";
import { GQL_MUTATION } from "./mutation";

export const typeDefs: Config["typeDefs"] = gql`
  type Article {
    id: Int
    title: String
    content: String
  }
  type User {
    id: String!
    name: String
    email: String
    password: String
  }  
  type Task {
    id: String
    title: String
    content: String
    created_at: String
  }
  type Category {
    id: String
    name: String!
  }
  type Types {
    id: String
    name: String!
  }
  type Tags {
    id: String
    name: String!
  }            
  type NoteTag {
    id: String!
    note_id: String
    name: String!
  }     
  type Note {
    id: String
    title: String
    content: String!
    userId: String! 
    category: String!
    noteType: String!
  }   
  ${GQL_QUERY}
  ${GQL_MUTATION}
`;