import React from 'react'
import './index.css'
import success from '../../assets/success.png'

function Onhold() {

    const handleSupport = () => {
        const message = `Hi! I’m done writing my book!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/77066322605?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className='onhold'>
        <img className='onhold-img' src={success} />
        <div className='onhold-title'>Your book has been sent for editing!</div>
        <div className='onhold-text'>Editing and printing take 5–7 business days. To open a chat with our editing team, click the button below.</div>
        <div className='onhold-bold'>An express editing and printing option is also available — 1–2 business days. Please check the cost with the manager.</div>
        <button onClick={handleSupport} className='onhold-button'>Notify when finished</button>
    </div>
  )
}

export default Onhold