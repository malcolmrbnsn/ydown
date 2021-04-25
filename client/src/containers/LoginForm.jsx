import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("woowoowowowo")
    }

    render() {
        return (
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={this.handleChange} value={this.state.a}/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={this.handleChange} value={this.state.a} />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
            </Container>
        )
    }
}