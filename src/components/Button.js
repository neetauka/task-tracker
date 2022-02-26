import { Button } from 'bootstrap'
import React from 'react'
import PropTypes from 'prop-types'

const button = ({color, text, onClick}) => {
    

    return (
        <button 
        onClick= {onClick}
        style={{backgroundColor:color}} 
        className= "btn">
            {text}
        </button>
    )
}

Button.defaultProps = {
    color:'green',
}

Button.propTypes ={
    text: PropTypes.string,
    color:PropTypes.string,
    onClick: PropTypes.func,
}
export default button
