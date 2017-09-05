import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/lib/Button';

//const list = require('./data.json');
function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
class App extends Component {

  //import created data.
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchTerm : '',
      name: "",
      email:"",
      phone:"",
      _id: "6789087",
      sortdirection: true,
    };
    this.state.data = require('./data.json');
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.onSortname = this.onSortname.bind(this);
    this.onSortemail = this.onSortemail.bind(this);
    this.onSortphone = this.onSortphone.bind(this);

    this.Adding = this.Adding.bind(this);
    this.onAddname = this.onAddname.bind(this);
    this.onAddemail = this.onAddemail.bind(this);
    this.onAddphone = this.onAddphone.bind(this);
    //console.log(this.state.data[0]);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onDelete(id) {
    function isNotId(item) {
      console.log(id);
      return item._id !== id;
    }
    const updatedList = this.state.data.filter(isNotId);
    {/*
        Asumme that data is removed from the db.
        And, that rows are retrieved.
    */}
    this.setState({ data: updatedList});
  }

  onAddname(e) {
    this.setState({ name: e.target.value });
  }
  onAddemail(e) {
    this.setState({ email: e.target.value });
  }
  onAddphone(e) {
    this.setState({ phone: e.target.value });
  }
  onEdit(id) {
      console.log("Editing a row");
  }
  onSortname(e)
    {
      {/*toggle*/}
      var localdata = this.state.data;
      var direction = this.state.sortdirection;
      this.setState({ sortdirection: !direction});
      console.log(localdata);
      localdata.sort(predicateBy("name",direction));
      this.setState({ data: localdata});
      console.log("sorted.");

    }
    onSortemail(e)
      {
        {/*toggle*/}
        var localdata = this.state.data;
        var direction = this.state.sortdirection;
        this.setState({ sortdirection: !direction});
        console.log(localdata);
        localdata.sort(predicateBy("email",direction));
        this.setState({ data: localdata});
        console.log("sorted.");

      }
      onSortphone(e)
        {
          {/*toggle*/}
          var localdata = this.state.data;
          var direction = this.state.sortdirection;
          this.setState({ sortdirection: !direction});
          console.log(localdata);
          localdata.sort(predicateBy("phone",direction));
          this.setState({ data: localdata});
          console.log("sorted.");

        }
  Adding(e) {
    e.preventDefault();
        var newrow = {};
        {/*
          generate an id (uuid) = done
          validation ? protoTypes ?

        */}
        var isEmail = ValidateEmail(this.state.email);
        var isPhone = telephoneCheck(this.state.phone);
        var isName  = validateName(this.state.name);

      if(isEmail && isPhone && isName)
      {
        newrow["_id"]  = uuidv4();
        newrow["name"] = this.state.name;
        newrow["email"]= this.state.email;
        newrow["phone"] = this.state.phone;
        var localdata = this.state.data;
        console.log(this.state.data[0]._id);
        localdata.push(newrow);
        this.setState({ data: localdata});
        {/*Directo manipulation.
        this.state["data"] = localdata;
        */}
	{/* clear fields*/}
          this.setState({ name: ""});
          this.setState({ email: ""});
          this.setState({ phone: ""});
        console.log("Adding a new row.", this.state.data );

      }
      else{
        {/*show whichever is wrong*/}
        var message = "";
        message += isEmail ? "" : "\nInvalid email, provide a correct one.";
        message += isPhone ? "" : "\nInvalid Phone, provide a correct one.(10 digits required)";
        message += isName ?  "" : "\nInvalid Name, provide a correct one.";
        {/*
            Hot to avoid alert  ?
          */}
        alert(message);
        return; {/*won't block second alert?*/}
      }
  }

  render() {

  return (
    <div className="App">
     <Title />
      <form>
          <input className="searchs" type="text"  onChange={this.onSearchChange}/>
      </form>
      <form onSubmit={this.Adding}>
        <input value={this.state.name}  onChange={this.onAddname} placeholder="Full Name"/>
        <input value={this.state.email} onChange={this.onAddemail} placeholder="E-mail address"/>
        <input value={this.state.phone} onChange={this.onAddphone} placeholder="Phone number"/>
        <button onClick={this.Adding} className="addnew">Add new</button>
      </form>

       <table className="table">
       <thead>
       <th onClick={this.onSortname}>Name (↕)</th>
       <th onClick={this.onSortemail}>E-mail Address</th>
       <th onClick={this.onSortphone}>Phone Number</th>
       <th></th>
        </thead>
        <tbody>


      { this.state.data.filter(isSearched(this.state.searchTerm)).map(item =>{
      //{ this.state.data.map(item=> {
        return (
          <tr key={item._id} className="addn" >
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
                <button onClick={()=>this.onEdit(item._id)} type="button">Edit</button>
                <button onClick={()=>this.onDelete(item._id)} type="button">Delete</button>
            </td>
          </tr>
          );
          })}
          </tbody>
        </table>
  </div>
  );
}
}//ending App
var Title = React.createClass({
  render() {
    return (
        <h1 className="summary">List of participants</h1>
    );
  }
});

{/*stackoverflow*/}
function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
}

{/*http://www.w3resource.com/javascript/form/email-validation.php*/}
function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
{/* https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript */}
function telephoneCheck(str) {
  var isphone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(str);
  return isphone;
}
function validateName(str){
  return /^[A-Za-z\s]+$/.test(str);
}
{/*https://stackoverflow.com/questions/11099610/generic-way-of-sorting-json-array-by-attribute*/}
function predicateBy(prop,direction){
  if(direction)
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
   else
   return function(a,b){
      if( a[prop] > b[prop]){
          return -1;
      }else if( a[prop] < b[prop] ){
          return 1;
      }
      return 0;
   }
}
export default App;
