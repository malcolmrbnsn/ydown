import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

function splitLine(text) {
    return text.substring(0, 100).split('\n').map((item, key) => {
        return <span key={key}>{item}<br /></span>
    })
}

export default function VideoCard(props) {
    let {
        channel,
        description,
        downloaded,
        length,
        title,
        uploadDate,
        videoId
    } = props.video

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{channel}</Card.Subtitle>
                <Card.Text>
                    {splitLine(description)}
                </Card.Text>
                {downloaded ?
                    <Button variant="primary" as={Link} to={"/videos/" + videoId}>Play Now</Button> :
                    <Card.Link>Avaliable to Download</Card.Link>}
                <Button variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    )

}