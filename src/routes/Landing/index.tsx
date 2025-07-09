import React, { useEffect, useState } from 'react'
import './index.css'
import examplevideo from '../../assets/example1.mp4'
import previewbook1 from '../../assets/previewbook1.png'
import previewbook2 from '../../assets/previewbook2.png'
import previewbook3 from '../../assets/previewbook3.png'
import previewbook4 from '../../assets/previewbook4.png'
import previewbook5 from '../../assets/previewbook5.png'
import previewbook6 from '../../assets/previewbook6.png'
import tiktok1 from '../../assets/chinazes.png'
import tiktok2 from '../../assets/chakieva.png'
import tiktok3 from '../../assets/colorit.png'
import tiktok4 from '../../assets/tsoy.png'
import tiktok5 from '../../assets/mom.png'
import tiktok6 from '../../assets/mom2.png'
import previewbg from '../../assets/newlandingmobilebg.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import { globalPhoneNumber } from 'components/NavbarLoginned'

function Landing() {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentWord, setCurrentWord] = useState('девушке');
    const [recipient, setRecipient] = useState('Девушке');
    const [bookTitle, setBookTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [answer, setAnswer] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [coverImage, setCoverImage] = useState(previewbook1);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNav = () => setIsNavVisible(!isNavVisible);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth > 900) {
    //             navigate('/');
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);

    //     // Initial check
    //     handleResize();

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [navigate]);
    
    const words = [
        'девушке', 'парню', 'жене', 'мужу', 'маме', 'папе', 
        'родителям', 'брату', 'сестре', 'друзьям', 'коллеге'
    ];

    const recipients = [
        'Девушке', 'Парню', 'Жене', 'Мужу', 'Маме', 'Папе', 
        'Родителям', 'Другу', 'Подруге', 'Коллеге', 'Cебе'
    ];

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWord(prevWord => {
                const currentIndex = words.indexOf(prevWord);
                const nextIndex = (currentIndex + 1) % words.length;
                return words[nextIndex];
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleRecipientChange = (recipient: string) => {
        setRecipient(recipient);
    };

    const handleBookTitleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setBookTitle(e.target.value);
    };

    const handleAuthorNameChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setAuthorName(e.target.value);
    };

    const handleAnswerChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setAnswer(e.target.value);
    };

    const getQuestionBasedOnRecipient = (recipient: any) => {
        // Here you can customize the question based on the recipient
        switch (recipient) {
            case 'Девушке':
                return 'Расскажите о моменте, подтверждающем, как идеально вы подходите друг другу.';
            case 'Парню':
                return 'Что в нем вызывает у вас улыбку?';
            case 'Жене':
                return 'Какие моменты с вашей женой вы запомнили на всю жизнь?';
            case 'Мужу':
                return 'Опишите свое первое свидание. Оно прошло как вы планировали?';
                case 'Маме':
                return 'Слово "мама", всего 4 буквы. Но что они значат для вас?';
                case 'Папе':
                return 'Папа: Слово "папа", всего 4 буквы. Но что они значат для вас?';
                case 'Родителям':
                return 'Если бы вы могли изменить что-то в ваших взаимоотношениях, то что бы вы изменили?';
                case 'Сестре':
                return 'Опишите момент из детства с сестрой, который до сих пор вызывает у вас улыбку?';
                case 'Брату':
                return 'Опишите момент из детства с братом, который до сих пор вызывает у вас улыбку?';
                case 'Подруге':
                return 'Какое событие в вашей дружбе вы бы хотели пережить заново и почему?';
                case 'Другу':
                return 'Какое событие в вашей дружбе вы бы хотели пережить заново и почему?';
                case 'Коллеге':
                return 'Расскажите о моменте, в котором ваш коллега показал креативный подход к решению проблемы.';
                case 'Cебе':
                return 'Какие три слова лучше всего описывают вашу жизнь на данный момент?';
            default:
                return 'Представьтесь: как вас зовут, кому и почему вы решили посвятить книгу?';
        }
    };

    const handleCoverChange = (e: { target: { value: string } }) => {
        const selectedCover = e.target.value;
        switch (selectedCover) {
            case 'Бело-голубой':
                setCoverImage(previewbook1);
                break;
            case 'Белый':
                setCoverImage(previewbook2);
                break;
            case 'Черный':
                setCoverImage(previewbook3);
                break;
            case 'Красный':
                setCoverImage(previewbook4);
                break;
            case 'Зеленый':
                setCoverImage(previewbook5);
                break;
            case 'Ярко-зеленый':
                setCoverImage(previewbook6);
                break;
            default:
                setCoverImage(previewbook1);
        }
    };

    const handleDateChange = (e: { target: { value: string } }) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{2})/, '$1.$2.');
        }
        setDate(value);
    };

    const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setDescription(e.target.value);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPhoto(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOrder = () => {
        const message = `Здравствуйте! Я по поводу книги, можете проконсультировать ?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${globalPhoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };
  
    
    
    
  return (
    <div className='landing-new-page'>
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

        <div className='landing-new-first'>
            <div className='landing-new-first-title'>Посвяти книгу {currentWord}</div>
            <div className='landing-new-first-text'>С помощью нашего издательства вы сможете написать собственную книгу своим любимым</div>
            <button className='landing-new-first-order' onClick={handleOrder}>Заказать</button>
        </div>

        <div className='landing-new-video'>
            <video className='video-book' src={examplevideo} loop autoPlay muted playsInline/>
            <div className='landing-new-video-title'>Персональная книга</div>
            <div className='landing-new-video-text'>Почувствуй себя в роли автора и порадуй близких!</div>
            <button className='landing-new-video-order' onClick={handleOrder}>Заказать</button>
        </div>

        <div className='landing-new-show'>
    <div className='ui-title'>Наши книги идут в формате интервью</div>
    <div className='ui-text'>Сперва нужно зайти в личный кабинет и выбрать своего получателя.</div>

    <div className='ui1'>
                <div className='ui1-info'>
                    <label className="ui-label">Выберите получателя</label>
                    <div className="ui-recipient-list">
                        {recipients.map((item: any) => (
                            <button 
                                key={item} 
                                className={`ui-recipient-item ${recipient === item ? 'selected' : ''}`} 
                                onClick={() => handleRecipientChange(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
    </div>

    <div className='landing-new-show'>
            <div className='ui-title'>Начнем с обложки вашей будущей книги</div>
            <div className='ui-text'>Более десяти разных дизайнов, возможность вписать название книги и указать автора.</div>

            <div className='ui1'>
        <div className='ui1-info'>
        <label className="ui-label">Предпросмотр</label>
        <div className='ui-preview'>
                <div className='ui-preview-itself cover'>
                    <div className='ui-preview-info cover'>
                        <div className='ui-preview-info cover-n'>{bookTitle || 'Любимой'}</div>
                        <div className='ui-preview-info cover-a'>{authorName || 'Ануар Алиаскаров'}</div>
                    </div>

                    <img className='ui-preview-itself-cover' src={coverImage} />
                </div>
        </div>
        <label className="ui-label">Название книги</label>
        <input type="text" placeholder="Введите название" className="ui-input" value={bookTitle} onChange={handleBookTitleChange}/>

        <label className="ui-label">Имя автора</label>
        <input placeholder="Введите имя" className="ui-input" value={authorName} onChange={handleAuthorNameChange}/>

        <label className="ui-label">Дизайн</label>
        <div className="ui-dropdown">
            <select className="ui-select" onChange={handleCoverChange}>
                <option value="Бело-голубой">Бело-голубой</option>
                <option value="Белый">Белый</option>
                <option value="Черный">Черная</option>
                <option value="Красный">Красный</option>
                <option value="Зеленый">Зеленый</option>
                <option value="Ярко-зеленый">Ярко-зеленый</option>
            </select>
        </div>
        </div>
    </div>
    </div>


        <div className='landing-new-show'>
            <div className='ui-title'>В кабинете нужно ответить на вопросы</div>
            <div className='ui-text'>Вопросов около 200, но на все отвечать необязательно, главное заполнить 150-200 страниц.</div>

            <div className='ui2'>
        <div className='ui2-info'>

        <div className='ui2-top'>
            <label className="ui-label">Предпросмотр</label>
             <div className='ui-preview'>
                <div className='ui-preview-itself answer'>
                    <div className='ui-preview-info answer'>
                        <div className='ui-preview-info answer q'>{getQuestionBasedOnRecipient(recipient) || 'Представьтесь: как вас зовут, кому и почему вы решили посвятить книгу?'}</div>
                        <div className='ui-preview-info answer a'>{answer || ''}</div>
                    </div>
                    <div className='ui-preview-footer answer'>
                        <div>{bookTitle || 'Любимая'}</div>
                        <div>24</div>
                    </div>
                </div>
            </div>
            <label className="ui-label">Вопрос 14</label>
            <div className='ui-question'>{getQuestionBasedOnRecipient(recipient) || 'Представьтесь: как вас зовут, кому и почему вы решили посвятить книгу?'}</div>
        </div>

        <div className='ui2-bottom'>
            <label className="ui-label2">Ответ</label>
            <textarea placeholder="Введите сюда ответ" className="ui-textarea" value={answer} onChange={handleAnswerChange}/>
        </div>

        </div>
    </div>
        </div>

        <div className='landing-new-show'>
            <div className='ui-title'>Также можно добавлять фотографии</div>
            <div className='ui-text'>Сохраните общие воспоминания, в виде фото, даты и описания.</div>

            <div className='ui1'>
        <div className='ui1-info'>
        <label className="ui-label">Предпросмотр</label>
        <div className='ui-preview'>
                <div className='ui-preview-itself photo' style={{ backgroundImage: photo ? `url(${photo})` : `url(${previewbg})` }}>
                    <div className='ui-preview-info photo'>
                        <div className='ui-preview-info photo d'>{date || '12.12.2024'}</div>
                        <div className='ui-preview-info photo d2'>{description || 'В библиотеке'}</div>
                    </div>
                    <div className='ui-preview-footer photo'>
                        <div>25</div>
                        <div>{authorName || 'Любимая'}</div>
                    </div>
                </div>
        </div>
        <label className="ui-label">Дата</label>
        <input type="text" placeholder="Введите дату" className="ui-input" value={date} onChange={handleDateChange}/>

        <label className="ui-label">Описание</label>
        <textarea placeholder="Введите описание" className="ui-textarea-photo" value={description} onChange={handleDescriptionChange}/>

        <label className="ui-label">Фото</label>
        <label htmlFor='fakeupload' className='ui-upload'>Добавить фото</label>
        <input type="file" id='fakeupload' style={{display: 'none'}} onChange={handlePhotoChange} />
        </div>
    </div>
        </div>

        <div className='landing-new-show'>
            <div className='r-title'>Отзывы наших клиентов</div>
            <div className='r-text'>Со всеми отзывами можно ознакомиться в наших соц.сетях</div>
            <div className='landing-new-tiktoks'>
                <Link to='https://www.instagram.com/reel/C8ysJ4gN9Im/?igsh=MWtuemx3YmVrcW1vZQ==' className='landing-new-tiktok'><img src={tiktok4}/></Link>
                <Link to='https://vm.tiktok.com/ZMr86BLJb/' className='landing-new-tiktok'><img src={tiktok2}/></Link>
                <Link to='https://www.instagram.com/reel/C8UaVEXC95t/?igsh=ejV0djJiMHV3Y2t3' className='landing-new-tiktok'><img src={tiktok3}/></Link>
                <Link to='https://www.instagram.com/reel/C8CS1heN8if/?igsh=MTVya3FwbjN4OHQ2cQ==' className='landing-new-tiktok'><img src={tiktok1}/></Link>
                <Link to='https://www.instagram.com/reel/C9PpvKMtC7s/?igsh=MXFyMmIxeWhuYThzcw==' className='landing-new-tiktok'><img src={tiktok5}/></Link>
                <Link to='https://www.instagram.com/reel/C-2q048srVd/?igsh=MXFrcHZhNDljdXNpeg==' className='landing-new-tiktok'><img src={tiktok6}/></Link>
            </div>
            <div className='landing-new-reviews'>
                <div className='landing-new-review'>Я не ожидала такого качества, оформления. Я в шоке. Получилось лучше, чем ожидала. Кто придумал эту идею с книгой - гений 🥹😍😍</div>
                <div className='landing-new-review'>Это лучшее, что я дарил. Подарок очень понравился, спасибо вам большое</div>
                <div className='landing-new-review'>Благодарю вас! Жена была поражена. Удивилась, и даже немного всплакнула.</div>
                <div className='landing-new-review'>Добрый вечер! Подруга переполнена эмоциями, не может поверить, что ей посвятили книгу о нашей дружбе. Говорит вообще не ожидала.</div>
                <div className='landing-new-review'>Книгу передали. Благодарю за вашу работу, сестре очень понравилось. Желаю дальнейших вам успехов!</div>
                <div className='landing-new-review'>Извините, что поздно пишу - просто хотела сказать искренне спасибо! Такой душевный подарок подарила маме.</div>
                <div className='landing-new-review'>Благодарю за такую возможность подарить эмоции близкому человеку, это действительно круто. Книга сделана очень классно, это так продуманно! Нашей подруге все понравилось, остались воспоминания на всю жизнь!</div>
            </div>
            <Link className='landing-new-review-instagram' to='https://www.instagram.com/stories/highlights/18005192363276565/'>Больше отзывов в Instagram <InstagramIcon/></Link>
        </div>

        {/* <div className='landing-new-show'>
            <div className='q-title'>Остались вопросы?</div>
            <div className='qa-answer'>Весь процесс занимает 5-7 дней </div>
            <div className='qa-answer'>Доставка по Алматы день в день. По другим городам Казахстана 1-2 дня. По другим странам 1-5 дней</div>
            <div className='qa-answer'>Если у вас есть свои идеи, мы готовы воплотить их в реальность!</div>
            <div className='qa-answer'>Можно писать на трех языках: казахском, русском и английском</div>
        </div> */}

        <div className='landing-new-footer'>
            <div className='footer-preview'>
                <div className='footer-preview-info'>
                        <div className='footer-preview-info-b'>{bookTitle || 'Любимой'}</div>
                        <div className='footer-preview-info-a'>{authorName || 'Ануар Алиаскаров'}</div>
                </div>
                
                <img className='footer-book' src={coverImage}/>
            </div>
            
            <div className='landing-new-footer-title'>Сделай подарок, который запомнится на века</div>
            <button className='landing-new-footer-order' onClick={handleOrder}>Заказать</button>
        </div>
    </div>
  )
}

export default Landing