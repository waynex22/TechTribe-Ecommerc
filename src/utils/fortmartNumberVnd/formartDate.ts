import moment from "moment";

export const formartDateYYYY_MM_DDTHH_MM = (date: Date | string) => {
  if (typeof date === 'string')
    date = new Date(date)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatShowDate = (dateString: Date | string) => {
  const formattedDate = moment(dateString).format('HH:mm DD/MM/YYYY');
  return formattedDate
}

export const formatShowDate_HH_MM = (dateString: Date) => {
  const formattedDate = moment(dateString).format('HH:mm');
  return formattedDate
}

export function formatTimeAgo(date: string | Date) {
  const now = new Date().getTime();
  const past = new Date(date).getTime();
  const timeDifference = now - past;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 30) {
    return `${days} ngày trước`;
  } else if (months < 12) {
    return `${months} tháng trước`;
  } else {
    return `${years} năm trước`;
  }
}

export function convertMillisecondsToTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const checkTimeInLast24Hours = (givenTime: string) => {
  // Thay đổi định dạng thời gian cho phù hợp với định dạng của bạn
  const now = new Date();
  const past24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // Thời gian cách đây 24 giờ

  const givenDate = new Date(givenTime); // Chuyển đổi thời gian cho trước thành đối tượng Date

  // Kiểm tra xem thời gian cho trước có nằm trong khoảng từ thời gian hiện tại trở về trước 24 giờ không
  return givenDate >= past24Hours && givenDate <= now;
};
