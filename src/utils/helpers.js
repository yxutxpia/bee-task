export function randomID() {
  return Math.floor(Math.random() * 100_000_000);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    day: 'numeric',
    month: 'numeric',
  }).format(new Date(dateStr));
}

export function formatDaysLeft(date, type = 'date') {
  if (!date) return;

  const newDate = new Date(date).setHours(0, 0, 0, 0);
  const daysLeft =
    Math.round(newDate - new Date().setHours(0, 0, 0, 0)) /
    (1000 * 60 * 60 * 24);

  if (type === 'count') return daysLeft;

  if (type === 'd-day') {
    if (daysLeft < 0) return `D+${Math.abs(daysLeft)}`;
    if (daysLeft === 0) return 'D-Day';
    if (daysLeft > 0) return `D-${daysLeft}`;
  }

  if (type === 'date') {
    if (daysLeft === -1) return 'Yesterday';
    if (daysLeft < 0) return `${Math.abs(daysLeft)} days ago`;
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days left`;
  }
}

export function formatMsgDays(date, type = 'en') {
  if (!date) return;

  const newDate = new Date(date).setHours(0, 0, 0, 0);
  const daysPassed =
    Math.round(newDate - new Date().setHours(0, 0, 0, 0)) /
    (1000 * 60 * 60 * 24);

  if (type === 'kor') {
    if (daysPassed === 0) return '오늘';
    if (daysPassed === -1) return '어제';
    if (daysPassed < 0) return `${Math.abs(daysPassed)}일 전`;
  }

  if (type === 'en') {
    if (daysPassed === 0) return 'Today';
    if (daysPassed === -1) return 'Yesterday';
    if (daysPassed === -2) return `${Math.abs(daysPassed)} day ago`;
    if (daysPassed < 0) return `${Math.abs(daysPassed)} days ago`;
  }
}
