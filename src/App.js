import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    cards: [],
    money: 3000,
    idCounter: 0,
    won: false
  }

  deal = numberOfCards => {
    if (this.state.money < numberOfCards) return;

    if (this.state.won) this.setState({ won: false });

    const result = [];
    for (let i=0; i<numberOfCards; i++) {
      const randomNumber = Math.random();
      let chosenNumber;
      if (randomNumber >= 0 && randomNumber < 1/55) chosenNumber = 1;
      else if (randomNumber >= 1/55 && randomNumber < 3/55) chosenNumber = 2;
      else if (randomNumber >= 3/55 && randomNumber < 6/55) chosenNumber = 3;
      else if (randomNumber >= 6/55 && randomNumber < 10/55) chosenNumber = 4;
      else if (randomNumber >= 10/55 && randomNumber < 15/55) chosenNumber = 5;
      else if (randomNumber >= 15/55 && randomNumber < 21/55) chosenNumber = 6;
      else if (randomNumber >= 21/55 && randomNumber < 28/55) chosenNumber = 7;
      else if (randomNumber >= 28/55 && randomNumber < 36/55) chosenNumber = 8;
      else if (randomNumber >= 36/55 && randomNumber < 45/55) chosenNumber = 9;
      else if (randomNumber >= 45/55 && randomNumber <= 1) chosenNumber = 10;

      result.push({
        number: chosenNumber,
        id: this.state.idCounter + i
      });
    }

    this.setState({
      cards: [...this.state.cards, ...result].sort((a, b) => a.number - b.number),
      idCounter: this.state.idCounter + numberOfCards,
      money: this.state.money - (numberOfCards * 500 / 55) //Verkar vara för dyrt...
    }, () => {
      if (this.checkForWin()) {
        this.win();
      }
    });
  }

  buyCard = number => {
    if (this.state.money < number) return;

    if (this.state.won) this.setState({ won: false });

    const card = {
      number: number,
      id: this.state.idCounter
    };

    this.setState({
      cards: [...this.state.cards, card].sort((a, b) => a.number - b.number),
      idCounter: this.state.idCounter + 1,
      money: this.state.money - ((11-number)/55*500)
    }, () => {
      if (this.checkForWin()) {
        this.win();
      }
    });
  }

  sellCard = id => {
    const card = this.state.cards.find(card => {
      return card.id === id;
    });

    this.state.cards.filter(card => {
      return card.id !== id;
    });

    this.setState({
      cards: this.state.cards.filter(card => {
        return card.id !== id;
      }),
      money: this.state.money + ((11-card.number)/55*500)
    });
  }

  checkForWin() {
    const uniCards = [...(new Set(this.state.cards.map(({ number }) => number)))];
    if (uniCards.length === 10) {
      return true;
    }
    return false;
  }

  win() {
    const numbers = this.state.cards.map(card => {
      return card.number;
    });

    const cards = this.state.cards;

    for (let i=1; i<=10; i++) {
      const index = numbers.indexOf(i);

      if (index !== -1) {
        cards.splice(index, 1);
        numbers.splice(index, 1);
      }
    }

    this.setState({
      cards: cards,
      won: true,
      money: this.state.money += 500
    });
  }

  renderCards() {
    return this.state.cards.map(card => {
      return (
        <div
          key={card.id}
          onClick={() => this.sellCard(card.id)}
          className={`card ${card.id === this.state.idCounter-1 ? 'latest' : ''}`}
        >
          <p>{card.number}</p>
        </div>
      );
    });
  }

  renderWinningCards() {
    const winningCards = [];
    if (this.state.won) {
      for (let i=1; i<=10; i++) {
        winningCards.push(
          <div style={{background: 'lightgreen'}} className={'card'}>
            <p>{i}</p>
          </div>
        );
      }
      winningCards.push(<br />);
      winningCards.push(<br />);
    }

    return winningCards;
  }

  renderBuyCards() {
    const output = [];
    for (let i=1; i<=10; i++) {
      output.push(<button onClick={() => this.buyCard(i)} style={{display: 'inline'}}>{i}</button>)
    }
    return output;
  }

  renderResultText() {
    const latestCard = this.state.cards.find(card => {
      return card.id === this.state.idCounter - 1;
    });

    if (this.state.won) {
      return (
        <h1 style={{color: 'green'}}>You won!</h1>
      );
    }
    else if (this.state.idCounter > 0 && latestCard) {
      return (
        <h2>You got <strong>{latestCard.number}</strong></h2>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ten</h1>
        <hr />
        <p>Money: ${this.state.money}</p>
        <p>Number of cards: {this.state.cards.length}</p>
        <button onClick={() => this.deal(10) }>DEAL 10 CARDS</button>
        <button onClick={() => this.deal(1)}>DEAL 1 CARD</button>
        <h3>Buy specific card</h3>
        {this.renderBuyCards()}
        <br />
        {this.renderResultText()}
        {this.renderWinningCards()}
        {this.renderCards()}
      </div>
    );
  }
}

export default App;
