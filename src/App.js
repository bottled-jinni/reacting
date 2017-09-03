import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';


import logo from './logo.svg';
import './App.css';
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
    };
    this.state.data = require('./data.json');
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    //console.log(this.state.data[0]);
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onDismiss(id) {
    function isNotId(item) {
      console.log(id);
      return item._id !== id;
    }
    const updatedList = this.state.data.filter(isNotId);
    this.setState({ data: updatedList});
  }

  render() {
  const helloworld = 'Welecome to the Road to learn react';
  return (
    <div className="App">
      <form>
          <input type="text"  onChange={this.onSearchChange}/>
      </form>
      { this.state.data.filter(isSearched(this.state.searchTerm)).map(item =>{
      //{ this.state.data.map(item=> {
        return (
          <div key={item._id}>
            <span>{item._id}</span>
            <span>{item.name}</span>
            <span>{item.email}</span>
            <span>{item.phon}</span>
            <span>
              <button onClick={()=>this.onDismiss(item._id)}
                type="button">Dismiss</button>
            </span>
            </div> );
          })}
  </div>
  );
}
///////////////////////
//////////////////////////////
}//ending App

export default App;
