import React, { useEffect, useState } from 'react'
import s from './ArticlePage.module.sass'
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar'
import { useParams } from 'react-router-dom'
import articles from '../../articles.json'

function ArticlePage() {

    const { title } = useParams()
    const [article, setArticle] = useState()
    let content = []

    useEffect(() => {
        console.log(title);
        
        const findArticle = () => {
            const article = articles.find((elem) => elem.mainTitle === title)
            setArticle(article);
        }
        findArticle()
        
    }, [title])
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.left}>
          <LeftNavbar/>
        </div>
        <div className={s.right}>
          <h1>{article && article.content && article.content.length > 0 && article.mainTitle}</h1>
            {
                article && article.content && article.content.length > 0 &&
                article.titles.map((elem, index) => 
                  <div className={s.block}>
                    <span id={article.titles[index]}></span>
                    <h2>{article.titles[index]}</h2>
                    <div className={s.content} dangerouslySetInnerHTML={{ __html: article.content[index] }} />
                  </div>
                )
            }
        </div>
        <div className={s.navbar}>
            {
              article && article.content && article.content.length > 0 &&
              article.titles.map((elem, index) => 
                <a href={"#" + elem}>{elem}</a>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default ArticlePage