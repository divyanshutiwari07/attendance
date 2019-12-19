export function getDateObjectsInMonth(month, year) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export function getMonthNumber(monthName) {
    const monthNumber = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(monthName) / 3) + 1;
    return String('0' + monthNumber).slice(-2);
}

export function padStart(str, pad, length) {
    return String(pad + str).slice(length * -1);
}

export function getMonthName(monthNumber) {
    const date = new Date(1970, parseInt(monthNumber) - 1, 1);  // 2009-11-10
    return date.toLocaleString('default', { month: 'short' });
}

export function getDayCountInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

export function getFormattedCSVdata(data, mapTo) {
    const formattedData = [];
    data.forEach(employee => {
        const row = {};
        for(const key in mapTo) {
            row[ mapTo[key] ] = employee[key];
        }
        formattedData.push(row);
    });
    return formattedData;
}

export function getStartTimeStampOfYear(year) {
    return (new Date(year, 0, 1 )).setHours(0, 0, 0, 0);
}
export function getEndTimeStampOfYear(year) {
    return (new Date(year, 11, 31)).setHours(23, 59, 59, 999);
}

export function getStartTimeStampOfGivenDate(date) {
    return this.startTime = new Date(date).setHours(0, 0, 0, 0);
}
export function getEndTimeStampOfGivenDate(date) {
    return this.endTime = new Date(date).setHours(23, 59, 59, 999);
}

export function getRandomColor() {
    const randomColorPlugin = {
      beforeUpdate(chart) {
          const backgroundColor = [];
          const borderColor = [];
          for (let i = 0; i < chart.config.data.datasets[0].data.length; i++) {
            const color = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',';
              backgroundColor.push(color + '.6)');
            //   borderColor.push(color + '5)');
            borderColor.push('rgba(0,0,0,0.5)');
            //   borderColor: 'rgba(0,0,0,1)',
          }
          chart.config.data.datasets[0].backgroundColor = backgroundColor;
          chart.config.data.datasets[0].borderColor = borderColor;
      }
    };
    return randomColorPlugin;
}

export function getFormattedDate(date) {
    
    let formattedDate = new Date(date);
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const yyyy = formattedDate.getFullYear();
    formattedDate = mm + '-' + dd + '-' + yyyy;
    // console.log(formattedDate);
    return formattedDate;
}

