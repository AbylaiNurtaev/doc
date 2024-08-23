import React, { useEffect } from 'react'
import topicList from '../../articles.json'
import s from './HomePage.module.sass'
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/article/Введение')
  }, [])
  return (
    <div className={s.container}>
      
    </div>
  )
}

export default HomePage