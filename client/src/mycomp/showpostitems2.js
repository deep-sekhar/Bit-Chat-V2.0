import { Button, Card ,Modal} from 'react-bootstrap';
import LikeImage from '../images/Like.png';
import UnlikeImage from '../images/Unlike.png';
import '../css/showpost.css';
import React from 'react'

export const Showpostitems2 = (props) => {

    return (
        <div className="container PostStyles2">
            <Card className="text-center PostStyles container my-4">
                <Card.Header style={{ borderRadius: "50px", width: 'calc((minContent) + 10px)', margin: "auto", marginTop: "5px" }}>
                {props.message.name}
                    {`\xa0\xa0\xa0\xa0`}{props.message.post_time}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{props.message.title}</Card.Title>
                    <Card.Text>
                        {props.message.con}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
