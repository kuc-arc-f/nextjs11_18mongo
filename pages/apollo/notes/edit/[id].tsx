import React  from 'react';
import { gql } from "@apollo/client";
import client from '../../../../apollo-client'

//import LibFlash from '../../lib/LibFlash';
import Layout from '../../../../components/layout'
import LibApiContent from '../../../../client/lib/LibApiContent';
import LibNote from '../../../../client/lib/LibNote';
//
interface IState {
  id: string,
  title: string,
  content: string,
  categoryItems: Array<any>,
  tagItems: Array<any>,
  radioItems: Array<any>,
  radio_1: string,
  category: string,
}
interface IProps {
  history: string[],
  item: any,
  id: number,
  tags: Array<any>,
  noteTags: Array<any>,
}
class NoteEdit extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
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
    const noteTags = [];
    const tags = dataTag.data.noteTags;
    return {
      id: id,
      item: row,
      tags: tags,
      noteTags: noteTags,
    };
  }  
  constructor(props: any) {
    super(props);
console.log(props);
    this.state = {
      id: props.id,
      title: props.item.title,
      content: props.item.content,
      category: props.item.category,
      radio_1: props.item.noteType,
      categoryItems: [], tagItems: [],
      radioItems: [],
    };
  }
  async componentDidMount(){
    try{
      const categoryItems = await LibApiContent.getItems("category");
      const radioItems = await LibApiContent.getItems("types");
      const tagItems = await LibApiContent.getItems("tags");
      this.setState({
        categoryItems: categoryItems, tagItems: tagItems, radioItems: radioItems 
      });
      const category = document.querySelector<HTMLInputElement>('#category');
      category.value = this.props.item.category;
    } catch (e) {
      console.error(e);
      alert("error, start");
    }    
//    const pub_date = document.querySelector<HTMLInputElement>('#pub_date');
//    pub_date.value= this.props.item.values.pub_date;    
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      const arrChecked = [] 
      const check_items = this.state.tagItems;  
      check_items.forEach(function(item, index){
console.log(item.name) 
        let checkedName = "check_" + index;
        let elemChecked = document.querySelector<HTMLInputElement>('#'+ checkedName);
        if(elemChecked.checked){
          arrChecked.push(item.name)
        }
      });      
//console.log(arrChecked)      
      const item = {
        title: title.value,
        content: content.value,
        category: category.value,
        radio_1: this.state.radio_1,
      }
//console.log(item);
      let result: any = await LibNote.noteUpdate(client, this.state.id, item);
console.log(result);
      if(result.data.noteUpdate.id === 'undefined'){
        throw new Error('Error , noteAdd');
      }
      result = await LibNote.noteTagDelete(client, this.state.id);
console.log(result); 
      for (let row of arrChecked) {
console.log(row);
        let result: any = await LibNote.noteTagAdd(client, this.state.id, row);
      }           
      alert("Complete, update");
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  }
  async deleteHandler(){
    try {
      let result = await client.mutate({
        mutation:gql`
        mutation {
          noteDelete(id: "${this.state.id}"){
            id
          }
        }        
      `
      });
console.log(result);      
      alert("Complete, delete");
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }
  }
  valid_check(items , value){
    let valid = false
    const rows = items.filter(item => (item.name === value));
    if( rows.length > 0){ valid = true }
    return valid
  }  
  checkRow(){
//console.log(this.props.tags);
    const check_items = this.state.tagItems;
    return check_items.map((item: any, index: number) => {
//console.log(item.name );
      let valid = this.valid_check(this.props.tags , item.name)
      let name = "check_" + index;
      return(
        <label key={index}>
          <input type="checkbox" name={name} id={name} defaultChecked={valid} />
          <span className="px-2">{item.name}</span>
        </label>           
      )      
    })
  }
  handleChangeRadio(e){
    this.setState({radio_1: e.target.value})
  }    
  render() {
//console.log(this.state.tagItems);
    return (
    <Layout>
      <div className="container py-2">
        <h3>Notes - Edit</h3>
        ID : {this.state.id} 
        <hr />   
        <label>Title:</label>
        <input className="form-control" type="text" name="title" id="title"
          defaultValue={this.state.title} />
        <hr />
        <label>Content:</label>
        <input className="form-control" type="text" name="content" id="content" 
        defaultValue={this.state.content} />
        <hr />
        <div className="col-md-6 form-group">
          <label>Category:</label>
          <select className="form-select" name="category" id="category">
          {this.state.categoryItems.map((item ,index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))
          }
        </select>
        <hr />
        <label>RadioType:</label><br />
        {this.state.radioItems.map((item ,index) => {
//console.log(item);
          return (
            <span key={index}>
              <input type="radio" name="radio_1" id="radio_1" value={item.name}
              defaultChecked={this.state.radio_1 === item.name}
              onChange={this.handleChangeRadio.bind(this)} />
                {item.name}<br />
            </span>
          );
        })
        }
        <hr />
        Tags:<br />
        {this.checkRow()}
        </div>
        <hr />      
        <button className="btn btn-primary" onClick={() => {this.clickHandler()}}>
          Save
        </button>   
        <hr />
        <button className="btn btn-danger" onClick={() => {this.deleteHandler()}}>Delete
        </button>
      </div>
    </Layout>
    );
  }
}
export default NoteEdit;
