import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, changeUserName] = useState('')
  const [password, changePassword] = useState('')
  const navigate = useNavigate();
  return (
    <>
    <h1 className="title">Log In</h1>
    <div className="field">
      <div className="control">
        <input className="input" placeholder="Enter your username here" type="text" value={userName} onChange={e => changeUserName(e.target.value)} />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <input className="input" placeholder="Enter your password here" type="text" value={password} onChange={e => changePassword(e.target.value)} />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <button
          className="button is-link"
          type="button"
          disabled={userName === '' || password === ''}
          onClick={() => {
            const attemptLogin = async () => {
              try {
                const resp = await axios.post("/account/login", {
                  username: userName,
                  password: password,
                })
                if (resp.status != 200) {
                  alert("failed to log in")
                } else {
                  navigate("/", {replace: true})
                }
              } catch (err) {
                alert(`failed to log in: ${err}`)
              }
            }
            attemptLogin()
          }}
        >
          Log In
        </button>
      </div>
    </div>
    <p>Don't have an account? <a href="/signup">Sign up here!</a></p>
    </>
  )
}

export default Login