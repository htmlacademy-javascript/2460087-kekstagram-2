// Преобразовывает часы в минуты
function convertToMinutes(timeString) {
  if (typeof timeString !== 'string' || !timeString.includes(':')) {
    console.error('Некорректное или отсутствующее время');
    return null;
  }

  const timeParts = timeString.split(':');

  const hours = timeParts[0].padStart(2, '0');
  const minutes = timeParts[1].padStart(2, '0');

  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);

  if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt >= 24 || minutesInt < 0 || minutesInt >= 60) {
    console.error('Некорректное время:', timeString);
    return null;
  }
  const conversionResult = hoursInt * 60 + minutesInt;

  return conversionResult;
}

function validateMeetingTime({ workdayStart, workdayEnd, meetingStartTime, meetingLengthMinutes }) {
  const timeStrings = [workdayStart, workdayEnd, meetingStartTime];
  const [workdayStartMinutes, workdayEndMinutes, meetingStartMinutes] = timeStrings.map(convertToMinutes);

  if (workdayStartMinutes === null || workdayEndMinutes === null || meetingStartMinutes === null) {
    console.error('Ошибка в формате времени');
    return false;
  }

  const meetingEndTime = meetingStartMinutes + meetingLengthMinutes;

  if (meetingStartMinutes >= workdayStartMinutes && meetingEndTime <= workdayEndMinutes) {
    return true;
  }
  return false;
}

const result = validateMeetingTime({
  workdayStart: '09:00',
  workdayEnd: '18:00',
  meetingStartTime: '09:00',
  meetingLengthMinutes: 400,
});
console.log(result);


