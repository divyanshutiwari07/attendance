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
    return  new Date(date).setHours(0, 0, 0, 0);
}
export function getEndTimeStampOfGivenDate(date) {
    return  new Date(date).setHours(23, 59, 59, 999);
}

export function getCurrentTimeStampOfGivenDate(date) {
    return new Date().getTime();
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
    console.log('getformateed date for home')
    let formattedDate = new Date(date);
    const dd = String(formattedDate.getDate()).padStart(2, '0');
    const mm = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const yyyy = formattedDate.getFullYear();
    formattedDate = dd + '-' + mm + '-' + yyyy;
    // console.log(formattedDate);
    return formattedDate;
}

export function getFormattedTime(date) {
    let formattedTime = new Date(date);
    let hours = formattedTime.getHours();
    let minutes = formattedTime.getMinutes();
    let second = formattedTime.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ':' + second + ' ' + ampm;
    return strTime;
}

export function getFirstLaterOfWordCapital(str) {
    return str.replace(/\b\w/, v => v.toUpperCase());
}

export function getTimeDifferenceBetweenTwoTimestamps(date1,date2) {
    var difference = new Date (date2).getTime() - new Date (date1).getTime();
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

   var hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    var minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);

    return { 'timeDuration': difference , 'totalHoursEmpPresentToday' : (hoursDifference + ':' + minutesDifference + ':' +  secondsDifference) } ;
    // return (minutesDifference); 
}

export function getTimeFromMilliseconds(time) {
    console.log('time in 124', time);
    // var dateFromMillisec = new Date(time);
    // return dateFromMillisec.getHours() + ":" + dateFromMillisec.getMinutes() + ":" + dateFromMillisec.getSeconds();
    var hours = Math.floor((time / (3600 * 1000)) % 60);
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / (60 * 1000)) % 60);

    return (hours + "" + minutes + ":" + seconds);
}


