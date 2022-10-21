// @flow

export const getDateParts = (date: string) => {
    const month = date.substring(0, 2);
    const day = date.substring(2, 4);
    const year = date.substring(4, 8);
    const dateParts = [month, day, year];

    return dateParts;
};

export const getJoinedDate = (dateParts: Array<string>) => {
    const result = dateParts.length
        ? `${dateParts[1]}${dateParts[0]}${dateParts[2]}`
        : null;

    return result;
};

export const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date
        .getDate()
        .toString()
        .padStart(2, '0');

    return `${month}:${day}:${year}`;
};

export const createDate = (dateParts: Array<string>) => {
    const date = dateParts.length
        ? new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
        : new Date();

    return date;
};
