function Button({ onClick, disabled, title }) {


    return (
        <button onClick={onClick}
            disabled={disabled}
        >{title}</button>
    );
}

export default Button;