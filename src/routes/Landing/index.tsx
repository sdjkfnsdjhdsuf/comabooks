import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import bg from 'assets/landing-bg.png'
import book1 from 'assets/book1.png'
import book2 from 'assets/book2.png'
import book3 from 'assets/book3.png'
import book4 from 'assets/book4.png'
import book5 from 'assets/book5.png'
import book6 from 'assets/book6.png'
import book7 from 'assets/book7.png'
import book8 from 'assets/book8.png'
import survey from 'assets/icon-survey.png'
import step1 from 'assets/first.png'
import result1 from 'assets/results1.png'
import result2 from 'assets/results2.png'
import result3 from 'assets/results3.png'
import result4 from 'assets/results4.png'
import review1 from 'assets/review1.jpeg'
import review2 from 'assets/review2.jpeg'
import review3 from 'assets/review3.jpeg'
import review4 from 'assets/review4.jpeg'
import review5 from 'assets/review5.jpeg'
import review6 from 'assets/review6.jpeg'
import review7 from 'assets/review7.jpeg'
import tiktok1 from 'assets/tiktok1.png'
import tiktok2 from 'assets/tiktok2.png'
import tiktok3 from 'assets/tiktok3.png'
import tiktok4 from 'assets/tiktok4.png'
import kaspi from 'assets/kaspi.png'
import mockup1 from 'assets/mm1.png'
import mockup2 from 'assets/mm2.png'
import mockup3 from 'assets/mm3.png'
import mockup4 from 'assets/mm4.png'
import mockup5 from 'assets/mm5.png'
import mockup6 from 'assets/mm6.png'
import verstka from 'assets/verstka.png'
import print from 'assets/print.png'
import wrapper from 'assets/wrapper.png'
import result5 from 'assets/result5.png'
import result6 from 'assets/result6.png'
import { globalPhoneNumber } from 'routes/LandingNew'

function Landing() {
const navigate = useNavigate();
const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => setIsNavVisible(!isNavVisible);
  const [currentRecipient, setCurrentRecipient] = useState('Представьте, как вы посвящаете книгу девушке. Такого подарка она еще точно не получала!');
  const recipients = ['Представьте, как вы посвящаете книгу девушке. Такого подарка она еще точно не получала!',
  'Представьте, как вы посвящаете книгу парню. Такого подарка он еще точно не получал!',
  'Представьте, как вы посвящаете книгу жене. Такого подарка она еще точно не получала!',
  'Представьте, как вы посвящаете книгу мужу. Такого подарка он еще точно не получал!',
  'Представьте, как вы посвящаете книгу маме. Такого подарка она еще точно не получала!',
  'Представьте, как вы посвящаете книгу папе. Такого подарка он еще точно не получал!',
  'Представьте, как вы посвящаете книгу брату. Такого подарка он еще точно не получал!',
  'Представьте, как вы посвящаете книгу сестре. Такого подарка она еще точно не получала!',
  'Представьте, как вы посвящаете книгу другу. Такого подарка он еще точно не получал!',
  'Представьте, как вы посвящаете книгу подруге. Такого подарка она еще точно не получала!',
  'Представьте, как вы посвящаете книгу коллеге. Такого подарка он еще точно не получал!'];
  const handleOrder = () => {
    const message = `Здравствуйте, пишу с сайта по поводу книги. Можете проконсультировать?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${globalPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRecipient(prevRecipient => {
        const currentIndex = recipients.indexOf(prevRecipient);
        const nextIndex = (currentIndex + 1) % recipients.length;
        return recipients[nextIndex];
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <div className='landing-page'>
        <div className='landing-header'>
            <div className='landing-header-full'>
                <div className='landing-header-content' onClick={toggleNav}>
                    <div className='landing-header-logo'>comabooks</div>
                    <div className='landing-header-right'>
                        <img src={wrapper} className='landing-header-wrapper' />
                    </div>
                </div>

                <div className={`navigation ${isNavVisible ? 'show' : 'hide'}`}>
                    <Link to="/login">Войти</Link>
                    <Link to="https://www.instagram.com/comabooks/">Instagram</Link>
                    <Link to="/policies">Условия использования</Link>
                    <button onClick={handleOrder}>Заказать</button>
                </div>
            </div>
        </div>

        <div className='hiro'>
            <img className='hiro-bg' src={bg} />
            <div className='hiro-column'>
                <div className='hiro-column-title'>Напиши книгу своим любимым</div>
                <div className='hiro-column-text'>С нами вы можете посвятить собственную книгу любимым: второй половинке, родителям, друзьям и т.д.</div>
                <div className='hiro-column-button'>
                    <button onClick={handleOrder} className='landing-button'>Заказать</button>
                </div>
            </div>
        </div>

        <div className='two'>
            <div className='two-title'>Запечатли вашу историю на века</div>
            <div className='landing-label'>что я получу</div>
            <div className='two-text'>Заказав у нас, вы получите целую книгу на 200-300 страниц, наполненную вашими лучшими воспоминаниями.</div>

            <div className='books'>
                    <img className='book' src={book1} alt="Book" />,
                    <img className='book' src={book8} alt="Book" />,
                    <img className='book' src={book2} alt="Book" />,
                    <img className='book' src={book3} alt="Book" />,
                    <img className='book' src={book4} alt="Book" />,
                    <img className='book' src={book5} alt="Book" />,
                    <img className='book' src={book6} alt="Book" />,
                    <img className='book' src={book7} alt="Book" />,
            </div>
        </div>

        <div className='three'>
            <div className='landing-label'>что от меня требуется</div>
            <div className='three-text'>Наши книги идут в формате интервью (вопрос / ответ), у нас есть более десяти форматов со списком вопросов. Вам нужно на них ответить у нас на платформе.</div>

            <div className='receiver-grid'>
                <div className='receiver-card'>
                    <div className='receiver'>Парню</div>
                    <div className='receiver-q'>202 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Девушке</div>
                    <div className='receiver-q'>202 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Маме</div>
                    <div className='receiver-q'>170 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Папе</div>
                    <div className='receiver-q'>170 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Сестре</div>
                    <div className='receiver-q'>165 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Брату</div>
                    <div className='receiver-q'>165 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Мужу</div>
                    <div className='receiver-q'>211 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Жене</div>
                    <div className='receiver-q'>211 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Другу</div>
                    <div className='receiver-q'>173 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Подруге</div>
                    <div className='receiver-q'>173 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Коллеге</div>
                    <div className='receiver-q'>140 впр.</div>
                </div>

                <div className='receiver-card'>
                    <div className='receiver'>Себе</div>
                    <div className='receiver-q'>190 впр.</div>
                </div>
            </div>

            <div className='survey'>
                <div className='survey-title'>Вопросы проверены психологами Университета Мичигана. Они выявили, что эта книга способствует укреплению отношений на 88%.</div>
                <img className='survey-icon' src={survey} />
            </div>
        </div>

        <div className='process'>
            <div className='process-1'>
                <div className='landing-label'>как начать</div>
                <div className='process-text'>Всего 4 этапа</div>
            </div>

            <div className='process-2'>
                <div className='process-step'>
                    <div className='process-label'>первый этап</div>
                    <div className='process-step-text'>После оплаты вы получите личный кабинет на нашей платформе. Далее, можно приступать к заполнению содержания вашей будущей книги. </div>
                </div>

                <img className='process-img' src={step1} />
            </div>

            <div className='process-2'>
                <div className='process-step'>
                    <div className='process-label'>второй этап</div>
                    <div className='process-step-text'>На платформе вы будете отвечать на вопросы. Можно добавлять фотографий и создать обложку. </div>
                </div>

                <div className='mockups'>
                    <img className='mockup' src={mockup1} />
                    <img className='mockup' src={mockup2} />
                    <img className='mockup' src={mockup3} />
                    <img className='mockup' src={mockup4} />
                    <img className='mockup' src={mockup5} />
                    <img className='mockup' src={mockup6} />
                </div>
            </div>

            <div className='process-2'>
                <div className='process-step'>
                    <div className='process-label'>третий этап</div>
                    <div className='process-step-text'>Как только вы заполните содержание, наши редакторы приступят к корректировке, а дизайнеры займутся версткой. </div>
                </div>

                <img className='process-img' src={verstka} />
            </div>

            <div className='process-2'>
                <div className='process-step'>
                    <div className='process-label'>финальный этап</div>
                    <div className='process-step-text'>Далее, книга отправится на печать. При готовности, мы аккуратно ее упакуем и отправим к вам экспресс-доставкой. </div>
                </div>

                <img className='process-img' src={print} />
            </div>
        </div>

        <div className='results'>
            <div className='landing-label'>результат</div>
            <div className='results-title'>Вот такую книгу на 200-300 страниц вы получите через 4-7 дней после начала!</div>

            <div className='results-grid'>
                <img className='results-img' src={result1} />
                <img className='results-img' src={result2} />
                <img className='results-img' src={result3} />
                <img className='results-img' src={result4} />
                <img className='results-img' src={result5} />
                <img className='results-img' src={result6} />
            </div>
        </div>

        <div className='results'>
            <div className='landing-label'>отзывы</div>
            <div className='reviews-title'>Наши книги укрепляют отношения!</div>

            <div className='reviews-row'>
                <img className='review-img' src={review1} />
                <img className='review-img' src={review2} />
                <img className='review-img' src={review3} />
                <img className='review-img' src={review4} />
                <img className='review-img' src={review5} />
                <img className='review-img' src={review6} />
                <img className='review-img' src={review7} />
            </div>

            <div className='reviews-title'>Видео от получателей</div>

            <div className='reviews-row'>
                <Link to="https://vm.tiktok.com/ZMMxUDbva/"><img className='results-img' src={tiktok1} /></Link>
                <Link to="https://vm.tiktok.com/ZMMxsJC97/"><img className='results-img' src={tiktok2} /></Link>
                <Link to="https://www.instagram.com/reel/C5O1O5yLDvL/?igsh=azFubGE4Ym5sbTAw"><img className='results-img' src={tiktok3} /></Link>
                <Link to="https://www.instagram.com/reel/C51GG76Nju1/?igsh=MWo1cHJnM3l6M2s1bQ%3D%3D"><img className='results-img' src={tiktok4} /></Link>
            </div>
        </div>

        <div className='price'>
            <div className='landing-label'>сколько это стоит</div>
            <div className='reviews-title'>Текущая цена - 39.000тг</div>
            <div className='price-text'>В эту цену входит все - редактура, верстка, печать и упаковка. </div>
            <div className='price-text'>Можно предоплатой либо Kaspi рассрочкой 0-0-12. </div>
            <img src={kaspi} />
        </div>

        {/* <div className='faq'>
            <div className='landing-label'>ответы на частые вопросы</div>
            <div className='price-text'>В эту цену входит все - редактура, верстка, печать и упаковка. </div>
            <div className='price-text'>Можно предоплатой либо каспи рассрочкой 0-0-12. </div>
        </div> */}

        <div className='end'>
            <div className='end-title1'>😍✨</div>
            <div className='end-title2'>{currentRecipient}</div>
            <div className='hiro-column-button'>
                <button onClick={handleOrder} className='landing-button'>Заказать</button>
            </div>
        </div>
    </div>
  )
}

export default Landing;