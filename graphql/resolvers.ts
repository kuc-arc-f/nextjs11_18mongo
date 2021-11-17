import { Config } from "apollo-server-micro";
import LibTask from '../lib/LibTask';
import LibUser from '../lib/LibUser';
import LibNote from '../lib/LibNote';
//
export const resolvers: Config["resolvers"] = {
  Query: {
    hello: () => 'Hello world-222',
    tasks:async () => {
      return await LibTask.getItems();
    },
    async task(parent, args, context, info){
      return await LibTask.getTask(args.id);
    },
    /* user */    
    user: async(parent: any, args: any, context: any, info: any) => {
      return await LibUser.getUser(args.id);
    },
    userValid: async(parent: any, args: any, context: any, info: any) => {
      const user = await LibUser.validUser(args);
      return user;
    },
    userCount:async () => {
      return await LibUser.userCount();
    },
    /* notes */
    notes: async () => {
      return await LibNote.getItems();
    },
    note: async (parent: any, args: any, context: any, info: any) => {
      return await LibNote.getItem(args.id);
    },
    noteTags: async (parent: any, args: any, context: any, info: any) => {
      return await LibNote.getNoteTags(args);
    },    
  },
  Mutation: {
    addTask: async (parent, args, context) => {
      const ret = await LibTask.addTask(args)
      return ret
    },
    updateTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.updateTask(args)
      return ret
    },
    deleteTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.deleteTask(args)
      return ret
    },
    /* user */    
    addUser: async (parent: any, args: any, context: any) => {
      const ret = await LibUser.addUser(args)
      return ret
    },
    /* note */
    noteAdd: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.addItem(args)
      return ret
    },
    noteUpdate: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteUpdate(args)
      return ret
    },
    noteDelete: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteDelete(args)
      return ret
    },
    noteTagAdd: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteTagAdd(args)
      return ret
    }, 
    noteTagDelete: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteTagDelete(args)
      return ret
    },                  
  }
};