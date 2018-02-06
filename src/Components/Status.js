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
        return <tr><td>Tomt på hyllan! <span role="img" aria-label="help">😱</span></td></tr>
      
      //else do proper render
      } else {
        return filteredKeys.map((el) => {
          return (
            <tr key={current[el].name}>
              <td>{current[el].name}:</td>
              <td>
                <span className={this.isShortage(current[el], target[el]) ? 'warning' : 'no-warning'}> {current[el].no}</span>
              </td>
              <td>
                {current[el].no > 0 ? <button className="larger-text float-right" onClick={()=> this.props.removeItem(el)}>-</button> : ''}
              </td>
            </tr>)
        });
      }
  };

  isShortage(current, target) {
    //maybe item is no longer in target, but remains in current
    if (target) {
      return current.no < target.no;
    } else return false;
  };


  render(){
    return (
      <section id="status">
        <h3>Hämta</h3>
        <table className="u-full-width">
          <tbody>
            {this.renderStatus()}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Status;