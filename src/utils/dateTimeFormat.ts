var date = new Date();
export const formatDate = () => {
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + "-" + date.getDate();
    return currentDate
}

export const formatTime = () => {
    var date = new Date();
    var hours = date.getHours();
    var minutes: string | number = date.getMinutes();

    // Check whether AM or PM
    var newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + newformat;
}