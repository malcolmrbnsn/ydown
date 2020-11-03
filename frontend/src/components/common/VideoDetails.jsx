import React from "react";

export default function VideoDetails(props) {
    return (
        <div>
            <h3>{props.title} - {props.author}</h3>
            <p>{props.description}</p>
        </div>
    )
}