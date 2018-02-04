import React, { Component } from 'react';

class Add extends Component{

  checkShortage(item){
    let target = this.props.target[item].no;
    let current = this.props.current[item] ? this.props.current[item].no : 0;
    if (target > current){
      return <span class="warning"> ({target - current} st saknas!)</span>;
    } else return false
  }

  renderAddList = () => {
    let target = this.props.target;
    if (Object.keys(target).length === 0) {
      return <p>Välj "ställ in" för att ange reservplagg som ska finnas. <span role="img" aria-label="hmm">😎</span></p>
    }
    return Object.keys(target).map((el) => {
      return <p key={target[el].name}>
              {target[el].name}
              {this.checkShortage(el)}
              <button onClick={()=>this.props.addItem(el)}>+</button>
            </p>
            });
  }

  render(){
    return (
      <section id="missing">
        <h1>Lämna</h1>
        {this.renderAddList()}
      </section>
    );
  }
}

export default Add;