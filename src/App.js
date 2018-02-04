import React, { Component } from 'react';
import './App.css';
import Status from './Components/Status';
import Add from './Components/Add';
import Target from './Components/Target';
// import data from './reponse';
import Button from './Components/Button';

class App extends Component {
  state = {
    name: '',
    target: {},
    current: {},
    date: '',
    targetPage: false
  }

  componentDidMount(){
    this.fetchFromApi();
  }

   fetchFromApi(){
    // try {
    //   this.setState({...data});

    // } catch(e){
    //   console.log('Error!', e);
    // }
  };

  togglePage = () => {
    let value = !this.state.targetPage
    this.setState({targetPage: value});
  }

  addItem = (item) => {
    let current = {...this.state.current}
    if (!current[item]) {
      current[item] = {...this.state.target[item]}
      current[item].no = 1;
    } else current[item].no++;
    this.setState({current})
  } 

  removeItem = (item) => {
    let current = {...this.state.current}
    current[item].no = this.state.current[item].no - 1;
    this.setState({current});
  };

  setNewTarget = (target, callback) => {
    this.setState({target}, callback)
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        {this.state.targetPage ? 
        <div>
          <Target target={this.state.target} togglePage={this.togglePage} setNewTarget={this.setNewTarget} /> 
        </div>
        : 
        <div>
          <Button onClick={this.togglePage} name="Ställ in"/>
          <Status current={this.state.current} target={this.state.target} removeItem={this.removeItem} />
          <Add current={this.state.current} target={this.state.target} addItem={this.addItem} />
        </div>
      }
      </div>
    );
  }
}

export default App;
