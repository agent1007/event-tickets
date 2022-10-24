import Header from "../Header/header";
import ChooseDirection from "../../utils/constans/ChooseDirection";
import ChooseTimeBack from "../../utils/constans/ChooseTimeBack";
import ChooseTimeThere from "../../utils/constans/ChooseTimeThere";
import { useState, useCallback, useEffect } from 'react';

function App() {

  // Вывод результата после нажатия кнопки "Посчитать"
  const [finalTest, setFinalTest] = useState(false)
  // Стейт результатов
  const [resultat, setResultat] = useState(['']);
  // Стейт направления
  const [direction, setDirection] = useState([]);
  // Стейт времени there
  const [timeThere, setTimeThere] = useState([]);
  // Стейт времени back
  const [timeBack, setTimeBack] = useState([]);
  // Количество всех билетов
  const [ticketsCounter, setTicketsCounter] = useState(0);
  // Количество детских билетов
  const [ticketsCounterСhild, setTicketsCounterСhild] = useState(0);
  // Количество взрослых билетов
  const [ticketsCounterAdult, setTicketsCounterAdult] = useState(0);
  // Количество льготных билетов
  const [ticketsCounterPreferential, setTicketsCounterPreferential] = useState(0);
  // Запись детских билетов
  const [valueСhild, setValueСhild] = useState('')
  // Запись взрослых билетов билетов
  const [valueAdult, setValueAdult] = useState('')
  // Запись льготных билетов
  const [valuePreferential, setValuePreferential] = useState('')

  // Функция выбора направления
  function choiceDirection(id) {
    const data = ChooseDirection.direction.find((item) =>
      item.id === id
    )
    setDirection(data)
  }

  // Функция выбора времени
  function choiceTime(id, el, setState) {
    const data = el.time.find((item) =>
      item.id === id
    )
    setState(data)
  }

  // нажатие кнопки "Посчитать"
  const handleClickEnd = () => {
    setTicketsCounter(ticketsCounterAdult.valueAdult + ticketsCounterСhild.valueСhild + ticketsCounterPreferential.setValuePreferential)
    setFinalTest(true)
  }

  // нажатие кнопки "Сбросить"
  const handleClickAgain = () => {
    setResultat([''])
    setFinalTest(false)
    setDirection([])
    setTimeThere([])
    setTimeBack([])
    setTicketsCounter(0)
    setTicketsCounterAdult(0)
    setTicketsCounterPreferential(0)
    setTicketsCounterСhild(0)
    setValueСhild('')
    setValueAdult('')
    setValuePreferential('')
  }


  const outputResult = useCallback(() => {
    
    const data = ticketsCounter.number >= 2 ? (ticketsCounter.number >= 5 ? 'ов' : 'а') : ''
    setResultat('Вы выбрали ' + ticketsCounter.number + ' билет' + data + ' по маршруту: ' + direction.title + ' Cоимость составляет: ' + ticketsCounter.number * direction.price + 'р. Теплоход отправляется в ' + timeThere.there + '  , а прибудет в 18-00.')
  }, [handleClickEnd])

 // Сумма всех типов билетов
 

 // Событие на детский билет
  const handleChangeСhild = (e) => {
    const { name, value } = e.target;
    setValueСhild(e.target.value)
    setTicketsCounterСhild(data => ({
      ...data,
      [name]: value
    }))
  }
   // Событие на взрослый билет
  const handleChangeAdult = (e) => {
    const { name, value } = e.target;
    setValueAdult(e.target.value)
    setTicketsCounterAdult(data => ({
      ...data,
      [name]: value
    }))
  }
  // Событие на льготный билет
  const handleChangePreferential = (e) => {
    const { name, value } = e.target;
    setValuePreferential(e.target.value)
    setTicketsCounterPreferential(data => ({
      ...data,
      [name]: value
    }))
  }


  // Условие включения раздела выбора времени there
  const thereTime = (direction.length === 0 || direction.id === 2) ? true : false
  // Условие включения раздела выбора времени back
  const backTime = (direction.length === 0 || direction.id === 1) ? true : false
  // Условие включения раздела выбора количества билетов
  const tickets = ((direction.id === 3) ? (timeThere.length === 0 || timeBack.length === 0) : (timeThere.length === 0 && timeBack.length === 0)) ? true : false
  // Условие включения кнопки "Посчитать"
  const buttonEnd = (direction.length === 0 || ticketsCounter === 0) ? true : false
  // Условие включения "Сбросить"
  const buttonAgain = (direction.length === 0 && timeThere.length === 0 && timeBack.length === 0) ? true : false


  useEffect(() => {
    const data = finalTest === true ? outputResult() : ''
   
    // const data1 = finalTest === true ? savedResultat() : ''
  }, [finalTest])
 console.log(ticketsCounter)
 console.log(ticketsCounterAdult.valueAdult)
 console.log(ticketsCounterPreferential.valuePreferential)
  return (
    <div className="App">
      <div className="body">
        <div className="page">
          <Header />

          <div className="element">

            {/* выбор направления поездки */}
            <h2 className="element__title">Выберите направление</h2>
            {ChooseDirection.direction.map(data => {
              return (
                <div key={data.id}>
                  <input type="radio" name="direction" onClick={() => choiceDirection(data.id)} />
                  <label htmlFor={data.id}>{data.title}</label>
                </div>
              )
            })}

            {/* выбор времени поездки */}
            <h2 className="element__title">Выберите время</h2>
            <div className="element__containers">
              <div>
                <h3>{ChooseTimeThere.title}</h3>
                {ChooseTimeThere.time.map(data => {
                  return (
                    <div key={data.id}>
                      <input type="radio" name="timeThere" onClick={() => choiceTime(data.id, ChooseTimeThere, setTimeThere)} disabled={thereTime} />
                      <label htmlFor={data.id}>{data.there}</label>
                    </div>
                  )
                })}
              </div>
              <div>
                <h3>{ChooseTimeBack.title}</h3>
                {ChooseTimeBack.time.map(data => {
                  return (
                    <div key={data.id}>
                      <input type="radio" name="timeBack" onClick={() => choiceTime(data.id, ChooseTimeBack, setTimeBack)} disabled={backTime} />
                      <label htmlFor={data.id}>{data.back}</label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* выбор количества билетов на поездку */}
            <h2 className="element__title">Выберите количество билетов</h2>
            <div>
              <input value={valueAdult}
                type="number" name="valueAdult"
                onChange={handleChangeAdult} disabled={tickets} min={0} max={10} />
              <label>Взрослый билет, 700P.</label>
            </div>
            <div>
              <input value={valuePreferential}
                type="number" name="valuePreferential"
                onChange={handleChangePreferential} disabled={tickets} min={0} max={10} />
              <label>Льготный билет, 600P.</label>
            </div>
            <div>
              <input value={valueСhild}
                type="number" name="valueСhild"
                onChange={handleChangeСhild} disabled={tickets} min={0} max={10} />
              <label>Детский билет, 400P.</label>
            </div>


            <button onClick={handleClickEnd} >Посчитать</button>
            <button onClick={handleClickAgain} disabled={buttonAgain}>Сбросить</button>

            {/* вывод результатов */}
            <div className="element__total">
              <div className="testing__resultat">{resultat}</div>
            </div>


          </div>



        </div>
      </div>
    </div>
  );
}

export default App;
