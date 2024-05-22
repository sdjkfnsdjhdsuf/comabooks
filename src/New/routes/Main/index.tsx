import HeaderNew from 'New/components/Header';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { chapters } from './chapter';

interface Question {
    _id: string;
    question: string;
}

interface Answer {
    _id: string;
    questionId: string;
    answer: string;
    userId: string;
    templateId: string;
}

const Main: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [popup, setPopup] = useState(false);
    const { id: templateId } = useParams<{ id: string }>();
    const debounceTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
    const [orderStatus, setOrderStatus] = useState<string>('');
    const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);

    useEffect(() => {
        if (templateId) {
            fetch(`https://api.comabooks.org/questions/${templateId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setQuestions(data);
                })
                .catch(error => console.error('Error fetching questions:', error));
        }
    }, [templateId]);

    useEffect(() => {
        if (templateId) {
            fetch(`https://api.comabooks.org/order/template/${templateId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setOrderStatus(data.status);
                })
                .catch(error => console.error('Error fetching order status:', error));
        }
    }, [templateId]);

    useEffect(() => {
        if (templateId) {
            const endpoint = orderStatus === 'done' ? 'answerSmart' : 'answers';
            fetch(`https://api.comabooks.org/${endpoint}/my/${templateId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    const answersMap: { [key: string]: string } = {};
                    data.forEach((answer: Answer) => {
                        answersMap[answer.questionId] = answer.answer;
                    });
                    setAnswers(answersMap);
                    checkReadyToSubmit(answersMap);
                })
                .catch(error => console.error(`Error fetching ${endpoint}:`, error));
        }
    }, [templateId, orderStatus]);

    useEffect(() => {
        textareaRefs.current.forEach((textarea) => {
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        });
    }, [answers]);

    const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>, questionId: string) => {
        const newAnswers = { ...answers, [questionId]: event.target.value };
        setAnswers(newAnswers);
        checkReadyToSubmit(newAnswers);

        if (debounceTimeoutRef.current[questionId]) {
            clearTimeout(debounceTimeoutRef.current[questionId]);
        }

        debounceTimeoutRef.current[questionId] = setTimeout(() => {
            const endpoint = orderStatus === 'done' ? 'answerSmart' : 'answers';
            fetch(`https://api.comabooks.org/${endpoint}/edit/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ questionMessage: event.target.value }),
            })
                .then(response => response.json())
                .then(data => console.log('Answer saved:', data))
                .catch(error => console.error('Error saving answer:', error));
        }, 500); // Adjust the delay (500ms) as needed
    };

    const checkReadyToSubmit = (answersMap: { [key: string]: string }) => {
        const ready = Object.values(answersMap).every(answer => countWords(answer) >= 30);
        setReadyToSubmit(ready);
    };

    const getChapter = (questionId: string) => {
        const chapter = chapters.find(chapter => chapter.questionId === questionId);
        return chapter ? chapter : null;
    };

    const handleSubmit = () => {
        fetch(`https://api.comabooks.org/ready/template/${templateId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ready: true }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Template marked as ready:', data);
                setPopup(false);
            })
            .catch(error => console.error('Error marking template as ready:', error));
    };

    const countWords = (text: string): number => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    return (
        <div className='main-container'>
            <HeaderNew templateId={templateId || ''} />
            <div className='main-forms'>
                {questions.map((questionObj, index) => {
                    const chapter = getChapter(questionObj._id);
                    return (
                        <div key={questionObj._id} className='main-form'>
                            {chapter && (
                                <div className='main-form-chapter'>
                                    <div>{chapter.chapter}</div>
                                    <div>{chapter.title}</div>
                                </div>
                            )}
                            <div className='main-form-question'>{questionObj.question}</div>
                            <textarea
                                ref={(el) => (textareaRefs.current[index] = el)}
                                className="main-form-answer"
                                value={answers[questionObj._id] || ""}
                                onChange={(event) => handleAnswerChange(index, event, questionObj._id)}
                                placeholder="Напишите сюда ответ..."
                            />
                            <div className={`word-counter ${countWords(answers[questionObj._id] || "") < 30 ? 'red' : 'black'}`}>
                                {countWords(answers[questionObj._id] || "")} слов
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='main-buttons'>
                {orderStatus === 'writing' && 
                    <button onClick={() => { setPopup(true) }} disabled={!readyToSubmit} className='main-edit'>Отправить на редактуру</button>
                }
                {orderStatus === 'done' && 
                    <button className='main-done'>Материал отредактирован!</button>
                }
                {orderStatus === 'waiting' && 
                    <button className='main-wait'>Материал в редактуре</button>
                }
            </div>

            {popup &&
                <div className='main-popup-container'>
                    <div className='main-popup'>
                        <div className='main-popup-title'>Вы точно уверены отправить материал на редактуру?</div>
                        <div className='main-popup-text'>Перепроверьте каждый ответ перед отправкой, это действие нельзя будет изменить.</div>
                        <button className='main-popup-button' disabled={!readyToSubmit} onClick={handleSubmit}>Да, отправить</button>
                        <button onClick={() => { setPopup(false) }} className='main-popup-close'>×</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Main;
