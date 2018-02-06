import React, { Component } from 'react';

class Add extends Component{

  checkShortage(item){
    let target = this.props.target[item].no;
    let current = this.props.current[item] ? this.props.current[item].no : 0;
    if (target > current){
      return <span className="warning"> ({target - current} st saknas!)</span>;
    } else return false
  }

  renderAddList = () => {
    let target = this.props.target;
    if (Object.keys(target).length === 0) {
      return (
      <tr>
          <td>Välj "ställ in" för att ange reservplagg som ska finnas. <span role="img" aria-label="hmm">😎</span></td>
      </tr>)
    }
    return Object.keys(target).map((el) => {
      return (<tr key={target[el].name}> 
              <td>
                {target[el].name}
              </td>
              <td>
                {this.checkShortage(el)}
              </td>
              <td>
                <button className="larger-text float-right" onClick={()=>this.props.addItem(el)}>+</button>
              </td>
            </tr>)
        }
      );
  }

  render(){
    return (
      <section id="missing">
        <h3>Lämna</h3>
        <table className="u-full-width">
          <tbody>
            {this.renderAddList()}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Add;