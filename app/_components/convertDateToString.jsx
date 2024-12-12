import { format, parseISO } from 'date-fns';

// Function to convert ISO date string to a formatted date string
const convertDateToString = (isoDate, formatter) => {
    const date = parseISO(isoDate); // Parse the ISO 8601 date string into a Date object
    return format(date, formatter); // Format the date using the provided format
};

export default convertDateToString;
