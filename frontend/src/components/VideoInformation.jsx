import React from 'react'
import {Link} from 'react-router-dom'

export default function VideoInformation(props) {
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
        <div>
            <h2>{title}</h2>
            <h3>{channel}</h3>
            {description.split("\n").map(str => <p>{str}</p>)}
            <p>
                {downloaded ? <Link to={"/videos/" + videoId} >Ready to watch</Link> : "Avaliable to Download"}
            </p>
            <hr />
        </div>
    )
}