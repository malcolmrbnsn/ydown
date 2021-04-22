import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './VideoForm.css'

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
        this.props.newVideo(this.state.inputValue)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div class="input-group">
                        <input type="text" class="form-control" type="text" placeholder="Enter a video URL to download..." value={this.state.inputValue} onChange={this.handleChange} />
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
