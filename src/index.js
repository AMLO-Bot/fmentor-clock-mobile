import {getDayNumber, getWeek, splitInSentences} from './logic/utils.js'
import { fetchClientLocation, fetchQuote } from './logic/requests.js';

const d = document,
 $quote = d.getElementById('quote');

const fillQuote = () => {
  fetchQuote().then(quote => {
    $quote.querySelector('.quote-text').innerHTML = `"${splitInSentences(quote.text)}"` || '"You are your Home"'
    $quote.querySelector('.quote-author').innerHTML = quote.author || '-A wise person'
  })
}

const startClock = () => {
  const $clockCont = d.querySelector('.clock-cont'),
    $sun = $clockCont.querySelector('.sun'),
    $moon = $clockCont.querySelector('.moon'),
    $clockCountry = d.querySelector('.clock-location .country'),
    $clockCity = d.querySelector('.clock-location .city'),
    $greeting = $clockCont.querySelector('.clock-greeting span'),
    $display = $clockCont.querySelector('.time-display');

  fetchClientLocation().then(location => {
    $clockCity.innerHTML = location.city
    $clockCountry.innerHTML = location.country_code2 || location.country_code3
  })
  
  const tiktak = setInterval(() => {
    const time = new Date(),
      hours = time.getHours(), //24 hours format
      mins = time.getMinutes();

    if(hours > 12){
      $sun.classList.add('none')
      $moon.classList.remove('none')
    }else{
      $sun.classList.remove('none')
      $moon.classList.add('none')
    };

    $greeting.innerHTML = hours > 12 ? 'EVENING' : 'MORNING'
    $display.innerHTML = `${hours > 9 ? hours : '0'+hours}:${mins > 9 ? mins : '0'+mins}`
  }
    ,1000
  )

  fillDayCounter()
}

const fillDayCounter = () => {
  const today = new Date(),
    $dayCounter = d.getElementById('daycounter'),
    $tz = $dayCounter.querySelector('.counter-tz .value'),
    $dayweek = $dayCounter.querySelector('.counter-dayweek .value'),
    $dayyear = $dayCounter.querySelector('.counter-dayyear .value'),
    $week = $dayCounter.querySelector('.counter-week .value');

    const localeTz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    $tz.innerHTML = localeTz
    $week.innerHTML = getWeek(today)
    $dayyear.innerHTML = getDayNumber(today)
    $dayweek.innerHTML = today.getDay()

}


d.addEventListener('DOMContentLoaded', (ev) => {
  const app = d.getElementById('app')
  app.scrollIntoView()

  fillQuote()
  startClock()
  fillDayCounter()
})

d.addEventListener('click', (ev) => {
  if(ev.target.matches('.quote-reload')){
    fillQuote()
  }

  if(ev.target.matches('.more, .more *')){
    const action = d.querySelector('.btn p'),
     icon = d.querySelector('.btn .icon')
    if(action.textContent === 'LESS'){
      action.textContent = 'MORE'
      icon.classList.remove('rot180')
      d.getElementById('app').scrollIntoView()
    }else{
      d.getElementById('mid').scrollIntoView()
      icon.classList.add('rot180')
      action.textContent = 'LESS'
    }
  }
})