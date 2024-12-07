import React from 'react';
import { format, parseISO } from 'date-fns';

const convertDateToString = (isoDate) => {
    const date = new Date(isoDate); // Parse ISO 8601 date string
    return date.toString(); // Convert to a readable string
};

export default convertDateToString;