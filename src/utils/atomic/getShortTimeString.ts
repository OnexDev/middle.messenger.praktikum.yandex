export default (data: string, options: { hours: boolean, minutes: boolean, seconds: boolean} = {
  hours: true, minutes: true, seconds: false,
}): string => {
  if (!data) {
    return '';
  }
  const { hours, minutes, seconds } = options;
  const date = new Date(data);
  if (date.toJSON().slice(0, 10) !== new Date().toJSON().slice(0, 10)) {
    // TODO: if date older than one week
    const weekday = ['Сб', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Вс'];
    return weekday[date.getDay()];
  }

  const parts = [];
  if (hours) {
    parts.push(date.getHours());
  }
  if (minutes) {
    parts.push(date.getMinutes());
  }
  if (seconds) {
    parts.push(date.getSeconds());
  }
  return parts.map((x) => (x < 10 ? `0${x}` : x)).join(':');
};
