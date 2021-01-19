import React from 'react'
import apiCall from "../api"
import VideoInformation from '../components/VideoInformation';
import VideoForm from "../components/VideoForm"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            videos: []
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
    }

    addVideo(url) {
        // strip url
        let id = new URL(url).searchParams.get("v")
        // call api
        apiCall("post", "/videos/" + id)
        .then(video => {
            // update state
            let videos = this.state.videos.concat(video)
            this.setState({videos})
        })

    }
    
    deleteVideo(id) {
        let videos = this.state.videos.filter(video => video.videoId !== id)
        this.setState({
            videos
        })
        //make api call
        apiCall("delete", "/videos/" + id)
        //assume ok
    }

    render() {
        let videos = this.state.videos.map((video) => <VideoInformation deleteVideo={this.deleteVideo} video={video} key={video._id} />)
        return (
            <div>
                <h1>Library</h1>
                <VideoForm addVideo={this.addVideo}/>
                {this.state.isFetching ?
                <h1>Loading !!</h1> : 
                <div>{videos}</div>
                }
            </div>
        )
    }
}

export default Home