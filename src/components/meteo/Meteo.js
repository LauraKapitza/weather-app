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
    
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=${temp}&cnt=${days}&appid=${key}`)
        .then(
            (results) => {
                const daysList = results.data.list;
                daysList.forEach(day => {
                    let event =  new Date(1000 * day.dt); //create date object
                    let date = event.toLocaleDateString('fr-FR', options); // format: jeu. 14 octobre
                    day.dateFrenchFormat = date;
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
    
    if(error) return <div>{error.message}</div>
    if(!isLoaded) return <div>Loading ...</div>
    
    return(
        <div id='Meteo'>
            <h1>Weather forecast</h1>
            <p>Next {days} days</p>

            {error && (<div>{error.message}</div>)}
            {!isLoaded && (<div>Loading ...</div>)}

            <header>
                <Slider setInputValue={setInputTemp} title='Min temp' metric='°C' showValue={minTemp} inputValue={minTemp} inputMin='0' inputMax='50' inputStep='1' />
                <Slider setInputValue={setInputRain} title='Chances of rain' metric='%' showValue={Math.floor(rainChance*100)} inputValue={rainChance} inputMin='0' inputMax='1' inputStep='0.01' />
            </header>

            <main>
                {meteo && (
                    meteo.filter(day => day.temp.min >= minTemp && day.pop >= rainChance).map(item => (
                        <MeteoDay key={item.dt} data={item} />
                    ))
                )}
            </main>
        </div>
    )
}

export default Meteo;