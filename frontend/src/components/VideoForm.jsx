import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class VideoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addVideo(this.state.inputValue)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter a video URL to download..." value={this.state.inputValue} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
