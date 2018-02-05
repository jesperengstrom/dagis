import React, { Component } from 'react';
import './Skeleton-2.0.4/css/normalize.css';
import './Skeleton-2.0.4/css/skeleton.css';
import './App.css';
import Status from './Components/Status';
import Add from './Components/Add';
import Target from './Components/Target';
import Button from './Components/Button';
import Loading from './Components/Loading';
import Signup from './Components/Signup';
import firebase from './firebase';

class App extends Component {
  state = {
    name: '',
    target: {},
    current: {},
    date: '',
    targetPage: false,
    loading: true,
    signup: false,
    id: ''
  }

  componentDidMount(){
    this.init();
  }

  init = () => {
    let id = window.location.pathname.slice(1);
    //no id in url -> signup
    if (id === '') {
      this.setState({signup: true})
    }
    //else set id and fetch data
    else this.setState({id}, this.firebaseListen)
  }

  firebaseListen = () => {
    firebase.database().ref('/' + this.state.id)
    .on('value', (snapshot) => {
      let response = snapshot.val();
      response.loading = false;
      this.setState(response);
    })
  }

  createNewUser = (name) => {
    let id = firebase.database().ref().push().key;
    window.history.pushState({}, 'Dagiskorgen', window.location + id);
    this.setState({name, id, signup: false, loading: false}, this.welcomeUser);
  }

  welcomeUser = () => {
    alert('Välkommen! Bokmärk eller spara denna URL, det är din personliga sida. Tappar du bort den måste du börja om från början :(');
    let post = {}
    post['/' + this.state.id] = this.state;
    firebase.database().ref().update(post);
    return this.firebaseListen();
  }


  updateDatabase = (update, dir) =>{
    firebase.database().ref('/' + this.state.id + '/' + dir)
    .set(update)
  }

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
    this.updateDatabase(current, 'current')
  } 

  removeItem = (item) => {
    let current = {...this.state.current}
    current[item].no = current[item].no - 1;
    //if item is removed from target - remove it from current too (if it's 0)
    if (!this.state.target[item] && current[item].no === 0) {
      delete current[item];
    }
    this.updateDatabase(current, 'current')
  };

  setNewTarget = (target) => {
    this.updateDatabase(target, 'target')
  }

  renderApp = () => {
    if (this.state.signup){
      return <Signup createNewUser={this.createNewUser} />
    }
    if (this.state.loading) {
      return <Loading />
    }
    if (this.state.targetPage) {
      return (
        <div>
          <Target target={this.state.target} togglePage={this.togglePage} setNewTarget={this.setNewTarget} /> 
        </div>)
    }
    if (!this.state.targetPage) {
      return (
        <div>
          <Button onClick={this.togglePage} name="Ställ in"/>
          <Status current={this.state.current} target={this.state.target} removeItem={this.removeItem} />
          <Add current={this.state.current} target={this.state.target} addItem={this.addItem} />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        {this.renderApp()}
      </div>
    );
  }
}

export default App;
