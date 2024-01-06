const startTime = "10:00 AM";
const timeArray = Array.from({ length: 24 }, (_, index) => {
  const currentHour = (parseInt(startTime.split(':')[0]) + index) % 12 || 12;
  const period = index < 12 ? 'AM' : 'PM';
  return `${currentHour.toString().padStart(2, '0')}:00 ${period}`;
});

export default timeArray;