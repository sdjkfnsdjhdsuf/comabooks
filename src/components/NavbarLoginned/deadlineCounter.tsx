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

  const editingDays = 5;
  const productionDays = 2;

  const deliveryDays = (() => {
    switch (deliveryAddress.toLowerCase()) {
      case "алматы": return 2;
      case "астана": return 3;
      case "караганда": return 4;
      case "павлодар": return 4;
      case "кокшетау": return 4;
      case "костанай": return 4;
      case "петропавловск": return 4;
      case "шымкент": return 3;
      case "тараз": return 3;
      case "бишкек": return 3;
      case "атырау": return 4;
      case "актау": return 5;
      case "уральск": return 5;
      case "актобе": return 5;
      case "кызылорда": return 3;
      case "семей": return 4;
      case "усть-каменогорск": return 4;
      case "экибастуз": return 4;
      case "жаркент": return 3;
      case "конаев": return 2;
      case "талгар": return 2;
      case "жезказган": return 3;
      case "талдыкорган": return 3;
      case "ташкент": return 3;
      case "москва": return 6;
      default: return 11;
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
      <span>
    Желательно было завершить книгу {Math.abs(remainingDays)} дней назад{' '}
    <span
      style={{ textDecoration: 'underline', cursor: 'pointer', display: 'inline' }}
      onClick={onLearnMoreClick}
    >
      Узнать больше
    </span>
  </span>
    );
  }
};
