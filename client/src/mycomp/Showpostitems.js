import { Button, Card ,Modal} from 'react-bootstrap';
import LikeImage from '../images/Like.png';
import UnlikeImage from '../images/Unlike.png';
import '../css/showpost.css';
import React from 'react'

export const Showpostitems = (props) => {

    return (
        <div className="container PostStyles2">
            <Card className="text-center PostStyles container my-4">
                <Card.Header style={{ borderRadius: "50px", width: 'calc((minContent) + 10px)', margin: "auto", marginTop: "5px" }}>
                    {props.username}{`\xa0\xa0\xa0\xa0`}{props.message.post_time}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.message.title}</Card.Title>
                    <Card.Text>
                        {props.message.con}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex" style={{ borderRadius: "50px", width: 'calc((minContent) + 10px)', margin: "auto", marginBottom: "5px" }}>
                    <div className="p-1">
                        <Button variant="primary" className="mx-2 MyPostsTobeShown" onClick={()=>{props.EditThePost(props.message)}}>Edit</Button>
                        <Button variant="danger" className="MyPostsTobeShown" onClick={()=>{props.DeleteThePost(props.message)}}>Delete</Button>
                    </div>
                    {/* <div className="ms-auto p-2 bd-highlight d-flex">
                        <div onClick={() => { props.addlikes(props.message) }} className="mx-2">
                            <img src={LikeImage} alt="like" className="Postimage" />
                        </div>
                        <div>
                            {props.message.likes}
                        </div>
                        <div onClick={() => { props.adddislikes(props.message) }} className="mx-2">
                            <img src={UnlikeImage} alt="like" className="Postimage" />
                        </div>
                        <div>
                            {props.message.dislikes}
                        </div>
                    </div> */}
                </Card.Footer>
            </Card>
        </div>
    )
}
