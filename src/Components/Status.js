import React, { Component } from 'react';

class Status extends Component{
  
  renderStatus(){
    let current = this.props.current;
    let target = this.props.target;

    //exclude those with 0-value not present in target
    let filteredKeys = Object.keys(current)
      .filter((el) => current[el].no > 0 || target[el]);
    
      //check for empty array here
      if (filteredKeys.length === 0) {
        return <p>Tomt på hyllan! <span role="img" aria-label="help">😱</span></p>
      
      //else do proper render
      } else {
        return filteredKeys.map((el) => {
          return <p key={current[el].name}>
                {current[el].name}: 
                <span className={this.isShortage(current[el], target[el]) ? 'warning' : ''}> {current[el].no}</span>
                {current[el].no > 0 ? <button onClick={()=> this.props.removeItem(el)}>-</button> : ''}
              </p>
              });
      }

  }

  isShortage(current, target) {
    //maybe item is no longer in target, but remains in current
    if (target) {
      return current.no < target.no;
    } else return false;
  }


  render(){
    return (
      <section id="status">
        <h1>Hämta</h1>
        {this.renderStatus()}
      </section>
    )
  }
}

export default Status;