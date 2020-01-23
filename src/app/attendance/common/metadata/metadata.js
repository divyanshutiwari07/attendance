export const getTimeRange = () => {
    const timeRange = require('./time-range.json');
    return timeRange;
}

export const getSortOptions = () => {
    return [
        {name: 'Latest Time', id: 'inTime'},
        {name: 'Alphabetic Order', id: 'name'},
    ];
}
export const getManualFilterOptions = () => {
    return [
        { name: 'Manual', id: 'manual' },
        { name: 'Auto', id: 'auto' }
    ];
}
