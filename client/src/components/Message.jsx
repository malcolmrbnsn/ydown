import React from 'react';
import Alert from 'react-bootstrap/Alert'

function Message(props) {
    let { text, isVisable, type } = props
    return (
        <Alert variant={type} show={isVisable} onClose={props.dismissAlert} >
            {text}
        </Alert>
    );
}

export default Message;