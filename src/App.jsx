import { Component, useState } from 'react'
import './App.css'
import { Routes, Route, data, useParams} from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import ArticleListBox from './components/ArticleListBox'

function App() {
  const currentUser = {
    username: 'grumpy19',
    name: 'Paul Grump',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013'
  }

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Articles />}/>
        <Route path="/article/:article_id" element={<ArticleListBox />} />
        <Route path="/myaccount"/>
      </Routes>
    </>
  )
}

export default App
