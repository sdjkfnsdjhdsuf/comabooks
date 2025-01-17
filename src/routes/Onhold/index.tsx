import React from 'react'
import './index.css'
import success from '../../assets/success.png'

function Onhold() {

    const handleSupport = () => {
        const message = `Здравствуйте! Я закончил(-а) содержание своей книги!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/77066322605?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className='onhold'>
        <img className='onhold-img' src={success} />
        <div className='onhold-title'>Ваша книга отправлена на редактуру!</div>
        <div className='onhold-text'>Наши редакторы усердно трудятся и проверяют содержание на грамматику и пунктуацию.</div>
        <div className='onhold-bold'>ОБЯЗАТЕЛЬНО СООБЩИТЕ РЕДАКТОРАМ О ЗАВЕРШЕНИИ КНИГИ</div>
        <button onClick={handleSupport} className='onhold-button'>Сообщить о завершении</button>
    </div>
  )
}

export default Onhold