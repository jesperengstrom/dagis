import React, { Component } from 'react';
import './App.css';
import Status from './Components/Status';
import Missing from './Components/Missing';
import data from './Components/reponse'

class App extends Component {
  state = {
    name: '',
    target: {},
    current: {},
    date: ''
  }

  componentDidMount(){
    this.fetchFromApi();
  }

   fetchFromApi(){
    try {
      this.setState({...data});

    } catch(e){
      console.log('Error!', e);
    }
  };

  removeItem = (item) => {
    let current = {...this.state.current}
    current[item].no = this.state.current[item].no - 1;
    this.setState({current});
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <Status current={this.state.current} target={this.state.target} removeItem={this.removeItem} />
        <Missing current={this.state.current} target={this.state.target} />
      </div>
    );
  }
}

export default App;
