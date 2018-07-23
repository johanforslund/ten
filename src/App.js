import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    cards: [],
    money: 100,
    idCounter: 0
  }

  deal = numberOfCards => {
    if (this.state.money < numberOfCards) return;

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
      money: this.state.money - numberOfCards
    });
  }

  sellCard = id => {
    const card = this.state.cards.find(card => {
      return card.id === id;
    });

    this.state.cards.filter(card => {
      return card.id != id;
    });

    this.setState({
      cards: this.state.cards.filter(card => {
        return card.id != id;
      }),
      money: this.state.money + card.number //This should of course be changed
    });
  }

  renderCards() {
    return this.state.cards.map(card => {
      return (
        <div onClick={() => this.sellCard(card.id)} className={`card ${card.id === this.state.idCounter-1 ? 'latest' : ''}`}>
          <p>{card.number}</p>
        </div>
      );
    });
  }

  renderResultText() {
    const latestCard = this.state.cards.find(card => {
      return card.id === this.state.idCounter - 1;
    });

    if (this.state.idCounter > 0 && latestCard) {
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
        <button onClick={() => this.deal(10) }>DEAL 10 CARDS</button>
        <button onClick={() => this.deal(1)}>DEAL 1 CARD</button>
        {this.renderResultText()}
        {this.renderCards()}
      </div>
    );
  }
}

export default App;
