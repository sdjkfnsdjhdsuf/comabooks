import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Analytics: React.FC = () => {
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isOtherCity, setIsOtherCity] = useState<boolean>(false);
  const [isDateUnknown, setIsDateUnknown] = useState<boolean>(false);
  const [isAddressUnknown, setIsAddressUnknown] = useState<boolean>(false);
  const [minDate, setMinDate] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 6); // Add 5 days to today's date
    const minDateStr = today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    setMinDate(minDateStr);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    if (selectedCity === 'Другое') {
      setIsOtherCity(true);
      setAddress('');
    } else {
      setIsOtherCity(false);
      setAddress(selectedCity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const deliveryTime = isDateUnknown ? null : `${deliveryDate}T14:00:00`;
    const postData = {
      deliveryTime,
      address: isAddressUnknown ? '' : address,
      status: 'inProccess',
    };

    try {
      const response = await fetch('https://api.comabooks.org/user_anal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const data = await response.json();
      console.log('Success:', data);

      navigate('/forms');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='analytics-container'>
      <div className='analytics-title'>Укажите детали вашего заказа</div>
      <form onSubmit={handleSubmit}>
        <div className='analytics-input'>
          <label htmlFor="deliveryDate">Дата доставки</label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            min={minDate} // Set the min attribute dynamically
            disabled={isDateUnknown}
            required
          />
          <label className='not-sure-checker'>
            <input
              type="checkbox"
              checked={isDateUnknown}
              onChange={() => setIsDateUnknown(!isDateUnknown)}
            />
            Не могу сказать точно
          </label>
        </div>
        <div className='analytics-input'>
          <label htmlFor="city">Город доставки</label>
          <select id="city" onChange={handleCityChange} disabled={isAddressUnknown} required>
            <option value="">Выберите город</option>
            <option value="Алматы">Алматы</option>
            <option value="Астана">Астана</option>
            <option value="Шымкент">Шымкент</option>
            <option value="Бишкек">Бишкек</option>
            <option value="Другое">Другое</option>
          </select>
          {isOtherCity && !isAddressUnknown && (
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Введите город"
              required
            />
          )}
          <label className='not-sure-checker'>
            <input
              type="checkbox"
              checked={isAddressUnknown}
              onChange={() => setIsAddressUnknown(!isAddressUnknown)}
            />
            Не могу сказать точно
          </label>
        </div>
        <button className='analytics-button' type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default Analytics;
