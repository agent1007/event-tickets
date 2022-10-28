function InputTicket({ onChange, value, priceA, priceB, disabled, direction, title }) {


    return (
        <div>
            <input value={value}
                type="number" name="number"
                onChange={onChange}
                min={0} max={10} disabled={disabled} />
            <label> {title} билет, {(direction.id === 3) ? priceB : priceA}.</label>
        </div>
    );
}

export default InputTicket;