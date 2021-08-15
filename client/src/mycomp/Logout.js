import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// IMPORT THAT FROM APP 
import {UserContext} from '../App'
import { useContext } from 'react'

export const Logout = () => {
    
    // USE CONTEXT 
    const {state, dispatch} = useContext(UserContext)

    const history = useHistory();

    useEffect(() => {
        fetch('/userSignout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then(res=>{
            if(res.status!==200)
            throw new Error("could not connect");

            dispatch({type:"USER",payload:false})

            history.push('/userSignin', {replace:true})}
            ).catch(error=>{
                console.log(error)
            })

    })

    return (
        <div>
            Logging out
        </div>
    )
}
