import React, { useEffect, useState } from 'react'
import './index.css'
import HeaderNew from 'New/components/Header'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


function Policy() {
    const [isScrolled, setIsScrolled] = useState(false);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNav = () => setIsNavVisible(!isNavVisible);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const handleOrder = () => {
        const message = `Здравствуйте! Я по поводу книги, можете проконсультировать?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/77751716068?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className='policy-container'>
        <div className={`landing-new-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className={`landing-new-menu ${isNavVisible ? 'show' : ''}`}>
                <div className={`landing-new-menu-logo ${isScrolled ? 'scrolled' : ''}`}>comabooks</div>
                <div className='landing-new-menu-right'>
                    <button onClick={toggleNav} className='landing-new-menu-ham'><MenuIcon/></button>
                    <button className='landing-new-menu-order' onClick={handleOrder}>Заказать</button>
                </div>
            </div>

            <div className={`navigation ${isNavVisible ? 'show' : 'hide'}`}>
                    <Link to="https://www.comabooks.org/login">Войти</Link>
                    <Link to="https://www.instagram.com/comabooks/">Отзывы в Instagram</Link>
                    <Link to="https://www.comabooks.org/policies">Условия использования</Link>
                    <Link to="/order">Цены и частые вопросы</Link>
                    <button onClick={handleOrder}>Заказать</button>
            </div>
        </div>
        <div className='policy-title'>Политика конфиденциальности</div>

        <div className='policy-term'>
            <div className='policy-term-title'>Введение</div>
            <div className='policy-term-text'>Мы, Comabooks Publishing House, обязуемся защищать конфиденциальность ваших персональных данных. Данная политика конфиденциальности объясняет, как мы собираем, используем и защищаем информацию о пользователях нашего сайта.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Сбор данных</div>
            <div className='policy-term-text'>Мы собираем следующие типы данных:</div>
            <div className='policy-term-text'>Персональные данные: имя, адрес электронной почты и другие контактные данные, которые вы предоставляете при создании аккаунта.</div>
            <div className='policy-term-text'>Ответы на вопросы: информация, которую вы предоставляете при ответе на вопросы для создания персонализированной книги.</div>
            <div className='policy-term-text'>Фотографии: изображения, которые вы загружаете для включения в книгу.</div>
            <div className='policy-term-text'>Выбор обложки: ваши предпочтения относительно дизайна обложки книги.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Использование данных</div>
            <div className='policy-term-text'>Мы используем собранные данные для:</div>
            <div className='policy-term-text'>Создания вашей персонализированной книги.</div>
            <div className='policy-term-text'>Обработки ваших заказов и управления вашим аккаунтом.</div>
            <div className='policy-term-text'>Улучшения нашего сайта и услуг.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Конфиденциальность, редактура и раскрытие данных</div>

        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Отказ от ответственности и безопасность данных</div>
            <div className='policy-term-text'>Мы прилагаем все усилия для защиты ваших данных, но не можем гарантировать их абсолютную безопасность в интернете. В случае взлома нашего сайта мы не несем ответственности за утечку ваших персональных данных. Мы принимаем различные меры безопасности для защиты ваших персональных данных, включая электронные, физические и управленческие процедуры.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Права пользователя</div>
            <div className='policy-term-text'>Вы имеете право в любое время запросить доступ к своим персональным данным, их исправление, удаление или ограничение обработки. Также вы имеете право возражать против обработки ваших данных и запросить передачу данных.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Изменения в политике конфиденциальности</div>
            <div className='policy-term-text'>Мы можем обновлять нашу политику конфиденциальности периодически. Мы уведомим вас о любых изменениях, разместив новую политику конфиденциальности на этой странице.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Контактная информация</div>
            <div className='policy-term-text'>Если у вас есть вопросы относительно этой политики конфиденциальности, вы можете связаться с нами по телефону +7 (747) 673-84-27.</div>
        </div>


        <div className='policy-title'>Политика использования</div>

        <div className='policy-term'>
            <div className='policy-term-title'>Введение</div>
            <div className='policy-term-text'>Добро пожаловать на comabooks.org. Этот сайт предоставляет услуги по созданию персонализированных книг. Пользуясь нашим сайтом, вы соглашаетесь соблюдать следующие условия использования, которые могут быть обновлены нами время от времени без предварительного уведомления. Пожалуйста, регулярно проверяйте обновления.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Авторские права и интеллектуальная собственность</div>
            <div className='policy-term-text'>Все материалы на сайте, включая текст, графику, логотипы, иконки кнопок, изображения, аудио и видеоклипы, являются собственностью Comabooks Publishing House или ее контент-поставщиков и защищены законами об авторских правах. Никакие материалы на этом сайте не могут быть скопированы, воспроизведены, переданы или распространены без предварительного письменного разрешения Comabooks Publishing House.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Лицензия на использование</div>
            <div className='policy-term-text'>Comabooks Publishing House предоставляет вам ограниченную лицензию на доступ и личное использование этого сайта. Эта лицензия не включает перепродажу или коммерческое использование сайта или его содержимого; сбор и использование любых каталогов, описаний продуктов или цен; производное использование сайта или его содержимого; загрузку или копирование информации для другой стороны; или любое использование данных добычи, роботов или аналогичных инструментов сбора и извлечения данных.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Ваш аккаунт</div>
            <div className='policy-term-text'>Если вы используете этот сайт, вы несете ответственность за поддержание конфиденциальности своего аккаунта и пароля и за ограничение доступа к вашему компьютеру, и вы соглашаетесь принять ответственность за все действия, происходящие под вашим аккаунтом или паролем.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Политика возврата</div>
            <div className='policy-term-text'>Мы понимаем, что могут возникнуть различные обстоятельства, и предлагаем следующие условия возврата:</div>
            <div className='policy-term-text'>Полный возврат: Если вы подаете запрос на возврат в течение 3 дней после покупки, мы предоставим полный возврат стоимости.</div>
            <div className='policy-term-text'>Частичный возврат: Частичный возврат: Если запрос на возврат подается в течении 14 дней с момента покупки, мы возвращаем половину стоимости полной книги.</div>
            <div className='policy-term-text'>Невозможность возврата: Невозможность возврата: Если запрос на возврат подается по истечению 14 дней с момента покупки либо если ваш заказ уже находится на стадии редактуры, возврат средств не производится. Это связано с тем, что на стадии редактуры начинается печать обложки и используются материалы, индивидуально подготовленные для вашего заказа.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Изменения условий использования</div>
            <div className='policy-term-text'>Мы можем изменять эти условия использования время от времени без предварительного уведомления. Изменения вступают в силу с момента их публикации на сайте.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Контактная информация</div>
            <div className='policy-term-text'>Для дополнительных вопросов о политике использования сайта, пожалуйста, свяжитесь с нами по телефону +7 (747) 673-84-27.</div>
        </div>


    </div>
  )
}

export default Policy