import React from 'react'
import '../css/mypost.css'
import { useState } from 'react'
import { Button, Collapse, Modal} from 'react-bootstrap';

export const NewDashboard = (props) => {

    const [PostTitle, setPostTitle] = useState(props.EditTitle);
    const [PostDesc, setPostDesc] = useState(props.EditDesc);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CheckPost = (e) => {
        e.preventDefault();
        if (!PostTitle || !PostDesc) {
            handleShow();
        }
        else {
            // props.AddToPost(PostTitle, PostDesc);
            setPostTitle("");
            setPostDesc("");
            setOpen(false);
        }
    }

    const [open, setOpen] = useState(true);

    return (

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
            </div>
            <div className="my-3 d-flex justify-content-start mx-5">
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open} className="MyPostsTobeShown position-relative left-0 PostButton" variant="success">
                    <h4>New Post</h4>
                </Button>
            </div >
            <Collapse in={open} className=" MyPostsTobeShown container">
                <div className="card card-body MyPostsTobeShown container" style={{ backgroundColor: "rgb(48, 228, 24,0.3)" }}>
                    <form onSubmit={CheckPost}>
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
            </Collapse>
        </div>
    )


}

export default NewDashboard;







