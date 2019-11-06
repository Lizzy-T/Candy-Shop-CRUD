import React, { Component } from 'react'
import './Candy.css'
import CandyForm from './CandyForm'

export default class Candy extends Component {

    state = {
        isFormShowing: false
    }
    
    handleRemove = () => {
        const { deleteCandy, id } = this.props 
        deleteCandy(id)
    }
    
    toggleForm = () => {
        this.setState({isFormShowing: !this.state.isFormShowing})
    }     
    
    render () {
        const { isFormShowing } = this.state
        const { name, rating, image, id, updateCandy } = this.props
        return (
            <div className="candy-card">
                <li>
                    <p>
                        {name} : {rating}
                    </p>
                    <i  className="fas fa-pencil-alt"
                        onClick={this.toggleForm}
                    ></i>
                    <i  onClick={this.handleRemove}
                        className="fas fa-times-circle"></i>
                </li>
                    <img 
                    src={image} 
                    alt="candy name"
                    />
                {
                    isFormShowing
                    ? <CandyForm 
                            submitAction={updateCandy}
                            candy={{name, rating, image, id}}
                        />
                    : null
                }
            </div>
        )
    }
}