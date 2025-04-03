import { Component, useState } from 'react'
import './App.css'
import { Routes, Route, data, useParams} from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import ArticleListBox from './components/ArticleListBox'
import MyAccount from './components/MyAccount'

function App() {
  const currentUser = {
    username: 'grumpy19',
    name: 'Paul Grump',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013'
  }

  return (
    <>
      <Header currentUser={ currentUser} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Articles />}/>
        <Route path="/articles/:article_id" element={<ArticleListBox currentUser={currentUser} />} />
        <Route path="/myaccount" element={<MyAccount currentUser={currentUser}/> } />
      </Routes>
    </>
  )
}

export default App
