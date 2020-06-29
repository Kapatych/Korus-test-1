function statement({customer, performance}) {
  if (!customer && !performance) return 'Некорректный счет';

  let result = `Счет для ${customer}\n`;
  let totalAmount = 0;
  let totalBonuses = 0;

  for (let {playId, audience, type} of performance) {
    let thisAmount = calculateAmount(type, audience) / 100;
    // Вывод строки счета
    result += ` ${playId}: ${formatAsRUB(thisAmount)} (${audience} мест)\n`;
    totalAmount += thisAmount;
    totalBonuses += calculateBonus(type, audience);
  }

  return result +=
    `Итого с вас ${formatAsRUB(totalAmount)}\n` +
    `Вы заработали ${totalBonuses} бонусов\n`;
}

function calculateAmount(type, audience) {
  let result = 0;

  switch (type) {
    case "tragedy":
      result = 40000;
      if (audience > 30) {
        result += 1000 * (audience - 30);
      }
      break;
    case "comedy":
      result = 30000 + 300 * audience;
      if (audience > 20) {
        result += 10000 + 500 * (audience - 20);
      }
      break;
    default:
      throw new Error(`Неизвестный тип: ${type}`);
  }

  return result;
}

function calculateBonus(type, audience) {
  let result = 0;
  result += Math.max(audience - 30, 0);

  // Дополнительный бонус за каждые 10 комедий
  if (type === "comedy") {
    result += Math.floor(audience / 5);
  }

  return result;
}

function formatAsRUB(num) {
  return new Intl.NumberFormat("ru-RU",
    {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 2
    }).format(num)
}
