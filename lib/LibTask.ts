import moment from 'moment'
const ObjectID = require('mongodb').ObjectID;
import LibMongo from "./LibMongo"
import LibApiFind from "./LibApiFind"
//
const LibTask = {
  getItems: async function(){
    try {
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection("tasks");
      let items = await collection.find({}).toArray();
      items = LibApiFind.convertItems(items);
//console.log( items)
      client.close();             
      return items;
    } catch (err) {
      throw new Error('Error , getItems');
    }          
  },
  getTask :async function(id){
    try {
      const where = { _id: new ObjectID(id) }
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection("tasks");
      const item = await collection.findOne(where) ;
      client.close();
      if(item !== null){
        item.id = item._id;
      }  
//console.log( item)       
      return item;
    } catch (err) {
      throw new Error('Error , getTask');
    }          
  },
  addTask :async function(args){
    try {
//console.log( args); 
      const item: any = {
        title: args.title ,  
        content: "",
        created_at: new Date(),
      };
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection("tasks");
      const itemOne = await collection.insertOne(item); 
      client.close();
      item.id = item._id   
//console.log(item); 
      return item;
    } catch (err) {
      throw new Error('Error , addTask');
    }          
  },  
  updateTask :async function(args){
    try {
//console.log( args); 
      const where = {"_id": new ObjectID( args.id )};
      const item: any = {
        title: args.title ,  
      };
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection("tasks");
      await collection.updateOne(where, { $set: item })
      client.close();
//console.log(item); 
      return args;
    } catch (err) {
      throw new Error('Error , addTask');
    }          
  },
  deleteTask :async function(args){
    try {
console.log( args); 
      const where = {"_id": new ObjectID( args.id )};
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection("tasks");
      await collection.deleteOne(where) 
      client.close();
//console.log(item); 
      return args;
    } catch (err) {
      throw new Error('Error , addTask');
    }          
  },         
}
export default LibTask;
