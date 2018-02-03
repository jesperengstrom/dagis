import React, { Component } from 'react';

class Status extends Component{
  
  renderStatus(){
    let current = this.props.current;
    let target = this.props.target;
    return Object.keys(current).map((el) => {
      return <p key={current[el].name}>
              {current[el].name}: 
              <span className={this.checkShortage(current[el].no, target[el].no) ? 'warning' : ''}> {current[el].no}</span>
              {current[el].no > 0 ? <button onClick={()=> this.props.removeItem(el)}>-</button> : ''}
            </p>
            });
  }

  checkShortage(current, target) {
    return current < target;
  }


  render(){
    return (
      <section id="status">
        <h1>Status</h1>
        {this.renderStatus()}

      </section>
    )
  }
}

export default Status;