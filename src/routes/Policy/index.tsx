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
            <div className='policy-term-text'>Мы, Comabooks Publishing House (юридическое лицо ИП COMAHOLDING),, обязуемся защищать конфиденциальность ваших персональных данных. Данная политика конфиденциальности объясняет, как мы собираем, используем и защищаем информацию о пользователях нашего сайта.</div>
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
            <div className='policy-term-text'>Содержание вашей книги видят только вы и наш редактор. Вы можете отказаться от редактуры, и ваш материал останется полностью анонимным.</div>
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
            <div style={{paddingTop: 10}} className='policy-term-text'><b>Разделение услуги</b></div>
            <div className='policy-term-text'>- Услуга «Создание аккаунта»: стоимость 5 000 ₸. </div>
            <div className='policy-term-text'>- Услуга «Редактура»: стоимость 20  000 ₸.</div>
            <div className='policy-term-text'>- Услуга «Печать»: стоимость 14  000 ₸.</div>
            <div className='policy-term-text'>Все цены на сайте указаны в тенге (₸). При оплате в другой валюте итоговая сумма может отличаться от указанной на сайте в связи с разными факторами, включая валютный курс, комиссии платёжных систем и особенности конвертации.</div>
            <div style={{paddingTop: 10}}  className='policy-term-text'><b>Создание аккаунта</b></div>
            <div className='policy-term-text'>«Создание аккаунта» считается оказанной в полном объёме сразу после предоставления клиенту доступа (логина и пароля) к личному кабинету на сайте.</div>
            <div className='policy-term-text'>Поскольку доступ создаётся индивидуально и позволяет немедленно приступить к работе над книгой, стоимость услуги «Создание аккаунта» (5 000 ₸) не подлежит возврату.</div>
            <div style={{paddingTop: 10}}  className='policy-term-text'><b>Редактура и печать</b></div>
            <div className='policy-term-text'>Услуги «Редактура» и «Печать» подразумевают индивидуальную работу над материалами клиента: корректировку текста, верстку и печать уникального экземпляра.</div>
            <div className='policy-term-text'>Если клиент запрашивает возврат до начала процесса редактуры, стоимость услуги «Редактура» и «Печать» (34 000 ₸) возвращается в полном объёме (за вычетом невозвратимой услуги «Создание аккаунта»).</div>
            <div className='policy-term-text'>Процесс редактуры начинается сразу после того, как клиент завершает заполнение книги и отправляет её на корректировку (нажимает кнопку «Завершить» либо иным образом сообщает, что материал готов к редактированию). С этого момента возврат стоимости услуги «Редактура» не осуществляется, поскольку начинается работа с индивидуальным заказом.</div>
            <div className='policy-term-text'>Если после начала редактуры клиент решает отказаться от печати, возврат осуществляется только за услугу «Печать» (5 000 ₸).</div>
            <div style={{paddingTop: 10}}  className='policy-term-text'><b>Порядок запроса возврата</b></div>
            <div className='policy-term-text'>Для запроса возврата свяжитесь с нами любым удобным способом (телефон, электронная почта, мессенджеры).</div>
            <div className='policy-term-text'>Укажите ваш логин, дату покупки и причину запроса возврата.</div>
            <div className='policy-term-text'>После получения запроса мы:</div>
            <div className='policy-term-text'>Проверим статус вашего заказа (началась ли редактура, процесс печати и т.д.).</div>
            <div className='policy-term-text'>Проведём расчёт возможной суммы к возврату (согласно пунктам 2 и 3).</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Изменения условий использования</div>
            <div className='policy-term-text'>Мы можем вносить изменения в настоящие условия использования, при этом обязуемся уведомлять пользователей о таких изменениях посредством публикации обновлённой редакции условий на сайте не позднее чем за 2 календарных дня до вступления изменений в силу. Продолжение использования сайта после вступления изменений в силу означает согласие пользователя с новыми условиями.</div>
        </div>

        <div className='policy-term'>
            <div className='policy-term-title'>Контактная информация</div>
            <div className='policy-term-text'>Для дополнительных вопросов о политике использования сайта, пожалуйста, свяжитесь с нами по телефону +7 (747) 673-84-27.</div>
        </div>


    </div>
  )
}

export default Policy