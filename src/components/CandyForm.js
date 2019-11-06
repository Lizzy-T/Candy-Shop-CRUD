import React, { Component } from 'react'
import './CandyForm.css'

export default class CandyForm extends Component {
    state={
        newCandy: {
            name: "",
            rating: 5,
            image: ''
            }
    }

    handleChange = property => (event) => {
        const newCandy = this.state.newCandy
        newCandy[property] = event.target.value
        this.setState({ newCandy })
      }

    submitAction = (event) => {
        event.preventDefault()
        const { submitAction } = this.props
        const { newCandy } = this.state
        
        submitAction(newCandy)
    }

    componentDidMount = () => {
        const { candy } = this.props
        if (candy) {
            const { name, rating, image, id } = candy
            this.setState({
                newCandy: {name, image, rating, id}
            })
        }
    }

    render () {
        const { newCandy } = this.state
        return (
                <form className="add-new-candy" onSubmit={this.submitAction}>
                    <input 
                    type="text"
                    value={newCandy.name}
                    placeholder="name of Candy"
                    onChange={this.handleChange("name")}
                    />

                    <input 
                    type="number"
                    min="1"
                    max="11"
                    value={newCandy.rating}
                    placeholder="rating"
                    onChange={this.handleChange("rating")}
                    />

                    <input 
                    type="text"
                    value={newCandy.image}
                    placeholder="image"
                    onChange={this.handleChange("image")}
                    />

                    <input className="submit-new-candy" type="submit" value="Candy-i-fy" />
                </form>
            )
    }
}