function InputTicket({ onChange, value, price, disabled }) {


    return (
        <div>
            <input value={value}
                type="number" name="number"
                onChange={onChange}
                min={0} max={10} disabled={disabled}/>
            <label>{price}</label>
        </div>
    );
}

export default InputTicket;