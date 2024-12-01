
export const calculateNewDeadline = (
    deliveryDate: Date,
    deliveryAddress: string
  ): boolean => {
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
        case 'караганда': return 2;
        case 'павлодар': return 2;
        case 'кокшетау': return 3;
        case 'костанай': return 3;
        case 'петропавловск': return 3;
        case 'шымкент': return 2;
        case 'тараз': return 2;
        case 'бишкек': return 2;
        case 'атырау': return 3;
        case 'актау': return 4;
        case 'уральск': return 4;
        case 'актобе': return 4;
        case 'кызылорда': return 2;
        case 'семей': return 3;
        case 'усть-каменогорск': return 3;
        case 'экибастуз': return 3;
        case 'жаркент': return 2;
        case 'конаев': return 1;
        case 'талгар': return 1;
        case 'жезказган': return 2;
        case 'талдыкорган': return 2;
        case 'ташкент': return 2;
        case 'москва': return 5;
        default: return 10;
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
    console.log(remainingDays)
    if (remainingDays >= 1) {
        return true;
    } else {
        return false;
    }
  };