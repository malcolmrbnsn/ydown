import React from "react"

class VideoPlayer extends React.Component {
    render() {
        let { id } = this.props.match.params
        return (
            <div>
                <video width="100%" controls>
                    <source src={"/video/" + id + ".mp4"} />
                </video>

            </div>
        )
    }
}

export default VideoPlayer