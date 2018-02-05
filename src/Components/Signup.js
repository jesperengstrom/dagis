import React, { Component } from 'react';

class Signup extends Component{
  state = {
    name: ''
  }

  onChange = (e) => {
    this.setState({name: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createNewUser(this.state.name);
  }

  render(){
    return (
      <div className="flex-col-center">
        <h1>Välkommen, skriv in ditt barns namn!</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onChange}/>
          <input type="submit" value="OK" />
        </form>
      </div>
    )
  }
}

export default Signup;