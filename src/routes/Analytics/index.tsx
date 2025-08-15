import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Analytics: React.FC = () => {
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
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
      setStreet('');
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
      street: isAddressUnknown ? '' : street,
      phone,
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
      <div className='analytics-title'>Provide your order details</div>
      <form onSubmit={handleSubmit}>
        <div className='analytics-input'>
          <label htmlFor="deliveryDate">Delivery date</label>
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
            Can’t say for sure
          </label>
        </div>
        <div className='analytics-input'>
          <label htmlFor="city">Delivery City</label>
          <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Type your city"
                required
              />
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Type your street address"
                required={!isAddressUnknown}
                disabled={isAddressUnknown}
              />
          <label className='not-sure-checker'>
            <input
              type="checkbox"
              checked={isAddressUnknown}
              onChange={() => setIsAddressUnknown(!isAddressUnknown)}
            />
            Can’t say for sure
          </label>
        </div>
        <div className='analytics-input'>
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number.."
            required
          />
        </div>
        <button className='analytics-button' type="submit">Save</button>
      </form>
    </div>
  );
};

export default Analytics;
