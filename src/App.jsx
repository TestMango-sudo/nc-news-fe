import { Component, useState} from 'react'
import './App.css'
import { Routes, Route, data, useParams} from 'react-router-dom'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import ArticleListBox from './components/ArticleListBox'
import TopicDisplay from './components/TopicDisplay'
import MyAccount from './components/MyAccount'
import NotFound from './components/Not-found'


export default function App() {
  const selectedUser = {
    username: 'grumpy19',
    name: 'Paul Grump',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013',
    hasVoted: {}
  }
  const [currentUser, setCurrentUser] = useState(selectedUser)
  const handleLogout = () => {
    if (currentUser){
      setCurrentUser(null)
    } else {
      setCurrentUser(selectedUser)
    }
  }

  return (
    <>
      <Header currentUser={ currentUser } />
      <Navbar currentUser={ currentUser } handleLogout = {handleLogout} />
      <Routes>
        <Route path="/" element={<Articles />}/>
        <Route path="/articles/:article_id" element={<ArticleListBox currentUser={currentUser} />} />
        <Route path="/articles/topics/:topic" element={<TopicDisplay />} />
        <Route path="/myaccount" element={<MyAccount currentUser={currentUser}/> } />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}