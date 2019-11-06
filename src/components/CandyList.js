import React from 'react'
import './CandyList.css'
import Candy from './Candy'


export default function CandyList (props) {
    const { candies, deleteCandy, updateCandy } = props
    return (
            <ul className='candy-list'>
                {candies.map(candy => <Candy 
                                        key={candy.index} 
                                        {...candy} 
                                        deleteCandy={deleteCandy}
                                        updateCandy={updateCandy}
                                        />)}
            </ul>
    )
}