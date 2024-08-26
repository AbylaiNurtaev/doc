import React, { useEffect, useState } from 'react'
import s from './AdminPage.module.sass'
import { useNavigate } from 'react-router-dom'
import appartments from '../../articles.json'
import axios from '../../axios'

function AdminPage() {
    const[appartments, setAppartments] = useState()
    const[auth, setAuth] = useState();
    const [errorLogin, setErrorLogin] = useState(false)

    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const handleChangeLogin = (e) => {
      setLogin(e.target.value)
    }
    const handleChangePass = (e) => {
      setPassword(e.target.value)
    }

    const navigate = useNavigate()
    useEffect(() => {
      axios.get('/article')
      .then(response => response.data)
      .then(data => setAppartments(data))
    }, [])

    
    const deleteAppartment = (title) => {
      axios.delete(`/article/${title}`)
      .then(data => {
        if(data.data){
          setAppartments(prev => prev.filter(elem => elem.mainTitle != title))
        }})
        .catch((err) => console.log(err))
    console.log('удалить статью', title);

    
  }
  const fetchlogin = () => {
    axios.post('/auth/login', {
      email: login,
      password
    })
    .then((data) => {
      if(data.data && data.data.role == "admin"){
        setAuth(true)
        localStorage.setItem('token', data.data.token)
      }
  })
    .catch((err) => {
      console.log(err)
      setErrorLogin(true)
    }) 
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    if(token){
      setAuth(true)
    }
  }, [])



  return ( auth ? 
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.topSide}>
                <div className={s.title}>
                    <span>/</span> Статьи
                </div>
                <button onClick={() => navigate('/admin/AArticles')}>Добавить</button>
            </div>

            <div className={s.appartmentsSide}>
              { appartments &&
                appartments.map((elem, index) => (
                  <div className={s.appartment} key={index}>
                    <div className={s.title} onClick={() => navigate(`/admin/AArticles/${elem.mainTitle}`)}>{elem.mainTitle}</div>
                    <div className={s.delete} onClick={() => deleteAppartment(elem.mainTitle)}><img src="/icons/delete.svg" alt="" />удалить</div>
                  </div>
                ))
              }
            </div>
        </div>
    </div> : 
    <div className={s.container}>
            
    <div className={s.innerContainer}>
        
            <div className={s.inputs}>
                <h2><span>/   </span>   Войти</h2>
                <input type="text" placeholder='login:' onChange={handleChangeLogin} />
                <input type="password" placeholder='password:' onChange={handleChangePass} />
                <button onClick={() => fetchlogin()}>Войти</button>
                {
                    errorLogin &&
                <p className={s.errorLogin}>Неверный логин или пароль</p>
                }
            </div>
        
    </div>
</div>
  )
}

export default AdminPage