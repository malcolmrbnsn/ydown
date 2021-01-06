import React from 'react'

export default function VideoPlayer(props) {
    return (
        <div>
            <video width="100%" controls>
                <source src={props.url}/>
            </video>
        </div>
    )
}