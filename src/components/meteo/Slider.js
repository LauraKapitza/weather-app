function Slider(props) {
    return(
        <label className="slider">
            <p>
                <span className="title">{props.title}</span>
                <span className="value">{props.showValue}{props.metric}</span>
            </p>
            <div className="inputContainer">
                <input type='range' name={props.title} value={props.inputValue} min={props.inputMin} max={props.inputMax} step={props.inputStep} onChange={(event) => {props.setInputValue(event.target.value)}} />
            </div>
        </label>
    )
}

export default Slider;