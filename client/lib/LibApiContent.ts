//import client from '../apollo-client'
//import Content from '../graphql/content'
//import LibApiFind from '../lib/LibApiFind';
//
const LibApiContent = {
  getItems: async function(content_name){
    try {
      const site_id = process.env.MY_SITE_ID;
      const url = process.env.API_URL +`/api/get/find?content=${content_name}&site_id=${site_id}`;
      const res = await fetch(url)    
      const json = await res.json()      
      return json      
    } catch (error) {
      alert("Error, getItems")
      console.error(error);
    }    
  },
  get_items_uid: async function(content_name, user_id){
    try {
      const site_id= process.env.MY_SITE_ID;
      return []      
    } catch (error) {
      alert("Error, get_items_uid")
      console.error(error);
    }    
  },  


}
export default LibApiContent
