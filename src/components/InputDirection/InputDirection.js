function InputDirection({ data, choiceDirection, value, setValue, direction }) {
    
    function chengeValue(e) {
        setValue(e.target.value);
    }

    return (
        <div >
            <input type="radio" name="direction" 
                checked={value === direction.id ? true : false}
                onChange={chengeValue}
                onClick={() => choiceDirection(data.id)}
            />
            <label htmlFor={data.id}>{data.title}</label>
        </div>
    );
}

export default InputDirection;