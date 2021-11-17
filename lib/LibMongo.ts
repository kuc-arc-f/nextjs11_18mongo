// LibMongo
const MongoClient = require('mongodb').MongoClient;

//
const LibMongo = {
  init:function(){
    this.dbName = process.env.MONGODB_DB_NAME
  },
  getDbName:function(){
    return this.dbName;
  },
  getClient:async function(){
    try{
      const uri = process.env.MONGODB_URI + "?retryWrites=true&w=majority";
      //console.log(process.env.MONGODB_DB_NAME);
      const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      return client
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },
  getItem: async function(collectionName , where ){
    try{
      this.init()
//      let client = await MongoClient.connect( this.url);
//      const db = client.db( this.dbName);
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection(collectionName);
      const item = await collection.findOne(where) 
      client.close();
      return item
    } catch (err) {
      console.log(err);
      throw new Error('Error, getItem');
    }
  },     
  getCount: async function(collectionName , where){
    try{
      this.init()
      const client = await LibMongo.getClient();
      const collection = client.db(process.env.MONGODB_DB_NAME).collection(collectionName);
      const ret = await collection.find(where).count()
      client.close();
      return ret
    } catch (err) {
      console.log(err);
      throw new Error('Error, getCount');
    }
  },

}
export default LibMongo;
