import React, { useState } from 'react';
import './index.css';
import orderimg from '../../assets/order.png';
import wpIcon from '../../assets/whatsappIcon.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function SalePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => setIsNavVisible(!isNavVisible);

  const toggleQuestion = (index: any) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleOrder = () => {
    const message = `Здравствуйте! Я по поводу книги, можете проконсультировать ?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/77476738427?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const faqs = [
    {
      question: 'Как заказать книгу?',
      answer: 'Заказ можно оформить, написав нам в WhatsApp. Наши менеджеры проконсультируют вас и, после оплаты, предоставят данные для входа в личный кабинет.',
    },
    {
      question: 'Сколько времени занимает создание книги?',
      answer: 'Процесс занимает 5-7 рабочих дней (редактура и печать). При необходимости доступна ускоренная редактура (1 день) и экспресс-печать (1 день).',
    },
    {
      question: 'Как осуществляется доставка?',
      answer: 'Мы доставляем по всему миру. Доставка осуществляется почтой или через СДЭК. Сроки доставки: по странам СНГ — 3-10 дней, в другие страны — 7-15 дней.',
    },
    {
      question: 'Могу ли я использовать собственный дизайн обложки?',
      answer: 'Да, вы можете предложить свой вариант обложки. Наши дизайнеры бесплатно адаптируют её для вашей книги.',
    },
    {
      question: 'Обязательно ли отвечать на все вопросы в книге?',
      answer: 'Нет, вы можете ответить на любое количество вопросов. Главное — заполнить минимум от 60 страниц для полноты книги.',
    },
  ];

  return (
    <div className='order-container'>
              <div className={`landing-new-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className={`landing-new-menu ${isNavVisible ? 'show' : ''}`}>
                <div className={`landing-new-menu-logo ${isScrolled ? 'scrolled' : ''}`}>comabooks</div>
                <div className='landing-new-menu-right'>
                    <button onClick={toggleNav} className='landing-new-menu-ham'><MenuIcon/></button>
                    <button className='landing-new-menu-order' onClick={handleOrder}>Заказать</button>
                </div>
            </div>

            <div className={`navigation ${isNavVisible ? 'show' : 'hide'}`}>
                    <Link to="/login">Войти</Link>
                    <Link to="https://www.instagram.com/comabooks/">Отзывы в Instagram</Link>
                    <Link to="/policies">Условия использования</Link>
                    <Link to="/order">Цены и частые вопросы</Link>
                    <button onClick={handleOrder}>Заказать</button>
            </div>
        </div>

      <img src={orderimg} className='order-img' alt='Order' />

      <div className='order-content'>
        <div className='order-title'>Посвяти книгу любимым</div>

        <div className='order-prices'>
          <div className='order-main-price'>42,000.00 ₸</div>
          <div className='order-prices-row'>
            <div>8,000.00₽</div>
            <div>7,000.00лв</div>
            <div>$90.00</div>
            <div>€80.00</div>
          </div>
        </div>

        <div className='order-buttons'>
          <button onClick={handleOrder} className='order-button'>
            <img src={wpIcon} alt='WhatsApp' />
            Узнать подробнее
          </button>
          <button onClick={handleOrder} className='order-button active'>Заказать</button>
        </div>

        <div className='order-faq'>
          {faqs.map((faq, index) => (
            <div key={index} className='faq-item'>
              <div
                className='faq-question'
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
                <KeyboardArrowDownIcon />
              </div>
              {activeQuestion === index && (
                <div className='faq-answer'>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalePage;
