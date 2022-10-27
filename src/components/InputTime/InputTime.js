function InputTime({ data, choiceTime, value, setValue, time, name, ChooseTime, setTime, disabled}) {
    
    function chengeValue(e) {
        setValue(e.target.value);
    }

    return (
        <div >
            <input type="radio" name={name} 
                checked={value === time.id ? true : false}
                onChange={chengeValue}
                onClick={() => choiceTime(data.id, ChooseTime, setTime)}
                disabled={disabled}
            />
            <label htmlFor={data.id}>{data.hour}:{data.minutes}</label>
        </div>
    );
}

export default InputTime;