import React from 'react'
import apiCall from "../api"
import VideoCard from '../components/VideoCard';
import VideoForm from "../components/VideoForm"
import Container from 'react-bootstrap/Container'

import CardDeck from 'react-bootstrap/CardDeck'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            videos: [],
            message: ""
        }

        this.addVideo = this.addVideo.bind(this);
    }
    componentDidMount() {
        apiCall("get", "/videos/")
            .then(videos => {
                this.setState({
                    isFetching: false,
                    videos
                })
            })
            .catch(error => this.setState({ message: "An error occured. Please check your internet connection" }))
    }

    addVideo(url) {
        // strip url
        let id = new URL(url).searchParams.get("v")
        // call api
        apiCall("post", "/videos/" + id)
            .then(video => {
                // update state
                let videos = this.state.videos.concat(video)
                this.setState({ videos })
            })
    }

    deleteVideo(id) {
        //make api call
        apiCall("delete", "/videos/" + id)
            .then(() => {
                //assume ok
                let videos = this.state.videos.filter(video => video.videoId !== id)
                this.setState({
                    videos
                })
            })
    }

    render() {
        let videos = this.state.videos.map((video) => <VideoCard deleteVideo={this.deleteVideo} video={video} key={video._id} />)
        return (
            <Container>
                <h1>Library</h1>
                <VideoForm addVideo={this.addVideo} />

                {this.state.isFetching ?
                    <h1>Loading !!</h1> :
                    <div>
                        <CardDeck>
                        {videos}
                        </CardDeck>
                    </div>
                }
            </Container>
        )
    }
}

export default Home
