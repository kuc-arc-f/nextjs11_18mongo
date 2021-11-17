import React  from 'react';
import moment from 'moment';
import { gql } from "@apollo/client";
import client from '../../../apollo-client'
//import LibFlash from '../../../lib/LibFlash';
import LibAuth from '../../../client/lib/LibAuth';
import LibApiContent from '../../../client/lib/LibApiContent';
import LibNote from '../../../client/lib/LibNote';
import Layout from '../../../components/layout'

interface IState {
  user_id: string,
  categoryItems: Array<any>,
  tagItems: Array<any>,
  radioItems: Array<any>,
  radio_1: string,
}
interface IProps {
  history: string[],
  csrf: any,
  apikey: string,
}
//
class NoteCreate extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "" , categoryItems: [], tagItems:[], radioItems: [], radio_1: '',
    };
  }
  async componentDidMount(){
    try{
      const valid = LibAuth.valid_login(this.props)
      if(valid){
        const uid = LibAuth.get_uid()
  console.log("uid=", uid);
        const categoryItems = await LibApiContent.getItems("category");
        const radioItems = await LibApiContent.getItems("types");
        const tagItems = await LibApiContent.getItems("tags");
  console.log(tagItems);
        this.setState({
          user_id: uid ,categoryItems: categoryItems, tagItems: tagItems,
          radioItems: radioItems,
        })
  //      const dt = moment().format('YYYY-MM-DD');
  //      const pub_date = document.querySelector<HTMLInputElement>('#pub_date');
  //      pub_date.value= dt;      
      }
    } catch (e) {
      console.error(e);
      alert('error, start');
    }    
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      const arrChecked = [] 
      const check_items = this.state.tagItems;  
      check_items.forEach(function(item, index){
//console.log(item.name);
        let checkedName = "check_" + index;
        let elemChecked = document.querySelector<HTMLInputElement>('#'+ checkedName);
        if(elemChecked.checked){
          arrChecked.push(item.name)
        }
      });      
console.log(arrChecked)      
      const item = {
        title: title.value,
        content: content.value,
        category: category.value,
        noteType: this.state.radio_1,
      }
console.log(item);      
//console.log("user_id=", this.state.user_id);      
      let noteId = "";
      let result: any = await LibNote.noteAdd(client, item);
console.log(result);
      if(result.data.noteAdd.id === 'undefined'){
        throw new Error('Error , noteAdd');
      }      
      noteId = result.data.noteAdd.id;
console.log("noteId=", noteId);  
      for (let row of arrChecked) {
console.log(row);
        let result: any = await LibNote.noteTagAdd(client, noteId, row);
      }    
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }
  }
  checkRow(){
    const check_items = this.state.tagItems;
    return check_items.map((item: any, index: number) => {
// console.log(item.values.name );
      let name = "check_" + index;
      return(
        <label key={index}>
          <input type="checkbox" name={name} id={name}/>
          <span className="px-2">{item.name}</span>
        </label>           
      )      
    })
  }
  handleChangeRadio(e){
    this.setState({radio_1: e.target.value})
  }
  render() {
console.log(this.state.tagItems);
    return (
    <Layout>
      <div className="container py-2">
        <h3>Notes - Create</h3>
        <hr />
        <label>Title:</label>
        <input className="form-control" type="text" name="title" id="title" />
        <hr />
        <label>Content:</label>
        <input className="form-control" type="text" name="content" id="content" />
        <hr />
        <div className="col-md-6 form-group">
          <label>Category:</label>
          <select className="form-select" name="category" id="category">
          {this.state.categoryItems.map((item ,index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))
          }
          </select>
        </div>
        <hr />
        <label>RadioType:</label><br />
        {this.state.radioItems.map((item ,index) => {
console.log(item);
          return (
            <span key={index}>
              <input type="radio" name="radio_1" id="radio_1" value={item.name}
              onChange={this.handleChangeRadio.bind(this)} />
                {item.name}<br />
            </span>
          );
        })
        }         
        <hr />
        Tag:<br />
        {this.checkRow()}
        <hr />
        <button className="btn btn-primary" onClick={() => {this.clickHandler()}}>
        Save
        </button>        
      </div>      
    </Layout>
    );
  }
}
export default NoteCreate;
