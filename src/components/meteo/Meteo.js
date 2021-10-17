import {useState, useEffect} from 'react';
import axios from 'axios';
import './Meteo.css';

import MeteoDay from './MeteoDay';
import Slider from './Slider';

function Meteo() {
    const [meteo, setMeteo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null);
    const [minTemp, setInputTemp] = useState(10);
    const [rainChance, setInputRain] = useState(0);
    
    const city = 'Paris';
    const key = '23e6a177430c319320a45c6676317398';
    const days = 7;
    const temp = 'metric'; //Celsius;
    const options = { weekday: 'short', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const meteoList = document.querySelector('#Meteo ul.meteoday-container');
    
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=${temp}&cnt=${days}&appid=${key}`)
        .then(
            (results) => {
                const daysList = results.data.list;
                daysList.forEach(date => {
                    let event =  new Date(1000 * date.dt); //create date object
                    const [weekday, day, month] = event.toLocaleDateString('fr-FR', options).split(' '); // format: jeu. 14 octobre
                    date.dateFrenchFormat = [weekday, day, month]
                });
                setIsLoaded(true);
                setMeteo(daysList);
            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        )
    }, []) //useEffect will run once with []

    const animationListener = (event) => {
        if(event.type === 'animationend') meteoList.classList.remove('fading'); //delete animation class 'fading'
        return;
    }


    const animateMeteo = (event) => {
        meteoList.addEventListener("animationstart", animationListener, false); //Adding event listener for animation start
        meteoList.addEventListener("animationend", animationListener, false); //Adding event listener for animation start

        meteoList.classList.add('fading'); //delete animation class 'fading'
        return;
    }
    
    if(error) return <div>{error.message}</div>
    if(!isLoaded) return <div id="loading">Loading ...</div>
    
    return(
        <div id='Meteo'>
            <h1>Weather forecast</h1>
            <p>Next {days} days</p>

            {error && (<div>{error.message}</div>)}
            {!isLoaded && (<div>Loading ...</div>)}

            <header>
                <Slider setInputValue={setInputTemp} animateMeteo={animateMeteo} title='Min temp' metric='°C' showValue={minTemp} inputValue={minTemp} inputMin='0' inputMax='50' inputStep='1' />
                <Slider setInputValue={setInputRain} animateMeteo={animateMeteo} title='Chances of rain' metric='%' showValue={Math.floor(rainChance*100)} inputValue={rainChance} inputMin='0' inputMax='1' inputStep='0.01' />
            </header>

            <ul className='meteoday-container'>
                {meteo && (
                    meteo.filter(day => day.temp.min >= minTemp && day.pop >= rainChance).map(item => (
                        <MeteoDay key={item.dt} data={item} />
                    ))
                )}
            </ul>
        </div>
    )
}

export default Meteo;