import React, { Component } from 'react';
import './App.css';

/*
const header = (
  <header>
    <h1 id={myTitleId}> {name}'s {title} </h1>
    <p>{desc}</p>
  </header>
);


const desc = React.createElement(
  'p',
  null,
  'This is ', React.createElement(
    'strong',
    null,
    'Description'
  )
);


const header = React.createElement(
  'header',
  null,
  title, desc
);
*/

/*
function Header(props) {
  return (
    <header>
      <h1>Scoreboard</h1>
      <span className="stats">Players: 1</span>
    </header>
  );
}
*/
//애로우 펑션과 함수 표현식 사용
const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <span className="stats">Players: {props.totalPlayers}</span>
    </header>
  );
}

////id를 파라미터로 넘기는 함수를 넣어야 하는데 클릭 이벤트에는 반드시 함수 선언문이 들어가야하는데 그러면 호출문이 되니까 function으로 익명함수니까 애로우 함수로 표현
const Player = (props) => {
  return (
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => props.removePlayer(props.id)}>x</button>
      </span>
      <span className="player-name">
        {props.name}
      </span>
      <Counter score={props.score}/>
      {/*this.props가 아닌 이유는 new로 생성한게 아니라 함수 호출을 해서 사용하므로*/}
    </div>
  );
}

class Counter extends React.Component {
  state = {
    score: 0
  };

  //
  // incrementScore = () => {
  //   console.log('increment', this); //lexical this : 자기자신을 가르킨다.
  //   //this.state.score = 1; //이렇게 하면 렌더링이 안됨 (setState 사용)
  //   this.setState(prevState => { //콜백함수를 써서 이전 상태를 받아 새로운 상태를 리턴함
  //     return {score: prevState.score + 1} //score 값만 merge됨
  //   });
  // }
  //
  //
  // decrementScore = () => {
  //   this.setState(prevState => {
  //     return {score: prevState.score - 1}
  //   });
  // }

  incrementScore = () => {
    this.setState(prevState => ({score: prevState.score + 1}));
  }

  decrementScore = () => {
    this.setState(prevState => ({score: prevState.score - 1}));
  }

  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore.bind(this)}> -</button>
        <span className="counter-score">{this.state.score}</span>
        <button className="counter-action increment" onClick={this.incrementScore.bind(this)}> +</button>
      </div>
    );
  }
}


// const App = (props) => {
//   return (
//     <div className="scoreboard">
//       <Header title="My scoreboard" totalPlayers={props.initialPlayers.length} />
//
//       {/*Players List*/}
//       {props.initialPlayers,map(item => <Player name = {item.name} score = {item.score} id = {item.id.toString()} />)}
//     </div>
//   );
// }

class App extends React.Component {
  state = {
    players: [ //json 객체로 들어가야 하므로 = 이 아닌 : 으로 수정 // 속성값
      {name: 'LDK', id: 1},
      {name: 'HONG', id: 2},
      {name: 'KIM', id: 3},
      {name: 'PARK', id: 4},
    ]
  }

  handleRemovePlayer = (id) => {
    this.setState(prevState => { //setState를 하면 다시 렌더링이 됨
      return {
        players: prevState.players.filter(item => item.id !== id) //새로운 배열을 만들어 참인것만 담아 리턴
      }
    })
  }

  render() { //render 함수 추가
    return (
      <div className="scoreboard">
        <Header title="My scoreboard" totalPlayers={this.state.players.length}/>

        {/*Players List*/}
        {this.state.players.map(item => <Player //name, score, key 이름으로 자식에게 줌
          name={item.name}
          score={item.score}
          key={item.id.toString()}
          removePlayer={this.handleRemovePlayer}
          id={item.id}/>)
        }
      </div>
    )
  }
}

export default App;
