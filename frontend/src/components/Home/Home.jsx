import React from 'react';

import VideoDetails from '../common/VideoDetails'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            videos: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({ value: "" })
        let newVideo = await this.getVideo(this.state.url)
        let newVideos = this.state.videos.concat(newVideo)
        this.setState({
            videos: newVideos
        });
    }

    async getVideo(url) {
        return {
            id: 2,
            title: "Title",
            description: "Description",
            author: "author"
        }
    }

    render() {
        let videos = this.state.videos.map(a => <VideoDetails {...a} />)
        return (
            <div>
                <h1>Home</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </form>
                {videos}
            </div>
        )
    }
}

export default Home;