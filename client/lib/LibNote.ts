import LibContent from './LibContent';
import { gql } from "@apollo/client";
//
const LibNote = {
  get_category_item : function(id , categories){
    try{
      let ret = {}
      categories.forEach(function (category){
        if( id === category._id ){
          ret = category
        }
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_category_item');
    } 
  },
  getTagItems: function(items, note_id){
    try{
      const ret = [];
      const tags = items.filter(item => (item.values.note_id === note_id));
//console.log(tags);
      tags.forEach(function(item, index){
        ret.push(item.values.name);
      }); 
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , getTagItems');
    } 
  },
  /* noteTags delete */
  deleteManyTags:async function(items, note_id){
    try{
      const tags = items.filter(item => (item.values.note_id === note_id));
//console.log(tags);
      for (let tag of tags) {
        const result = await LibContent.delete_item(tag.id)
      }
    } catch (e) {
      console.error(e);
      throw new Error('Error , deleteManyTags');
    }
  },
  noteAdd:async function(client: any, item: any){
    try{
      const result = await client.mutate({
        mutation:gql`
        mutation {
          noteAdd(title: "${item.title}", content: "${item.content}",
            category:"${item.category}", noteType:"${item.noteType}")
          {
            id
          }
        }            
      `
      });
//console.log(result);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error , noteAdd');
    }
  },
  noteTagAdd:async function(client: any, noteId: string, row: string){
    try{
//console.log(result);
      const result = await client.mutate({
        mutation:gql`
        mutation {
          noteTagAdd(noteId: "${noteId}", name: "${row}"){
            id
          }
        }                      
      `
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error , noteTagAdd');
    }
  },
  noteUpdate:async function(client: any, noteId: string, item: any){
    try{
//console.log(result);
      let result = await client.mutate({
        mutation:gql`
        mutation {
          noteUpdate(id: "${noteId}", title: "${item.title}", content: "${item.content}"
          category:"${item.category}", noteType:"${item.radio_1}"){
            id
          }
        }
      `
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error , noteUpdate');
    }
  },
  noteTagDelete:async function(client: any, noteId: string){
    try{
  //console.log(result);
      const result = await client.mutate({
        mutation:gql`
        mutation {
          noteTagDelete(noteId: "${noteId}")
        }        
      `
      });  
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('Error , noteTagDelete');
    }
  },


}
export default LibNote;
