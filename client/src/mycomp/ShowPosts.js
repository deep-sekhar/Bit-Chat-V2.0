import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Showpostitems } from './Showpostitems';
import { Showpostitems2 } from './showpostitems2';
import '../css/mypost.css'
import { Button, Modal } from 'react-bootstrap';

// IMPORT THAT FROM APP 
import { UserContext } from '../App'
import { useContext } from 'react'

export const ShowPosts = (props) => {

    // USE CONTEXT 
    const { state, dispatch } = useContext(UserContext)

    // MODIFIED TITLE AND DESC 
    const [PostTitle, setPostTitle] = useState("");
    const [PostDesc, setPostDesc] = useState("");

    // SHOW POSTS API CALL 
    const history = useHistory();
    const abortCtrl = new AbortController();
    const abortCtrl2 = new AbortController();
    const [userData, setuserData] = useState({username:"",email:"",phno:"",messages:[]});
    const [naam, setNaam] = useState("")
    const [others, setothers] = useState({messages:[]})

    const callAbout = async () => {
        try {
            let params = {
                method: "GET",
                headers: {
                    // Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                // credentials: "include"
            }
            const res = await fetch('/userview', params, { signal: abortCtrl.signal });
            const res2= await fetch('/dashview', params, { signal: abortCtrl2.signal });
            console.log(res2.status);
            
            if (res.status !== 200 || res2.status !==200) {
                // const error = new Error(res.error)
                // throw error;
                console.log("POST NOT RETRIEVED");
                dispatch({type:"USER",payload:false})
                changeHis();
            } else {
                // console.log("post page-->", data);
                const data = await res.json();
                const data2 = await res2.json();
                setuserData(data);
                setothers(data2);
                setNaam(userData.username);
                console.log(naam);
                
                dispatch({type:"USER",payload:true})
                // console.log(data2);
                // dashviews
            }

        } catch (error) {
            console.log(error);
        }
    }

    const changeHis = () => {
        history.push('/userSignin')
    }

    useEffect(() => {
        callAbout();
        return () => {
            console.log("Req ABORTED!");
            abortCtrl.abort();
        }
    }, [])

    // DASHBOARD CALLS 
    function WhatstheTime() {
    let date = new Date();
    let Month = date.getMonth() + 1;
    let Year = date.getFullYear();
    let Hours = date.getHours();
    let Mins = date.getMinutes();
    let Ampm = 'AM';
    if (Hours > 12) {
      Ampm = 'PM';
      Hours %= 12;
    }
    if (Mins < 10) {
      Mins = "0" + Mins;
    }
    let Time = Hours + ":" + Mins + Ampm + '\xa0\xa0\xa0\xa0\xa0' + Month + "/" + Year;
    return Time;
  }

    const AddToPost = async(title,con)=>{
            let data = JSON.stringify({
                name:userData.username,
                post_time:WhatstheTime(),
                title:title,
                con:con,
                likes:0,
                dislikes:0
            })
            let params = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }
            const res =  await fetch('/addMsg',params);
            const json = await res.json();
            // console.log(json);
            if(res.status!==201)
            {
                console.log("Notdone!");
                handleShow();
            }
            else{
                console.log("done MAN!");
                setuserData(json)
                // callAbout();
                setPostDesc("");
                setPostTitle("");
            }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CheckPost = (e) => {
        e.preventDefault();
        if (!PostTitle || !PostDesc) {
            handleShow();
        }
        else {
            AddToPost(PostTitle, PostDesc);
        }
    }

    // SHOWN POST OPTIONS API CALLS 
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const DeleteThePost = async(message) => {
        let index = userData.messages.findIndex(data=>data===message);
        console.log(index);
        
        let data = JSON.stringify({
            index:index,
        })
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }
        
        const res =  await fetch('/delMsg',params);
        const json = await res.json();
        // console.log(json);
        if(res.status!==201)
        {
            console.log("Notdone!");
            handleShow2();
        }
        else{
            console.log("done MAN!");
            setuserData(json)
        }
    }

    const EditThePost = (message) => {
        DeleteThePost(message);
        setPostTitle(message.title);
        setPostDesc(message.con)
    }

    const addlikes = async (message)=>{
        let index = userData.messages.findIndex(data=>data===message);
        console.log(index);

        let data = JSON.stringify({
            index:index,
        })
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }
        
        const res =  await fetch('/addLikes',params);
        const json = await res.json();
        // console.log(json);
        if(res.status!==201)
        {
            console.log("Notdone!");
            handleShow2();
        }
        else{
            console.log("done bhaaaii!");
            setuserData(json)
        }
    }
    
    const adddislikes = async (message)=>{
        let index = userData.messages.findIndex(data=>data===message);
        console.log(index);

        let data = JSON.stringify({
            index:index,
        })
        let params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }
        
        const res =  await fetch('/adddisLikes',params);
        const json = await res.json();
        // console.log(json);
        if(res.status!==201)
        {
            console.log("Notdone!");
            handleShow2();
        }
        else{
            console.log("done bhaaaii!");
            setuserData(json)
        }
    }

    const ShowAllPosts = userData.messages.map(data =>
        <Showpostitems message={data} key={data._id} username={userData.username} EditThePost={EditThePost} DeleteThePost={DeleteThePost} addlikes={addlikes} adddislikes={adddislikes}/>);
        
    const ShowAllPosts2 = others.messages.map(data =>
        <Showpostitems2 message={data} key={data._id} />);

        return (
            <div>
                
        <div className="position-relative my-3 container" style={{fontFamily: "'Ubuntu', sans-serif"}}>
            <div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header >
                        <Modal.Title>Post Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Post not filled properly</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={handleClose2} centered>
                    <Modal.Header >
                        <Modal.Title>Network Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Couldn't connect to server!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className=" MyPostsTobeShown container" >
                <div className="card card-body MyPostsTobeShown container" style={{ backgroundColor: "rgb(48, 228, 24,0.3)" }}>
                    <form onSubmit={CheckPost} method="POST">
                        <div>
                            <input value={PostTitle} onChange={e => setPostTitle(e.target.value)} className="form-control form-control-lg MyPostsTobeShown" type="text" placeholder="post title" ></input>
                        </div>
                        <div className="my-3">
                            <textarea value={PostDesc} onChange={e => setPostDesc(e.target.value)} className="form-control form-control-lg MyPostsTobeShown" id="exampleFormControlTextarea1" rows="3" placeholder="post"></textarea>
                        </div>
                        <button type="submit" className="btn btn-success PostButton MyPostsTobeShown container d-flex justify-content-around" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{ width: "70px" }}>
                            Post
                        </button>
                    </form>
                </div>
                </div>
            </div>
                {ShowAllPosts}
                {ShowAllPosts2}
            </div>
    )
}
