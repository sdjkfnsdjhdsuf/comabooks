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
        <div className='onhold-text'>Редактура и печать занимают 5–7 рабочих дней. Чтобы открыть чат с отделом редактуры, нажмите на кнопку ниже.</div>
        <div className='onhold-bold'>Также доступна ускоренная редактура и экспресс-печать. Срок: 1–2 рабочих дня, по стоимости просьба уточнить у менеджера.</div>
        <button onClick={handleSupport} className='onhold-button'>Сообщить о завершении</button>
    </div>
  )
}

export default Onhold