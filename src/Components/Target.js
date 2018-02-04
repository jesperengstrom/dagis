import React, { Component } from 'react';
import Button from './Button';
import clothes from '../clothes';

class Target extends Component{
  state = {target: this.props.target};

  saveBeforeToggle = () => {
    this.props.setNewTarget(this.state.target, this.props.togglePage); 
  }

  changeTarget = (e) => {
    const item = e.target.getAttribute('data-id');
    const newState = {...this.state.target}
    if(e.target.innerHTML === '+'){
      //if prop exists, add 1
      if (newState[item]) {
        newState[item].no++; 
      //else add prop and set to 1
      } else {
        newState[item] = clothes[item]
        newState[item].no = 1;
      }

    } else {
      //if bigger than 0 subtract 1
      if (newState[item] && newState[item].no > 0) {
        newState[item].no--;
      }
      //if 0 remove prop from target
      if (newState[item] && newState[item].no === 0) {
        delete newState[item];
      }
    }
    this.setState({target: newState})
  }

  renderClothes = () => {
    return Object.keys(clothes).map((el)=>
    <div key={el}>
      <p>
        {clothes[el].name}
        <span>
        {this.state.target[el] ? this.state.target[el].no : clothes[el].no }
        </span>
        <button data-id={el} onClick={this.changeTarget}>+</button>
        <button data-id={el} onClick={this.changeTarget}>-</button>
      </p>
    </div>
    )
  };

  render(){
    return (
      <section id="target">
        <h1>Vilka extraplagg som ska finnas på förskolan?</h1>
        <Button onClick={this.saveBeforeToggle} name="Ok" />
        <Button onClick={this.props.togglePage} name="Avbryt" />
        {this.renderClothes()}
      </section>
    );
  }
}

export default Target;