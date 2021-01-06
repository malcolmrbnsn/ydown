import React from 'react'
import getVideos from "../api"
import VideoInformation from '../components/VideoInformation';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            videos: []
        }
    }
    componentDidMount() {
        getVideos()
        .then(videos => {
            this.setState({
                isFetching: false,
                videos
            })
        })

    }

    render() {
        let videos = this.state.videos.map((video) => <VideoInformation video={video} key={video._id}/>)
        return (
            <div>
                <h1>Library</h1>
                {videos}
            </div>
        )
    }
}

export default Home