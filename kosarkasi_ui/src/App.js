import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Router } from "react-router-dom";
import {Route} from 'react-router-dom';
import './App.css';
import Login from "./components/auth/Login";
import Kosarkasi from "./components/kosarkasi/Kosarkasi";
import { alertActions } from "./store/actions";
import { history } from "./helpers";


 class App extends Component{
   constructor(props){
     super(props);
   

   history.listen((location, action) => {
    // clear alert on location change
    this.props.clear();
  });
}
  
   render(){
     return(
      <Router history={history}>
        <Route exact path='/Account/Login' component={Login} />
        <Route exact path='/' component={Kosarkasi} />
      </Router>
      
     );
   }
 }


 function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}


export default connect(mapStateToProps, { ...alertActions })(App);


