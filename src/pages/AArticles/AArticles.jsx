import {React, useState, useEffect} from 'react'
import s from './AArticles.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function AArticles() {
    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const [article, setArticle] = useState(null)

    const [articlesTitle, setArticlesTitle] = useState('')
    const [articlesText, setArticlesText] = useState('')

    const [subTitles, setSubTitles] = useState([])
    const [subContents, setSubContents] = useState([])

    const { title } = useParams()

    const sendArticle = () => {
        const fields = {
            mainTitle: articlesTitle,
            titles: subTitles,
            content: subContents
        }
        axios.post(`/article`, fields)
            .then(data => {
                console.log(data);
                if (data.data) {
                    alert('Успешно создана статья')
                }
            })
    }

    const navigate = useNavigate()

    const updateArticle = () => {
        const fields = {
            mainTitle: articlesTitle,
            titles: subTitles,
            content: subContents
        }
        axios.patch(`/article/update/${articlesTitle}`, fields)
            .then(resp => resp.data)
            .then(data => {
                if (data) {
                    navigate('/admin')
                }
            })
            .catch((err) => console.log(err))
    }

const handleChangeTitles = (e, idx) => {
    const value = e.target.value;
    const updatedTitles = [...subTitles];  // Создаем новый массив
    updatedTitles[idx] = value;  // Обновляем нужный элемент
    setSubTitles(updatedTitles);  // Обновляем состояние
}
    const handleChangeContents = (e, idx) => {
        const value = e.target.value;
        const updatedContents = [...subContents];  // Создаем новый массив
        updatedContents[idx] = value;  // Обновляем нужный элемент
        setSubContents(updatedContents);  // Обновляем состояние
    }

    useEffect(() => {
        
        if (title) {
            axios.get(`/article`)
                .then(resp => resp.data)
                .then(data => data.find((elem) => elem.mainTitle === title))
                .then(article => {
                    console.log(article);
                    
                    if (article) {
                        setArticle(true)
                        setSubTitles(article.titles)
                        setSubContents(article.content)
                        setArticlesTitle(article.mainTitle)
                    }
                })
        }
    }, [title])

    return (
        <div className={s.container}>
            <div className={s.articles}>
                <div className={s.title}>
                    <p className={s.slash}>/</p>
                    <p className={s.titlePath}>Статьи</p>
                </div>
                {
                    !article ? (
                        <>
                            <p>Главный заговолок</p>
                            <input type="text" onChange={(e) => handleChange(e, setArticlesTitle)} />
                            
                            {
                                subTitles && 
                                subTitles.map((elem, index) => <>
                                <p>Подзаговолок</p>
                                <input type="text" onChange={(e) => handleChangeTitles(e, index)} />
                                <p>Код подзаголовка</p>
                                <textarea type="text" className={s.codeInput} onChange={(e) => handleChangeContents(e, index)} />
                                </>)
                            }
                            <button onClick={() => setSubTitles((prev) => [...prev, ""])}>Добавить подзаговолок</button>
                            <button onClick={sendArticle} className={s.createBtn}>Опубликовать</button>
                        </>
                    ) : (
                        <>
                            <p>Главный заговолок</p>
                            <input type="text" value={articlesTitle} onChange={(e) => handleChange(e, setArticlesTitle)} />
                            
                            {
                                subTitles && 
                                subTitles.map((elem, index) => (
                                    <>
                                        <p>Подзаголовок</p>
                                        <input 
                                            type="text" 
                                            value={elem}  // Привязка к конкретному элементу массива
                                            onChange={(e) => handleChangeTitles(e, index)}  // Обработчик изменений
                                        />
                                        <p>Код подзаголовка</p>
                                        <textarea 
                                            type="text" 
                                            value={subContents[index]}  // Привязка к соответствующему элементу subContents
                                            className={s.codeInput} 
                                            onChange={(e) => handleChangeContents(e, index)}  // Обработчик изменений
                                        />
                                    </>
                                ))
                            }
                            <button onClick={() => setSubTitles((prev) => [...prev, ""])}>Добавить подзаговолок</button>
                            <button onClick={updateArticle} className={s.createBtn}>Сохранить</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default AArticles