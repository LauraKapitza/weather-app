function MeteoDay(props) {
    return(
        <li className='MeteoDay'>
            <div className="overview">
                <img src={`https://openweathermap.org/img/w/${props.data.weather[0].icon}.png`}/>
                <h2>{props.data.dateFrenchFormat}</h2>
            </div>
            <div>
                <p>
                    <span className="meteoParameter">MIN TEMP</span>
                    <span className="meteoValue">{Math.round(props.data.temp.min)}°C</span>
                </p>
                <p>
                    <span className="meteoParameter">MAX TEMP</span>
                    <span className="meteoValue">{Math.round(props.data.temp.max)}°C</span>
                </p>
                <p>
                    <span className="meteoParameter">CHANCE OF RAIN</span>
                    <span className="meteoValue">{props.data.pop *100} %</span>
                </p>
            </div>
        </li>
    )

}

export default MeteoDay;