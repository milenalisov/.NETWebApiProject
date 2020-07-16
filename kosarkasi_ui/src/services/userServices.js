

import { createResponseHandler } from "../helpers";

export const userService = {
    login
};

export const handleResponse = createResponseHandler(logout);


export function login(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:  "userName=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password) +
      "&grant_type=password" 
    };
  
    return fetch(`/Token`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
  
        return user;
      });
  }

  export function logout() {
    return fetch("/Token").then(_ => localStorage.removeItem("user"));
  }


  
