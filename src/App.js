import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = { 
    store: STORE
  }

  handleDeleteButton = (id) => {
    const { lists, allCards } = this.state.store;
    let newArr = lists.map(list => {
      list.cardIds = list.cardIds.filter(element => element !== id);
      return list;
    });

    delete allCards[id];

    this.setState({
      store: {
        lists: newArr,
        allCards
      }
    })
  }

  handleRandomCard = (listId) => {
    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }

    const { lists, allCards } = this.state.store;
    const newCard = newRandomCard();

    allCards[newCard.id] = newCard;

    let newList = lists.map(element => {
      if (element.id === listId) {
        element.cardIds.push(newCard.id);
      }
      return element;
    });

    this.setState({
      store: {
        lists: newList,
        allCards
      }
    })

  }

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              handleRandomCard={this.handleRandomCard}
              handleDeleteButton={this.handleDeleteButton}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
