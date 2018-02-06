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
import PageHead from './Components/PageHead';
import firebase from './firebase';
import URLSearchParams from  'url-search-params';

class App extends Component {
  state = {
    name: '',
    target: {},
    current: {},
    date: '',
    targetPage: false,
    loading: true,
    signup: false,
    id: '',
    error: ''
  }

  componentDidMount(){
    this.init();
  }

  init = () => {
    let urlParams = new URLSearchParams(window.location.search);
    // let id = window.location.pathname.slice(1);
    //no id in url -> signup
    if (!urlParams.has('id')) {
      this.setState({signup: true})
    }
    //else set id and fetch data
    else {
      let id = urlParams.get('id');
      this.setState({id}, this.firebaseListen)}
  }

  firebaseListen = () => {
    firebase.database().ref('/' + this.state.id)
    .on('value', (snapshot) => {
      if (snapshot.val()) {
        let response = snapshot.val();
        response.loading = false;
        this.setState(response);
      } else this.setState({error: 'oops, hittar inget sådant barn'})
    })
  }

  createNewUser = (name) => {
    let id = firebase.database().ref().push().key;
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('id', id)
    //push the new url to url bar -> prompt user to bookmark page
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    // window.history.pushState({}, 'Dagiskorgen', window.location + id);
    this.setState({name, id, signup: false, loading: false}, this.welcomeUser);
  }

  welcomeUser = () => {
    alert('Välkommen! Bokmärk eller spara denna URL, det är din personliga sida. Tappar du bort den måste du börja om från början :(');
    let post = {}
    post['/' + this.state.id] = this.state;
    firebase.database().ref()
    .update(post)
    .catch((error) => this.setState({error: 'Nåt gick fel! ' + error}));
    return this.firebaseListen();
  }


  updateDatabase = (update, dir) =>{
    let date = this.setDate();
    let updateObj = {...this.state};
    updateObj[dir] = update;
    updateObj.date = date;
    // firebase.database().ref('/' + this.state.id + '/' + dir)
    firebase.database().ref('/' + this.state.id)
    .set(updateObj)
    .catch((error) => this.setState({error: 'Problem med att skriva till databasen! ' + error}))
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

  setDate = () => {
    var today = new Date().toISOString().slice(0, 10);
    return today;
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
          <Target name={this.state.name} target={this.state.target} togglePage={this.togglePage} setNewTarget={this.setNewTarget} /> 
        </div>)
    }
    if (!this.state.targetPage) {
      return (
        <div>
          <PageHead name={this.state.name}>
            <Button onClick={this.togglePage} name="Ställ in"/>
          </PageHead>
          <Status current={this.state.current} target={this.state.target} removeItem={this.removeItem} />
          <Add current={this.state.current} target={this.state.target} addItem={this.addItem} />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.error && <h5 className="warning">{this.state.error}</h5>}
        {this.renderApp()}
        {this.state.date && <p>Senast uppdaterad: {this.state.date} | <a href="https://github.com/jesperengstrom/dagis">GH</a></p>}
      </div>
    );
  }
}

export default App;
