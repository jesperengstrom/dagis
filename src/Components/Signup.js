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
      <div className="flex flex-col flex-center">
        <h5>Välkommen, skriv in ditt barns namn!</h5>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <input type="text" value={this.state.name} onChange={this.onChange}/>
            <input type="submit" value="OK" />
          </div>
        </form>
      </div>
    )
  }
}

export default Signup;