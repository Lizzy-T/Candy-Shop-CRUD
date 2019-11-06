import React, { Component } from 'react';
import './App.css';

import CandyList from './components/CandyList'
import FilterBar from './components/FilterBar'
import CandyForm from './components/CandyForm'

const BASE_URL = "https://candy-api.herokuapp.com"


class App extends Component {
    state = {
      candies: [],
      searchTerms: ''
  }

  componentDidMount = () => {
      fetch(`${BASE_URL}/candies`)
          .then(response => response.json())
          .then(results => {
              this.setState({
                  candies: results
              })
          })
  }

  handleSearch = (event) => {
    this.setState({searchTerms: event.target.value})
  }

  filteredCandies = () => {
    return this.state.candies.filter(candy => {
      return ( 
        candy.name.toLowerCase().includes(this.state.searchTerms.toLowerCase())
        ||
        candy.rating.toString().includes(this.state.searchTerms.toString()))
    })
  }



  addCandy = candy => {
    console.log(candy)
    return fetch(`${BASE_URL}/candies`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(candy)
      }).then(response => response.json())
      .then(candy => {
        this.setState({
          candies: [...this.state.candies, candy]
        })
      }
    )  
  }

  deleteCandy = (id) => {
    const { candies } = this.state
    fetch(`${BASE_URL}/candies/${id}`, {
      method: "DELETE"
    }).then(() => {
        this.setState({candies: candies.filter(candy => candy.id !== id) })
      })
  }

  updateCandy = ({name, rating, id, image}) => {
    return fetch(`${BASE_URL}/candies/${id}`, {
      method: "PUT",
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({name, rating, image})
    }).then(() => {
      this.setState({
        candies: this.state.candies.map(candy => candy.id === id ? {name, rating, image, id} : candy)
      })
    })
  }

  render () {  
    const { searchTerms, newCandy } = this.state
    return (
        <div className="App">
          <header>
            <h1>Welcome to the Candy Shop</h1>
          </header>
          <main>
            <FilterBar 
              searchTerms = {searchTerms}
              handleSearch = {this.handleSearch}
            />
            <CandyList
            candies={this.filteredCandies()}
            deleteCandy={this.deleteCandy}
            updateCandy={this.updateCandy}
            handleChange={this.handleChange}
            newCandy={newCandy}
            />
            <section class="add-candy-form">
              <CandyForm 
                submitAction={this.addCandy}
              />
            </section>
          </main>
        </div>
      );
    }
}

export default App;
