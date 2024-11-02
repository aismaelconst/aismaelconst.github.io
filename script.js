const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

console.log(day, month, year);

const dateString = `${day}-${month}-${year}`;


const dateFromUrl = window.location.search.substring(1);

const dateFromUrlArray = dateFromUrl.split('-').map(Number);

const DAY = dateFromUrlArray[0] ? dateFromUrlArray[0] : day;

const THE_DAY = dateFromUrlArray[0] ? new Date(dateFromUrlArray[2], dateFromUrlArray[1] - 1, dateFromUrlArray[0]) : today;

function getMonthString(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month - 1];
}

function getDayOfWeek(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

async function getTimings() {
    const response = await fetch('timetable.csv');
    const text = await response.text();
    const rows = text.split('\n');
    const toJson = rows.map(row => row.split(','));
    
    const jummaInfo = toJson.find(row => row[0].includes('Khutba'))[0];
    console.log(jummaInfo);

    const jummaInfoElement = document.getElementById('jumma-salaat-info');
    jummaInfoElement.innerText = jummaInfo;

    const todayTimings = toJson.find(row => parseInt(row[0]) === DAY);
    console.log(todayTimings);

    const fajrBegins = todayTimings[2];
    const fajrIqamah = todayTimings[3];

    const fajrBeginsElement = document.getElementById('fajr-begins');
    fajrBeginsElement.innerText = fajrBegins;

    const fajrIqamahElement = document.getElementById('fajr-iqamah');
    fajrIqamahElement.innerText = fajrIqamah;

    const sunrise = todayTimings[4];

    console.log(sunrise);
    const sunriseElement = document.getElementById('sunrise');
    sunriseElement.innerText = sunrise;

    const zohrBegins = todayTimings[5];
    const zohrBeginsElement = document.getElementById('zohr-begins');
    zohrBeginsElement.innerText = zohrBegins;

    const zohrIqamah = todayTimings[6];
    const zohrIqamahElement = document.getElementById('zohr-iqamah');
    zohrIqamahElement.innerText = zohrIqamah;

    const assrBegins = todayTimings[7];
    const assrBeginsElement = document.getElementById('asr-begins');
    assrBeginsElement.innerText = assrBegins;

    const assrIqamah = todayTimings[8];
    const assrIqamahElement = document.getElementById('asr-iqamah');
    assrIqamahElement.innerText = assrIqamah;

    const maghribBegins = todayTimings[9];
    const maghribBeginsElement = document.getElementById('maghrib-begins');
    maghribBeginsElement.innerText = maghribBegins;

    const maghribIqamah = todayTimings[10];
    const maghribIqamahElement = document.getElementById('maghrib-iqamah');
    maghribIqamahElement.innerText = maghribIqamah;

    const eishaBegins = todayTimings[11];
    const eishaBeginsElement = document.getElementById('isha-begins');
    eishaBeginsElement.innerText = eishaBegins;

    const eishaIqamah = todayTimings[12];
    const eishaIqamahElement = document.getElementById('isha-iqamah');
    eishaIqamahElement.innerText = eishaIqamah;

    

    const todayElement = document.getElementById('today');
    todayElement.innerText = DAY + ' ' + getMonthString(month) + ' ' + year;

    const dayOfWeekElement = document.getElementById('day-of-week');
    dayOfWeekElement.innerText = getDayOfWeek(THE_DAY);

    const islamicMonthData = rows.find(x => x.includes`islamic_month_current`)

    const islamicMonthDataAsJson = JSON.parse(islamicMonthData)

    const {islamic_month_current, islamic_month_next, islamic_month_transition_day} = islamicMonthDataAsJson

    const islamicDate = parseInt(todayTimings[13]);
    const islamicDateElement = document.getElementById('islamic-date');
    const whichIslamicMonth = (DAY >= islamic_month_transition_day) ? islamic_month_next : islamic_month_current;
    islamicDateElement.innerText = islamicDate + '-' + whichIslamicMonth

    console.log(islamicMonthDataAsJson)
}

getTimings();




const timeElement = document.getElementById("clock");

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the string with leading zeroes
    const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (clockStr === '00:00:00') {
        window.location.reload()
    }

    timeElement.innerText = clockStr;
}

updateTime();
setInterval(updateTime, 1000);