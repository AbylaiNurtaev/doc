import React, { useState, useEffect } from 'react'
import s from './LeftNavbar.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function LeftNavbar() {
  const navigate = useNavigate()
  const { title } = useParams()

  const [articles, setArticles] = useState()

  useEffect(() => {
    axios.get('/article')
    .then(res => res.data)
    .then(data => setArticles(data))
  })
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            { title && articles &&
                articles.map((elem, index) => <p key={index} style={title == elem.mainTitle ? { color: "#346DDB" } : {}} onClick={() => navigate(`/article/${elem.mainTitle}`)}>{elem.mainTitle}</p>)
            }

        </div>
    </div>
  )
}

export default LeftNavbar