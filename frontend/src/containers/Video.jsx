import React from "react"
import VideoPlayer from "../components/VideoPlayer"

class Video extends React.Component {
    render() {
        let {id} = this.props.match.params
        return (
            <VideoPlayer url={"http://192.168.0.4:4000/video/" + id}></VideoPlayer>
        )
    }
}

export default Video