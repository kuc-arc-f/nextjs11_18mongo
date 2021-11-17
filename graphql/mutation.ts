
export const GQL_MUTATION = `
  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    addTask(title: String!): Task
    updateTask(id: String!, title: String!): Task
    deleteTask(id: String!): Task
    noteAdd(title: String!, content: String!, category: String!, noteType: String!): Note
    noteUpdate(id: String!, title: String!, content: String!, 
      category: String!, noteType: String!): Note
    noteDelete(id: String!): Note  
    noteTagAdd(noteId: String!, name: String!): NoteTag  
    noteTagDelete(noteId: String!): String    
  }
`;