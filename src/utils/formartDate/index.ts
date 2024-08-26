export const formatDate = (dateValue: string): string => {
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
};

export const formatDateAndTime = (dateValue: string): string => {
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}-${month}-${year} `;
}

export const formatDateAgo = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 30) {
        return `${daysDiff} ngày trước`;
    } else if (daysDiff < 365) {
        const monthsDiff = Math.floor(daysDiff / 30);
        return `${monthsDiff} tháng trước`;
    } else {
        const yearsDiff = Math.floor(daysDiff / 365);
        return `${yearsDiff} năm trước`;
    }
}