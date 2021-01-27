import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Video from "./containers/Video"
import Home from "./containers/Home"
import AuthForm from './containers/AuthForm';

import Navbar from "./components/Navbar"

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
                <Navbar/>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/videos/:id" component={Video} />
                    <Route path="/login" render={(props) => <AuthForm authType="Login" {...props}></AuthForm>}/>
                    <Route path="/signup" render={(props) => <AuthForm authType="Signup" {...props}></AuthForm>}/>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}


export default App