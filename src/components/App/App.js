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
  // Стейт времени back
  const [chooseTimeBack, setChooseTimeBack] = useState(ChooseTimeBack.time);
  // Количество всех билетов
  const [ticketsCounter, setTicketsCounter] = useState(0);
  // Количество детских билетов
  const [ticketsCounterСhild, setTicketsCounterСhild] = useState('0');
  // Количество взрослых билетов
  const [ticketsCounterAdult, setTicketsCounterAdult] = useState('0');
  // Количество льготных билетов
  const [ticketsCounterPreferential, setTicketsCounterPreferential] = useState('0');
  // Запись детских билетов
  const [valueСhild, setValueСhild] = useState(0)
  // Запись взрослых билетов билетов
  const [valueAdult, setValueAdult] = useState(0)
  // Запись льготных билетов
  const [valuePreferential, setValuePreferential] = useState(0)
  // Цена за все билеты
  const [priceTickets, setPriceTickets] = useState(0)

  // Функция выбора направления
  function choiceDirection(id) {
    const data = ChooseDirection.direction.find((item) =>
      item.id === id
    )
    setDirection(data)
  }



  // нажатие кнопки "Посчитать"
  const handleClickEnd = () => {
    setTicketsCounter((Number(ticketsCounterAdult.number) || 0) + (Number(ticketsCounterСhild.number) || 0) + (Number(ticketsCounterPreferential.number) || 0))
    const data = (direction.id === 3) ?
      setPriceTickets((Number(ticketsCounterAdult.number) || 0) * 1200 + (Number(ticketsCounterСhild.number) || 0) * 600 + (Number(ticketsCounterPreferential.number) || 0) * 1000)
      :
      setPriceTickets((Number(ticketsCounterAdult.number) || 0) * 700 + (Number(ticketsCounterСhild.number) || 0) * 400 + (Number(ticketsCounterPreferential.number) || 0) * 600)
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
    setTicketsCounterAdult('0')
    setTicketsCounterPreferential('0')
    setTicketsCounterСhild('0')
    setValueСhild('')
    setValueAdult('')
    setValuePreferential('')
  }

  // подсчет времени приезда
  function getTimeFromMins(mins) {
    let hours = Math.trunc((mins + 50) / 60)
    let minutes = (mins + 50) % 60

    return hours + ':' + ((9 >= minutes) ? ('0' + minutes) : minutes)
  }
  const timeThereEnd = getTimeFromMins(Number(timeThere.hour) * 60 + Number(timeThere.minutes))
  const timeBackEnd = getTimeFromMins(Number(timeBack.hour) * 60 + Number(timeBack.minutes))

  const outputResult = useCallback(() => {
    const tickets = ticketsCounter >= 2 ? (ticketsCounter >= 5 ? 'ов' : 'а') : ''
    const data = (direction.id === 3) ?
      (setResultat('Вы выбрали ' + ticketsCounter + ' билет' + tickets + ' по маршруту: ' + direction.title + ' Cтоимость составляет: ' + priceTickets + 'р. Теплоход отправляется в ' + timeThere.hour + ':' + timeThere.minutes + '  ,  прибудет в ' + timeThereEnd + '. На обратном пути теплоход отправляется в ' + timeBack.hour + ':' + timeBack.minutes + '  ,  прибудет в ' + timeBackEnd))
      :
      ((direction.id === 1)
        ?
        (setResultat('Вы выбрали ' + ticketsCounter + ' билет' + tickets + ' по маршруту: ' + direction.title + ' Cтоимость составляет: ' + priceTickets + 'р. Теплоход отправляется в ' + timeThere.hour + ':' + timeThere.minutes + '  ,  прибудет в ' + timeThereEnd))
        :
        (setResultat('Вы выбрали ' + ticketsCounter + ' билет' + tickets + ' по маршруту: ' + direction.title + ' Cтоимость составляет: ' + priceTickets + 'р. Теплоход отправляется в ' + timeBack.hour + ':' + timeBack.minutes + '  ,  прибудет в ' + timeBackEnd)))
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


  const result = ChooseTimeBack.time.filter(data => {    
    return (
      Number(timeThere.hour) * 60 + Number(timeThere.minutes) + 50 < Number(data.hour) * 60 + Number(data.minutes)
    )
  })

  // Функция выбора времени
  function choiceTimeThere(id) {
    const data = ChooseTimeThere.time.find((item) =>
      item.id === id
    )
    setTimeThere(data)
    setChooseTimeBack((direction.id === 3) ? result : ChooseTimeBack.time)
  }
  // Функция выбора времени
  function choiceTimeBack(id) {
    const data = ChooseTimeBack.time.find((item) =>
      item.id === id
    )
    setTimeBack(data)
  }


  // Условие включения раздела выбора времени there
  const thereTime = (direction.length === 0 || direction.id === 2) ? true : false
  // Условие включения раздела выбора времени back
  const backTime = (direction.length === 0 || direction.id === 1) ? true : false
  // Условие включения раздела выбора количества билетов
  const tickets = ((direction.id === 3) ? (timeThere.length === 0 || timeBack.length === 0) : (timeThere.length === 0 && timeBack.length === 0)) ? true : false
  // Условие включения кнопки "Посчитать"
  const buttonEnd = (direction.length === 0 || ((ticketsCounterAdult === 0) && (ticketsCounterPreferential === 0) && (ticketsCounterСhild === 0))) ? true : false
  // Условие включения "Сбросить"
  const buttonAgain = (direction.length === 0 && timeThere.length === 0 && timeBack.length === 0) ? true : false

  useEffect(() => {
    const data = finalTest === true ? outputResult() : ''

    // const data1 = finalTest === true ? savedResultat() : ''
  }, [finalTest])

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
                      <input type="radio" name="timeThere" onClick={() => choiceTimeThere(data.id)} disabled={thereTime} />
                      <label htmlFor={data.id}>{data.hour}:{data.minutes}</label>
                    </div>
                  )
                })}
              </div>
              <div>
                <h3>{ChooseTimeBack.title}</h3>
                {/* {(direction.id === 3) ? data1 : ChooseTimeBack.time.map(data => { */}
                {chooseTimeBack.map(data => {
                  //    console.log(chooseTimeBack) 
                  //  console.log(ChooseTimeBack.time) 
                  // console.log(data1)
                  return (
                    <div key={data.id} >
                      <input type="radio" name="timeBack" onClick={() => choiceTimeBack(data.id)} disabled={backTime} />
                      <label htmlFor={data.id}>{data.hour}:{data.minutes}</label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* выбор количества билетов на поездку */}
            <h2 className="element__title">Выберите количество билетов</h2>
            <div>
              <input value={valueAdult}
                type="number" name="number"
                onChange={handleChangeAdult} disabled={tickets} min={0} max={10} />
              <label>Взрослый билет, 700P/1200P.</label>
            </div>
            <div>
              <input value={valuePreferential}
                type="number" name="number"
                onChange={handleChangePreferential} disabled={tickets} min={0} max={10} />
              <label>Льготный билет, 600P/1000P.</label>
            </div>
            <div>
              <input value={valueСhild}
                type="number" name="number"
                onChange={handleChangeСhild} disabled={tickets} min={0} max={10} />
              <label>Детский билет, 400P/600P.</label>
            </div>


            <button onClick={handleClickEnd} disabled={buttonEnd}>Посчитать</button>
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
