import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { splitLine } from '../tools'
import Container from 'react-bootstrap/Container'

function VideoInfo(props) {
    let {
        channel,
        description,
        downloaded,
        length,
        title,
        uploadDate,
        videoId,
        watched
    } = props.videos.find(video => video.videoId === props.match.params.id);
    return (
        <div>
            {
                props.isFetching ?
                    <h1>Loading...</h1> :
                    <div>
                        <VideoPlayer id={videoId} />
                        <Container fluid>
                            <h1>{title}</h1>
                            <h2>{channel}</h2>
                            <h3>
                                {downloaded ? "Downloaded" : "Not Downloaded"}
                            </h3>
                            {length} seconds
                <p>Uploaded {uploadDate} ago</p>
                            <p>
                                {watched ? "Watched" : "Not watched"}
                            </p>
                            <hr></hr>
                            <p>
                                {splitLine(description)}
                            </p>
                        </Container>
                    </div>
            }
        </div>
    );
}

export default VideoInfo;