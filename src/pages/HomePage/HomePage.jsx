import React, { useEffect } from 'react'
import topicList from '../../articles.json'
import s from './HomePage.module.sass'
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar'
import { useNavigate } from 'react-router-dom'

import axios from '../../axios'

function HomePage() {
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('/article')
    .then(res => res.data)
    .then(data => navigate(`/article/${data[0].mainTitle}`))
  }, [])
  return (
    <div className={s.container}>
      
    </div>
  )
}

export default HomePage