import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {trimText} from '../tools'

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
                <Card.Title><Link to={"/videos/" + videoId + "/info"}>{trimText(title, 25)}</Link></Card.Title>
                <Card.Subtitle>{channel}</Card.Subtitle>
                <Card.Text>
                    {trimText(description, 70)}
                </Card.Text>
                {downloaded ?
                    <Button variant="primary" as={Link} to={"/videos/" + videoId + "/watch"}>Play Now</Button> :
                    <Card.Link>Avaliable to Download</Card.Link>}
                <Button onClick={e => props.deleteVideo(videoId)} variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    )

}