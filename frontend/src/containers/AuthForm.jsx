import React, { Component } from 'react'

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { authType } = this.props
        return (
            <div>
                <h1>{authType}</h1>
                <label>Email</label><br />
                <input type="text" name="email" onChange={this.handleChange} value={this.state.a} /><br />
                {authType === "Signup" && (
                    <div>
                        <label>Username</label><br />
                        <input type="text" name="username" onChange={this.handleChange} value={this.state.a} />
                    </div>
                )}
                <label>Password</label><br />
                <input type="password" name="password" onChange={this.handleChange} value={this.state.a} /><br />
                <button onClick={this.props.handleAuthSubmit}>{authType}</button>
            </div>
        )
    }
}
