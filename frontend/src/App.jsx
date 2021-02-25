import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import VideoPlayer from "./containers/VideoPlayer"
import Home from "./containers/Home"
import Auth from './containers/Auth';

import Header from "./components/Header"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {}
        }
    }

    handleAuthSubmit(e) {

    }

    render() {
        return (
            <Router>
                <Header {...this.state}/> {/*pass auth state to the header to add correct links */}
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/videos/:id" component={VideoPlayer} />
                    <Route path="/login" render={(props) => <Auth authType="Login" {...props}></Auth>}/>
                    <Route path="/signup" render={(props) => <Auth authType="Signup" {...props}></Auth>}/>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default App
