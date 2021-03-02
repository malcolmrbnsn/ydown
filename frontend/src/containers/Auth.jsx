import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default class Auth extends Component {
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
            <Container>
            <Form>
                <h1>{authType}</h1>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={this.handleChange} value={this.state.a}/>
                </Form.Group>
                {authType === "Signup" && (<Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" onChange={this.handleChange} value={this.state.a} />
                    </Form.Group>
                )}
                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={this.handleChange} value={this.state.a} />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">{authType}</Button>
                </Form.Group>
            </Form>
            </Container>
        )
    }
}