import moment from "moment";

export const formartDateYYYY_MM_DDTHH_MM = (date: Date | string) => {
    if(typeof date === 'string')
        date = new Date(date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatShowDate = (dateString: Date| string) =>{
    const formattedDate = moment(dateString).format('HH:mm DD/MM/YYYY');
    return formattedDate
}

export const formatShowDate_HH_MM = (dateString: Date) =>{
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