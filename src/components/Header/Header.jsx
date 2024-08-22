import React, { useState } from 'react'
import s from './Header.module.sass'
import articles from '../../articles.json'
function Header() {
    const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.logo}>
                <img className={s.burgerMenu} onClick={() => setShowMenu(prev => !prev)} src="https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/bars.svg?v=1&token=a463935e93" alt="" />
                <div className="logo">Logo</div>
            </div>
            <button><img src="https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/magnifying-glass.svg?v=1&token=a463935e93" alt="img" /><span>Search</span></button>
        </div>
        { showMenu &&
        <div className={s.menu}>
            {
                articles.map((elem) => <p>{elem.title}</p>)
            }
        </div>
        }
    </div>
  )
}

export default Header