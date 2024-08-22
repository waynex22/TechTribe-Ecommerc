
export const validateTimeStart_End = (timeStart: string | Date, timeEnd?: string | Date) => {
    const error :{start_time?:string, end_time?: string} = {}
    const nowDate = new Date();

    const selectedStartTime = new Date(timeStart);
    if (selectedStartTime < nowDate) {
        error.start_time = 'Thời gian bắt đầu không được muộn hơn thời gian hiện tại.'
    }
    if(timeEnd) {
        const selectedEndTime = new Date(timeEnd);

        const oneHourLater = new Date(selectedStartTime.getTime() + 60 * 60 * 1000);
        const maxEndTime = new Date(selectedStartTime.getTime() + 180 * 24 * 60 * 60 * 1000);
        if (selectedEndTime < oneHourLater) {
            error.end_time = 'Chương trình phải kéo dài ít nhất 1h kể từ khi bắt đầu.'
        }
        if (selectedEndTime > maxEndTime) {
            error.end_time = 'Chương trình kéo dài không được quá 180 ngày.'
        }
    }
    return error
}