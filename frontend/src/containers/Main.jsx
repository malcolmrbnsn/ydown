import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Video from "./Video"
import Home from "./Home"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
            <Router>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>"
                    <Route path="/videos/:id" component={Video} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}


export default Main