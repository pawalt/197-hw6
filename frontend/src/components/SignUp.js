import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, changeUserName] = useState('')
  const [password, changePassword] = useState('')
  const navigate = useNavigate();
  return (
    <>
    <h1 className="title">Sign Up</h1>
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
            const attemptSignup = async () => {
              try {
                const resp = await axios.post("/account/signup", {
                  username: userName,
                  password: password,
                })
                if (resp.status != 200) {
                  alert("failed to sign up")
                } else {
                  navigate("/", {replace: true})
                }
              } catch (err) {
                alert(`failed to sign up: ${err}`)
              }
            }
            attemptSignup()
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
    <p>Already have an account? <a href="/login">Log in here!</a></p>
    </>
  )
}

export default SignUp