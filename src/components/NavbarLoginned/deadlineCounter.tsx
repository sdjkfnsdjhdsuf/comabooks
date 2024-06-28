import React from 'react';

export const calculateDeadline = (
  deliveryDate: Date,
  deliveryAddress: string,
  onLearnMoreClick: () => void
): JSX.Element => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const timeDiff = deliveryDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const editingDays = 2;
  const productionDays = 2;

  const deliveryDays = (() => {
    switch (deliveryAddress.toLowerCase()) {
      case 'алматы': return 1;
      case 'астана': return 2;
      case 'бишкек': return 2;
      case 'шымкент': return 2;
      case 'актобе': return 3;
      default: return 3;
    }
  })();

  const deliveryStartDate = new Date(deliveryDate);
  deliveryStartDate.setDate(deliveryDate.getDate() - deliveryDays);
  const dayBeforeDelivery1 = new Date(deliveryStartDate);
  const dayBeforeDelivery2 = new Date(deliveryStartDate);
  dayBeforeDelivery1.setDate(deliveryStartDate.getDate() - 1);
  dayBeforeDelivery2.setDate(deliveryStartDate.getDate());

  let adjustedProductionDays = productionDays;
  if (dayBeforeDelivery1.getDay() === 6 && dayBeforeDelivery2.getDay() === 0) {
    adjustedProductionDays += 2;
  } else if(dayBeforeDelivery2.getDay() === 6 && dayBeforeDelivery1.getDay() !== 0) {
    adjustedProductionDays += 1;
  } else if(dayBeforeDelivery1.getDay() === 0 && dayBeforeDelivery2.getDay() !== 6) {
    adjustedProductionDays += 2;
  }

  const remainingDays = daysLeft - editingDays - adjustedProductionDays - deliveryDays - 1;

  if (remainingDays === 0) {
    return <span>Желательно завершить книгу сегодня</span>;
  } else if (remainingDays === 1) {
    return <span>Желательно завершить книгу завтра</span>;
  } else if (remainingDays === 2) {
    return <span>Желательно завершить книгу послезавтра</span>;
  } else if (remainingDays > 2) {
    return <span>Желательно завершить книгу за {remainingDays} д.</span>;
  } else {
    return (
      <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        Желательно было завершить книгу {Math.abs(remainingDays)} дней назад{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onLearnMoreClick}
        >
          Узнать больше
        </span>
      </span>
    );
  }
};
