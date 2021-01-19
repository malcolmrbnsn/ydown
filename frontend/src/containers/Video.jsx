import React from "react"
import VideoPlayer from "../components/VideoPlayer"

class Video extends React.Component {
    render() {
        let {id} = this.props.match.params
        return (
            <VideoPlayer url={"/video/" + id + ".mp4"}></VideoPlayer>
        )
    }
}

export default Video