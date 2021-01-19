import React, { Component } from 'react'

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
                <form onSubmit={this.handleSubmit}>
                    <label>Add a video: </label> <br />
                    <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
                    <button type="submit">Add Video</button>
                </form>
            </div>
        )
    }
}
