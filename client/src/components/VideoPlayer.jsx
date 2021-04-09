import React from "react"

export default function VideoPlayer(props) {

    return (
        <div>
            <video width="100%" controls>
                <source src={"/video/" + props.id + ".mp4"} />
            </video>

        </div>
    )
}
