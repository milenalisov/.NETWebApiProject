import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Form, Button, Alert} from 'react-bootstrap';
import "../../bootstrap.min.css";
import {login} from "../../store/actions";


export class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: ""

        };
    }

  handleChange =(event) => {
      this.setState({
          [event.target.name]: event.target.value
      });
  };

  handleSubmit = (event) =>{
    event.preventDefault();
    const {username, password} = this.state;
    this.props.login(username, password);
  };

    render(){
        const {alert} = this.props;

        return(
            <div> 
                 <div>
                <h1>Prijava</h1>
                </div>
                 <div>
                   {alert && alert.message ? (
                       <Alert variant={alert.type}>{alert.message}</Alert>
                   ): null}
               </div>
               <Form onSubmit={this.handleSubmit}>
              
                   <Form.Group>
                       <div>
                       <Form.Label htmlFor="username">Korisnicko ime: </Form.Label>
                       <Form.Control
                            type="text"
                            name="username"
                            value={this.state.username || ""}
                            onChange={this.handleChange}
                            placeholder="Unesite korisnicko ime"
                            required
                       />
                        </div>
                   </Form.Group>
                  
                   <Form.Group>
                       <div>
                       <Form.Label htmlFor="password">Lozinka: </Form.Label>
                       <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handleChange}
                            placeholder="Unesite lozinku"
                            autoComplete="on"
                            required
                       />
                       </div>
                   </Form.Group>
                   <div>
                   <Button variant="primary" type="submit">
                       Prijava
                   </Button>
                   </div>
               </Form>
            </div>
        );

    }
}

const mapStateToProps = (state) =>{
    return {
      alert: state.alert,
      user: state.auth.user
    };
};

export default connect(
    mapStateToProps,
    {login}
)(Login);

