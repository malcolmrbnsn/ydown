import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
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
            <Container>
                <h3>Add a video</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control type="text" value={this.state.inputValue} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}
