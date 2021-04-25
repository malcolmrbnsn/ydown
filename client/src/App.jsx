import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./containers/Home"
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import VideoInfo from './containers/VideoInfo';

import Header from './components/Header'
import Message from './components/Message';
import apiCall from './api';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {},
            message: {
                text: "fuck martin",
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
        this.updateAuth = this.updateAuth.bind(this)
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

    updateAuth(user) {
        this.setState({
            user,
            isLoggedIn: true
        })

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
                <Message dismissAlert {...this.state.message} />
                {/* Looks through each route and renders the first matching one */}
                <Switch>
                    <Route path="/videos/:id" render={(props) => this.state.isLoggedIn ? <VideoInfo {...this.state} {...props} /> : props.history.push("/login")} />
                    <Route path="/login" render={(props) => <LoginForm updateAuth={this.updateAuth} {...props}></LoginForm>} />
                    <Route path="/signup" render={(props) => <SignupForm updateAuth={this.updateAuth} {...props}></SignupForm>} />
                    <Route exact path="/" render={(props) => this.state.isLoggedIn ? 
                    <Home {...this.state} newVideo={this.newVideo} deleteVideo={this.deleteVideo} {...props} /> :
                        props.history.push("/login") } />
                </Switch>
            </Router>
        );
    }
}

export default App;
