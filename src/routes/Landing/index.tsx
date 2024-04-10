import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../Home/components/Navbar";
import './index.css'
import landingbg from 'assets/landingbg.png'
import landingmobilebg from 'assets/landingmobilebg.png'

function Landing() {
const navitage = useNavigate();
  return (
    <div className='landing-page'>
        <Navbar />
        <div className='landing-hiro'>
        <div className='landing-hiro-column'>
            <div className='landing-hiro-title'>Посвяти книгу близкому человеку</div>
            <div className='landing-hiro-text'>Стань полноценным автором собственной книги и порадуй близких!</div>
            <div className='landing-buttons-row'>
            <Link to="http://wa.me/77476738427" className='landing-button'>Начать</Link>
            </div>
        </div>
        <img className='landing-hiro-media' src={landingbg} />
        <img className='landing-hiro-media-mobile' src={landingmobilebg} />
        </div>

        {/* <div className='landing-we'>

        <div className='landing-title-text-column'>
            <div className='landing-column-title'>Как написать собственную книгу вместе с Comabooks?</div>
        </div>

        </div> */}

        <div className='landing-title-text-column'>
            <div className='landing-column-title'>Процесс</div>
        </div>

        <div className='landing-how-grid'>
            <div className='landing-how-card'>
                <div className='landing-how-card-title'>01</div>
                <div className='landing-how-card-title'>Выберите формат</div>
                <div className='landing-how-card-text'>На нашей платформе есть более десяти форматов под каждого получателя: партнеру, родителям, друзьям и тд.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>02</div>
                <div className='landing-how-card-title'>Свяжитесь с менеджером</div>
                <div className='landing-how-card-text'>Наш менеджер проконсультирует вас, откроет вам доступ к платформе под ваш формат.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>03</div>
                <div className='landing-how-card-title'>Заполняйте содержание</div>
                <div className='landing-how-card-text'>После произведения оплаты и получения доступа к платформе, вы сможете начать заполнять содержание вашей будущей книги.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>04</div>
                <div className='landing-how-card-title'>Дополняйте вашу книгу воспоминаниями</div>
                <div className='landing-how-card-text'>На нашей платформе можно добавить воспоминания в виде фото, даты и краткого описания.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>05</div>
                <div className='landing-how-card-title'>Работайте над обложкой</div>
                <div className='landing-how-card-text'>Вам также дается возможность самостоятельно выбрать обложку под будущую книгу, указать название и инициалы автора.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>06</div>
                <div className='landing-how-card-title'>Верстка</div>
                <div className='landing-how-card-text'>Как только работа над содержанием завершена, наши редакторы приступают верстать ее под печать.</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>07</div>
                <div className='landing-how-card-title'>Печать книги</div>
                <div className='landing-how-card-text'>После верстки, мы отправим вам предворительную версию. Если с ней все хорошо, то отправляем книгу на печать!</div>
            </div>

            <div className='landing-how-card'>
                <div className='landing-how-card-title'>08</div>
                <div className='landing-how-card-title'>Упаковка и доставка</div>
                <div className='landing-how-card-text'>Как только книга пройдет процесс печати, наши сотрудники красиво и аккуратно упакуют ее и отправят доставкой к получателю.</div>
            </div>
        </div>



        <div className='landing-title-text-column'>
            <div className='landing-column-title'>Форматы</div>
            <div className='landing-column-text'>Более десяти разных форматов подстроенных под вашего получателя.</div>
        </div>

        <div className='landing-format-grid'>
            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Парню</div>
                <div className='landing-how-card-text'>202 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Девушке</div>
                <div className='landing-how-card-text'>202 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Мужу</div>
                <div className='landing-how-card-text'>202 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Жене</div>
                <div className='landing-how-card-text'>202 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Родителям</div>
                <div className='landing-how-card-text'>250 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Маме</div>
                <div className='landing-how-card-text'>210 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Папе</div>
                <div className='landing-how-card-text'>210 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Брату</div>
                <div className='landing-how-card-text'>195 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Сестре</div>
                <div className='landing-how-card-text'>195 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Другу</div>
                <div className='landing-how-card-text'>185 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Подруге</div>
                <div className='landing-how-card-text'>185 вопросов</div>
            </div>

            <div className='landing-format-card'>
                <div className='landing-how-card-title'>Свой формат</div>
                <div className='landing-how-card-text'>Сделаем под вас!</div>
            </div>
        </div>



        <div className='landing-title-text-column'>
            <div className='landing-column-title'>Частые вопросы</div>
            <div className='landing-column-text'>Если же у вас остались вопросы, можете написать нам на WhatsApp или Instagram!</div>
        </div>

        <div className='landing-questions-grid'>
            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- Можно ли сделать формат под меня?</div>
                <div className='landing-how-card-text'>На нашей платформе есть более десяти форматов под каждого получателя: партнеру, родителям, друзьям и тд.</div>
            </div>

            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- Можно ли добавить что-то от себя?</div>
                <div className='landing-how-card-text'>Наш менеджер проконсультирует вас, откроет вам доступ к платформе под ваш формат.</div>
            </div>

            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- У меня есть готовое содержание моей книги. Могу я через вас ее издать?</div>
                <div className='landing-how-card-text'>После произведения оплаты и получения доступа к платформе, вы сможете начать заполнять содержание вашей будущей книги.</div>
            </div>

            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- Сколько времени займет написать книгу?</div>
                <div className='landing-how-card-text'>На нашей платформе можно добавить воспоминания в виде фото, даты и краткого описания.</div>
            </div>

            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- Доставляете только по Казахстану?</div>
                <div className='landing-how-card-text'>Вам также дается возможность самостоятельно выбрать обложку под будущую книгу, указать название и инициалы автора.</div>
            </div>

            <div className='landing-question-card'>
                <div className='landing-how-card-title'>- Нужно обязательно ответить на все вопросы?</div>
                <div className='landing-how-card-text'>Как только работа над содержанием завершена, наши редакторы приступают верстать ее под печать.</div>
            </div>
        </div>

        <div className='lading-action'>
        <div className='landing-action-title'>Издай собственную книгу и подари близким!</div>
        <div className='landing-buttons-row'>
            <Link to="http://wa.me/77476738427" className='landing-action-button'>Начать</Link>
        </div>
        </div>
    </div>
  )
}

export default Landing;