import React, { useEffect, useState } from 'react';
import s from './ArticlePage.module.sass';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../axios'

function ArticlePage() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const [articles, setArticles] = useState()

  const navigate = useNavigate()


  useEffect(() => {
    axios.get('/article')
      .then(res => res.data)
      .then(data => data.find((elem) => elem.mainTitle === title))
      .then(data => setArticle(data))
  }, [title]);


  useEffect(() => {
    // Эффект отслеживания текущего заголовка
    if (article && article.titles) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = article.titles.findIndex(
                (title) => title === entry.target.id
              );
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.5 } // Callback сработает, когда весь <p> элемент будет в области видимости
      );

      article.titles.forEach((title) => {
        const element = document.getElementById(title);
        if (element) {
          observer.observe(element); // Отслеживаем элемент <p> по его id
        }
      });

      return () => {
        article.titles.forEach((title) => {
          const element = document.getElementById(title);
          if (element) {
            observer.unobserve(element); // Очищаем наблюдатели при демонтировании
          }
        });
      };
    }
  }, [article]);

  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.left}>
          <LeftNavbar />
        </div>
        <div className={s.right}>
          <h1>
            {article && article.content && article.content.length > 0 && article.mainTitle}
          </h1>
          {article &&
            article.content &&
            article.content.length > 0 &&
            article.titles.map((elem, index) => (
              <div key={index} className={s.block}>
                <span id={article.titles[index]}></span>
                <h2>{article.titles[index]}</h2>
                <div
                  id={article.titles[index]} // Убедитесь, что id соответствует заголовку
                  className={s.content}
                  dangerouslySetInnerHTML={{ __html: article.content[index] }}
                >
                </div>
              </div>
            ))}
        </div>
        <div className={s.navbar}>
          {article &&
            article.content &&
            article.content.length > 0 &&
            article.titles.map((elem, index) => (
              <a
                key={index}
                className={activeIndex === index ? s.active : ''}
                href={'#' + elem}
              >
                {elem}
              </a>
            ))}
        </div>
      </div>
        <img className={s.gif} src='/banner1.gif' onClick={() => navigate('/offer')}/>
    </div>
  );
}

export default ArticlePage;
