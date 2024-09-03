import React, { useEffect, useState } from 'react'
import s from './Header.module.sass'
import articles from '../../articles.json'
import { useNavigate } from 'react-router-dom';

import axios from '../../axios'

function Header() {
    const [showMenu, setShowMenu] = useState(false)
    const [popup, setPopup] = useState(false);
    const [find, setFind] = useState("")
    const [filteredArticle, setFilteredArticle] = useState([])


    const [articles, setArticles] = useState()

    useEffect(() => {
        axios.get('/article')
        .then(res => res.data)
        .then(data => setArticles(data))
    }, [])

    const navigate = useNavigate()
    const handleChangeFind = (e) => {
        setFind(e.target.value)
    }

    const stripHtmlTags = (text) => {
        return text.replace(/<\/?[^>]+>/gi, '');
    };
    

    useEffect(() => {
        if (find.length > 0 && articles) {
            const filteredArticle = articles.map((article) => {
                // Фильтруем titles и проверяем наличие слова в content
                const filteredTitles = article.titles.map(title => {
                    if (title.includes(find)) {
                        return title;
                    }
                    // Добавляем слово в title, если оно присутствует в контенте
                    const contentContainsFind = article.content.some(content => stripHtmlTags(content).includes(find));
                    return contentContainsFind ? `${title}` : title;
                }).filter(title => title.includes(find) || article.content.some(content => stripHtmlTags(content).includes(find))); // Убираем заголовки, если слово не найдено

                // Фильтруем content, удаляем HTML-теги и обрезаем его
                const filteredContent = article.content.map(content => {
                    const plainTextContent = stripHtmlTags(content); // Удаляем HTML-теги
                    const startIndex = plainTextContent.toLowerCase().indexOf(find.toLowerCase());
                    if (startIndex === -1) {
                        return null;
                    }
                    const previewLength = 150; // Длина для обрезки
                    const start = Math.max(startIndex - 50, 0); // Начало обрезки
                    const end = Math.min(startIndex + previewLength, plainTextContent.length); // Конец обрезки
                    const preview = plainTextContent.substring(start, end);
                    return `${preview}${end < plainTextContent.length ? '...' : ''}`;
                }).filter(content => content !== null); // Убираем null значения
                
                // Если есть совпадения в mainTitle, titles или content, добавляем статью в результат
                if (article.mainTitle.includes(find) || filteredTitles.length > 0 || filteredContent.length > 0) {
                    return {
                        ...article,
                        titles: filteredTitles.length > 0 ? filteredTitles : article.titles, // Если нет совпадений, возвращаем оригинальные titles
                        content: filteredContent,
                    };
                }

                return null;
            }).filter(article => article !== null); // Убираем статьи, где нет совпадений
            
            console.log(filteredArticle);
            setFilteredArticle(filteredArticle);
        } else {
            setFilteredArticle([]);
        }
    }, [find, articles]);
    

    return (
        <div className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.logo}>
                    <img className={s.burgerMenu} onClick={() => setShowMenu(prev => !prev)} src="https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/bars.svg?v=1&token=a463935e93" alt="" />
                    <img className={s.logotype} src="/logo.jpg" alt="" />
                </div>
                <button onClick={() => setPopup(true)}><img src="https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/magnifying-glass.svg?v=1&token=a463935e93" alt="img" /><span>Search</span></button>
            </div>
            {showMenu &&
                <div className={s.menu}>
                    {articles.map((elem) => <p key={elem.id}>{elem.mainTitle}</p>)}
                </div>
            }
            {popup &&
                <>
                    <div className={s.overlay} onClick={() => {setPopup(false)}}></div>
                    <input className={s.popUp} onChange={handleChangeFind} type='text' placeholder='Search content' />
                    {find.length > 0 &&
                        <div className={s.findBlock}>
                            {filteredArticle.length > 0 ? (
                                filteredArticle.map((article,index) =>
                                    <div className={s.block} key={article.id}>
                                        <p className={s.mainTitle} onClick={() => {navigate(`/article/${article.mainTitle}`); setPopup(false)}}>{article.mainTitle}</p>
                                        {
                                            article.titles && 
                                            article.titles.map((title, index) => 
                                            <div className={s.subBlock} onClick={() => {setPopup(false)}}>
                                                <a href={`/article/${article.mainTitle}#${title}`} className={s.title}>{title}</a>
                                                <a href={`/article/${article.mainTitle}#${title}`} className={s.content}>{article.content[index]}</a>
                                            </div>)
                                        }
                                        {/* {article.titles.length > 0 && <p>{article.titles}</p>}
                                        {article.content.length > 0 && <p>{article.content}</p>} */}
                                    </div>
                                )
                            ) : (
                                <p>No results found</p>
                            )}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Header
