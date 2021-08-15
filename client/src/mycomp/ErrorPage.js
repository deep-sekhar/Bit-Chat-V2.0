import React from 'react'
import '../css/error.css'
import Error from '../images/error.svg'

export const ErrorPage = () => {
    return (

            <div className="warning">
                <img src={Error} alt="" className="error" />
            </div>
    )
}
