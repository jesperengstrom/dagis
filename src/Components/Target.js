import React, { Component } from 'react';
import Button from './Button';
import clothes from '../clothes';
import PageHead from './PageHead'

class Target extends Component{
  state = {target: this.props.target};

  saveBeforeToggle = () => {
    this.props.setNewTarget(this.state.target); 
    this.props.togglePage();
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
    <tr key={el}>
      <td>{clothes[el].name}</td>
      <td>
        {this.state.target[el] ? this.state.target[el].no : clothes[el].no }
      </td>
      <td>
        <button className="larger-text" data-id={el} onClick={this.changeTarget}>+</button>
      </td>
      <td>
        <button className="larger-text" data-id={el} onClick={this.changeTarget}>-</button>
      </td>
    </tr>
    )
  };

  render(){
    return (
      <section id="target">
        <PageHead name={this.props.name}>
          <Button onClick={this.saveBeforeToggle} name="Spara" />
          <Button onClick={this.props.togglePage} name="Avbryt" />
        </PageHead>
        <h5>Vilka extraplagg ska finnas på förskolan?</h5>
        <table className="u-full-width">
          <tbody>
            {this.renderClothes()}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Target;