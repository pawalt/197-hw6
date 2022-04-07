import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, changeUserName] = useState('')
  const [questions, changeQuestions] = useState({})
  const [selectedQuestion, changeSelectedQuestion] = useState('')
  const [newQuestion, changeNewQuestion] = useState('')
  const [newAnswer, changeNewAnswer] = useState('')
  const [modalActive, changeModalActive] = useState(false)


  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get('/questions')
      const indexed = data.reduce((map, obj) => {
        map[obj._id] = obj
        return map;
      }, {})
      changeQuestions(indexed)
    }

    getPosts()

    const intervalID = setInterval(() => {getPosts()}, 2000)

    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    const getUsername = async () => {
      try {
        const { data } = await axios.post('/account/verify', {}, {withCredentials: true})
        changeUserName(data)
      } catch (e) {

      }
    }

    getUsername()

    const intervalID = setInterval(() => {getUsername()}, 2000)

    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
    {modalActive &&
    (
    <div id="add-question-modal" className="modal is-active">
      <div className="modal-background" onClick={() => changeModalActive(false)}></div>
      <div className="modal-content">
        <div className="box">
          <p>Add question:</p>
          <div className="field">
            <div className="control">
              <textarea className="textarea" placeholder="Enter your question here" value={newQuestion} onChange={e => changeNewQuestion(e.target.value)} />
            </div>
          </div>
          <button className="button is-link" onClick={() => {
            const addQuestion = async () => {
              const resp = await axios.post("/questions/add", {
                questionText: newQuestion,
              }, {withCredentials: true})
            }
            addQuestion()
            changeModalActive(false)
          }}>Submit</button>
          <button className="button" aria-label="close" onClick={() => changeModalActive(false)}>Cancel</button>
        </div>
      </div>
    </div>)}
    <nav className="navbar is-primary">
      <div className="navbar-start">
        <div className="navbar-item title ">
          Campuswire Lite
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          {username && (
            <>
              <p>Hi {username}</p>
              <button className="button is-link" onClick={() => {
                const logOut = async () => {
                  const resp = await axios.post("/account/logout", {}, {withCredentials: true})
                }
                logOut()
              }}>Log out</button>
            </>
          )}
        </div>
      </div>
    </nav>
    <div className="is-divider"></div>
    <div className="columns">
    <div className="column is-one-third">
      {!username ? 
      (<a
          className="button is-link"
          type="button"
          href="/login">Log in to submit a question</a>
        )
      : (<button
          className="button is-link"
          type="button"
          onClick={() => changeModalActive(true)}>Add new question</button>
        )}
      {Object.keys(questions).map(key => {
        const q = questions[key]
        return (<div className="box" key={q._id} onClick={() => {
          changeSelectedQuestion(q._id)
          changeNewAnswer(q.answer)
        }}>{q.questionText}</div>)
      })}
    </div>
    <div className="is-divider-vertical"></div>
    <div className="column">
      {selectedQuestion != '' && (
        <div className="box">
          <h2 className="subtitle">{questions[selectedQuestion].questionText}</h2>
          <p><strong>Author:</strong></p>
          <p>{questions[selectedQuestion].author}</p>
          <br/>
          <p><strong>Answer:</strong></p>
          <p>{questions[selectedQuestion].answer}</p>
          {username && (
            <>
            <p><strong>Answer this question</strong></p>
            <div className="field">
              <div className="control">
                <textarea className="textarea" placeholder="Enter your answer here" value={newAnswer} onChange={e => changeNewAnswer(e.target.value)} />
              </div>
            </div>
            <button className="button is-link" onClick={() => {
              const answerQuestion = async () => {
                const resp = await axios.post("/questions/answer", {
                  _id: selectedQuestion,
                  answer: newAnswer,
                }, {withCredentials: true})
              }
              answerQuestion()
            }}>Submit</button>
            </>
          )}
        </div>
      )}
    </div>
    </div>
    </>
  )
}

export default Home