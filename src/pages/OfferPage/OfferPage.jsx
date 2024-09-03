import React, { useState } from 'react'
import s from './OfferPage.module.sass'
import { Navigate, useNavigate } from 'react-router-dom'

function OfferPage() {
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.crumbs} onClick={() => navigate(-1)}>
                <img src="/fluent_arrow-up-28-filled.svg" alt=""  />
                <p>вернуться обратно</p>
            </div>
            <button onClick={() => setShow(true)}>Заполнить анкету</button>
            {   show &&
            <>
            <div className={s.popup}>
                <img onClick={() => setShow(false)} src="https://cdn-icons-png.flaticon.com/512/70/70091.png" alt="" />
                <h5>Заполнение анкеты</h5>
            </div>
            <div className={s.blur} onClick={() => setShow(false)}></div>
            </>
            }
        </div>
    </div>
  )
}

export default OfferPage