import React from 'react'
import {Link} from 'react-router-dom'

function splitLine(text) {
    return text.split('\n').map((item, key) => {
  return <span key={key}>{item}<br/></span>
})
}

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
            <p>
                {splitLine(description)}
            </p>
            <p>
                {downloaded ? <Link to={"/videos/" + videoId} >Play Now</Link> : "Avaliable to Download"}
                <br/>
                <button onClick={() => this.props.deleteVideo(videoId)}>Delete</button>
            </p>
            <hr />
        </div>
    )
}