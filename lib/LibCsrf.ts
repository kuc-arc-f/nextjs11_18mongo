// LibCsrf
const csrf = require('csrf');
const tokens = new csrf();
import LibMongo from "./LibMongo"

//
const LibCsrf = {
  get_token:async function(secret){
    try{
      const token = tokens.create(secret);
      const ret ={
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },
  valid_token:function(token){
    try{
      if(tokens.verify(process.env.CSRF_SECRET, token) === false){
          throw new Error('Invalid Token');
      }
      return true
    } catch (e) {
      console.log(e);
      console.log("error, csrf token");
      return false
    }  

  }

}
export default LibCsrf;
