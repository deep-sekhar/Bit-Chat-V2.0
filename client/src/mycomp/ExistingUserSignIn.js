import '../css/SignIn.css'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

// IMPORT THAT FROM APP 
import {UserContext} from '../App'
import { useContext } from 'react'

export const ExistingUserSignIn = (props) => {


    // USE CONTEXT 
    const {state, dispatch} = useContext(UserContext)

    const [UserEmail, setUserEmail] = useState("");
    const [PassWord, setPassWord] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const history = useHistory();

    const postdata = async()=>{

        try{
        let data = JSON.stringify({
            email:UserEmail,
            password:PassWord})
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }

        const res =  await fetch('/signin',params);
        console.log(res);
        const json = await res.json();
        console.log(json);

        if(res.status===422||res.status===400||!json)
        {
            // console.log("Notdone!");
            setPassWord("");
            setUserEmail("");
            throw new Error(res.error)
        }
        else{

            console.log("SIGN IN done!");

            dispatch({type:"USER",payload:true})

            history.push('/myprofile')

        }}catch(error)
        {
            console.log(error);
            handleShow3();
        }
        
    }

    const CheckIfValid = (e) => {
        e.preventDefault();
        if (!UserEmail || !PassWord) {
            handleShow();
        }
        else {
            postdata();
        }
    }

    return (
        <div>
            <div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header >
                        <Modal.Title>Sign In Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Pls Check all details properly</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show3} onHide={handleClose3} centered>
                    <Modal.Header >
                        <Modal.Title>Sign In Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Invalid Credentials</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose3}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="container my-5">
                <form onSubmit={CheckIfValid}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input autoComplete="off" pattern="([a-zA-z0-9]){1,25}@([a-zA-z]){1,30}\.{1}([a-zA-z]){1,30}" placeholder="Eg: Tony@gmail.com" type="text" className="form-control SignInItems" id="exampleInputEmail1" aria-describedby="emailHelp" value={UserEmail} onChange={e => setUserEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input autoComplete="off" type="password"  className="form-control SignInItems" id="exampleInputPassword1" value={PassWord} onChange={e => setPassWord(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success rounded-pill"  >Sign In</button>
                    <div className="my-4">
                        <button id="NewUser" onClick={() => props.UserStateChanger(!props.ExistingUser)} type="button" >New User? Sign-up here</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
