import './App.css';
import React from 'react';
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(
      //() => this.tick() , 1000 
      () => this.setState({date: new Date()}) , 1000 //每隔一秒呼叫一次
      //為什麼一定要用arrow function 
    );
  }
  /*tick(){
    this.setState({date: new Date()});
  }*/

  componentWillUnmount(){
    clearInterval(this.timerID);
  } //清掉timerID的記憶體

  render() {
    return(
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
    )
  };
}
export default Clock;
