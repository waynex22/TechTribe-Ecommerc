import moment from "moment";

export const formartDateYYYY_MM_DDTHH_MM = (date: Date) => {
    if(typeof date === 'string')
        date = new Date(date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatShowDate = (dateString: Date) =>{
    const formattedDate = moment(dateString).format('HH:mm DD/MM/YYYY');
    return formattedDate
}
