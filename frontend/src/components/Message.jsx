import React from 'react';
import Alert from 'react-bootstrap/Alert'

function Message(props) {
    let { text, isVisable, type } = props.message
    return (
        // <Alert >
        //     {props.text}
        // </Alert>
        <Alert variant={type} onClose={() => props.message.isVisable=false} dismissible>
            This is a alert—check it out!
        </Alert>
    );
}

export default Message;