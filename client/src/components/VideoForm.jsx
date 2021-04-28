import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

import apiCall from '../api'

export default class VideoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            url: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let {url} = this.state;
        // check if url is valid
        if (url.substring(0,32) === "https://www.youtube.com/watch?v=") {
        // strip url to get video id
        let id = new URL(this.state.url).searchParams.get("v")
        // call api
        apiCall("post", "/videos/" + id)
            .then(video => {
                this.setState({url: ""})
                this.props.addVideo(video)
            })
            .catch(error => this.props.showAlert(error.message))
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter a video URL to download..." value={this.state.url} onChange={this.handleChange} />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
