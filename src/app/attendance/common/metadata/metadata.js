export const getTimeRange = () => {
    const timeRange = require('./time-range.json');
    return timeRange;
}

export const getSortOptions = () => {
    return [
        {name: 'Alphabetic Order', id: 'name'},
        {name: 'Latest Time', id: 'inTime'},
    ];
}
