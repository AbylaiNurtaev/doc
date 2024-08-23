import React from 'react'
import topicList from '../../articles.json'
import s from './LeftNavbar.module.sass'
import { useNavigate, useParams } from 'react-router-dom'

function LeftNavbar() {
  const navigate = useNavigate()
  const { title } = useParams()
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            { title &&
                topicList.map((elem, index) => <p key={index} style={title == elem.mainTitle ? { color: "#346DDB" } : {}} onClick={() => navigate(`/article/${elem.mainTitle}`)}>{elem.mainTitle}</p>)
            }

        </div>
    </div>
  )
}

export default LeftNavbar