import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./containers/Home"
import Auth from './containers/Auth';

import Header from './components/Header'
import apiCall from './api';
import Message from './components/Message';
import VideoInfo from './containers/VideoInfo';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            user: {},
            message: {
                text: "",
                isVisable: false,
                type: "success"
            },
            isFetching: true,
            videos: []
        }
        this.newVideo = this.newVideo.bind(this)
        this.deleteVideo = this.deleteVideo.bind(this)
        this.showAlert = this.showAlert.bind(this)
        this.dismissAlert = this.dismissAlert.bind(this)
        this.handleAuthSubmit = this.handleAuthSubmit.bind(this)
    }

    newVideo(url) {
        // strip url to get video id
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

    showAlert() {

    }

    dismissAlert() {
        this.setState({
            message: {
                isVisable: false
            }
        })
    }

    handleAuthSubmit(user) {
        apiCall("post", "/auth/signup", user)
            .then(() => console.log(1))
            .catch(error => console.log(error))

    }

    componentDidMount() {
        apiCall("get", "/videos/")
            .then(videos => {
                this.setState({
                    isFetching: false,
                    videos
                })
            })
            .catch(error => this.setState({ message: { text: "An error occured. Please check your internet connection", isShowing: true } }))
    }

    render() {
        return (
            <Router>
                <Header {...this.state} />
                <Message dismissAlert {...this.state.message}/>
                {/* Looks through each route and renders the first matching one */}
                <Switch>
                    <Route path="/videos/:id" render={(props) => <VideoInfo {...this.state} {...props}></VideoInfo>}/>
                    <Route path="/login" render={(props) => <Auth authType="Login" handleAuthSubmit={this.handleAuthSubmit} {...props}></Auth>} />
                    <Route path="/signup" render={(props) => <Auth authType="Signup" handleAuthSubmit={this.handleAuthSubmit} {...props}></Auth>} />
                    <Route exact path="/" render={(props) => <Home {...this.state} newVideo={this.newVideo} deleteVideo={this.deleteVideo} {...props}/>} />
                </Switch>
            </Router>
        );
    }
}

export default App;
