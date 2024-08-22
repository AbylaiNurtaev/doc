import React from 'react'
import topicList from '../../articles.json'
import s from './LeftNavbar.module.sass'

function LeftNavbar() {
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            {
                topicList.map((elem) => <p>{elem.title}</p>)
            }

        </div>
    </div>
  )
}

export default LeftNavbar