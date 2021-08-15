import React from 'react'
import '../css/SignIn.css'
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

export const NewUser = (props) => {
    const [UserEmail, setUserEmail] = useState("");
    const [PassWord, setPassWord] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [MyUserName, setMyUserName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const postdata = async()=>{
        let data = JSON.stringify({
            username:MyUserName,
            email:UserEmail,
            phno:PhoneNumber,
            password:PassWord,
            cpassword:ConfirmPassword})
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }
        const res =  await fetch('/signup',params);
        console.log(res);
        const json = await res.json();
        console.log(json);
        if(res.status===422||!json)
        {
            console.log("Notdone!");

            setUserEmail("");
            setMyUserName("");
            setPhoneNumber("");
            setPassWord("");
            setConfirmPassword("");

            handleShow3();
        }
        else{
            console.log("done!");

            setUserEmail("");
            setMyUserName("");
            setPhoneNumber("");
            setPassWord("");
            setConfirmPassword("");

            handleShow2();
        }
    }
    
    const CheckIfValid = (e) => {
        e.preventDefault();
        if (UserEmail && PassWord && MyUserName && PhoneNumber && (ConfirmPassword===PassWord)) {
            // POST DATA TO SERVER  
            postdata();
        }
        else {
            handleShow();
        }
    }
    return (
        <div>
            <div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header >
                        <Modal.Title>Sign Up Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Pls fill all boxes properly</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show3} onHide={handleClose3} centered>
                    <Modal.Header >
                        <Modal.Title>Sign Up Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Either bad network or email already associated with an account!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose3}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={handleClose2} centered>
                    <Modal.Header >
                        <Modal.Title>Sign Up successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Go back to Sign in page to Login</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="conatiner my-5">
                <form onSubmit={CheckIfValid}>
                    <div className="mb-3">
                        <label htmlFor="UserName" className="form-label">Username</label>
                        <input autoComplete="off" value={MyUserName} onChange={e => setMyUserName(e.target.value)} className="form-control SignInItems" type="text"  aria-label="default input example" id="UserName"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input autoComplete="off" value={UserEmail} onChange={e => setUserEmail(e.target.value)} pattern="([a-zA-z0-9]){1,25}@([a-zA-z]){1,30}\.{1}([a-zA-z]){1,30}" placeholder="Eg: Tony@gmail.com" type="email" className="form-control SignInItems" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="UserNumber" className="form-label">Phone Number</label>
                        <input autoComplete="off" value={PhoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control SignInItems" type="text" pattern="[0-9]{10}"  aria-label="default input example" id="UserNumber" placeholder="Ex-9345959599"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword5" className="form-label" >Password</label>
                        <input autoComplete="off" value={PassWord} pattern="([a-zA-z0-9]){8,20}" onChange={e => setPassWord(e.target.value)} type="password" id="inputPassword5" className="form-control SignInItems" aria-describedby="passwordHelpBlock" />
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword6" className="form-label">Confirm Password</label>
                        <input autoComplete="off" value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" id="inputPassword6" className="form-control SignInItems" aria-describedby="passwordHelpBlock" />
                    </div>
                    <button type="submit" className="btn btn-success rounded-pill" >Create Account</button>
                    <div className="my-4">
                        <button id="NewUser" onClick={() => props.UserStateChanger(true)} type="button" >ExistingUser? Sign-in here</button>
                    </div>
                </form>
            </div>
        </div>
    )

}






