import Header from "../Header/header";
import ChooseDirection from "../../utils/constans/ChooseDirection";
import ChooseTimeBack from "../../utils/constans/ChooseTimeBack";
import ChooseTimeThere from "../../utils/constans/ChooseTimeThere";
import ChooseTickets from "../../utils/constans/ChooseTickets";
import InputDirection from "../InputDirection/InputDirection";
import InputTime from "../InputTime/InputTime";
import InputTicket from "../InputTicket/InputTicket";
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
  const [valueСhild, setValueСhild] = useState('')
  // Запись взрослых билетов билетов
  const [valueAdult, setValueAdult] = useState('')
  // Запись льготных билетов
  const [valuePreferential, setValuePreferential] = useState('')
  // Цена за все билеты
  const [priceTickets, setPriceTickets] = useState(0)
  // value для input
  const [value, setValue] = useState(0);


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

  // Событие на детский билет
  function handleChangeСhild(e) {
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
    setChooseTimeBack(ChooseTimeBack.time)
    setValue(0)
  }

  // подсчет времени приезда
  function getTimeFromMins(mins) {
    let hours = Math.trunc((mins + 50) / 60)
    let minutes = (mins + 50) % 60

    return hours + ':' + ((9 >= minutes) ? ('0' + minutes) : minutes)
  }
  const timeThereEnd = getTimeFromMins(Number(timeThere.hour) * 60 + Number(timeThere.minutes))
  const timeBackEnd = getTimeFromMins(Number(timeBack.hour) * 60 + Number(timeBack.minutes))




  // Вывод результата после нажатия кнопки "Посчитать"
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





  // Фильтр для времени туда и обратно"
  const result = ChooseTimeBack.time.filter(data => {
    return (
      Number(timeThere.hour) * 60 + Number(timeThere.minutes) + 50 < Number(data.hour) * 60 + Number(data.minutes)
    )
  })


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
    setChooseTimeBack((direction.id === 3) ? result : ChooseTimeBack.time)
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
                <InputDirection
                  key={data.id}
                  data={data}
                  choiceDirection={choiceDirection}
                  setValue={setValue}
                  value={data.id}
                  direction={direction}
                />
              )
            })}


            {/* выбор времени поездки */}
            <h2 className="element__title">Выберите время</h2>
            <div className="element__containers">
              <div>
                <h3>{ChooseTimeThere.title}</h3>
                {ChooseTimeThere.time.map(data => {
                  return (
                    <InputTime
                      key={data.id}
                      data={data}
                      choiceTime={choiceTime}
                      ChooseTime={ChooseTimeThere}
                      setTime={setTimeThere}
                      setValue={setValue}
                      value={data.id}
                      time={timeThere}
                      name="timeThere"
                      disabled={thereTime}
                    />
                  )
                })}
              </div>
              <div>
                <h3>{ChooseTimeBack.title}</h3>
                {chooseTimeBack.map(data => {
                  return (
                    <InputTime
                      key={data.id}
                      data={data}
                      choiceTime={choiceTime}
                      ChooseTime={ChooseTimeBack}
                      setTime={setTimeBack}
                      setValue={setValue}
                      value={data.id}
                      time={timeBack}
                      name="timeBack"
                      disabled={backTime}
                    />
                  )
                })}
              </div>
            </div>

            {/* выбор количества билетов на поездку */}
            <h2 className="element__title">Выберите количество билетов</h2>
            <InputTicket
              value={valueAdult}
              onChange={handleChangeAdult}
              price='Взрослый билет, 700P/1200P.'
              disabled={tickets}
            />
            <InputTicket
              value={valuePreferential}
              onChange={handleChangePreferential}
              price='Льготный билет, 600P/1000P.'
              disabled={tickets}
            />
            <InputTicket
              value={valueСhild}
              onChange={handleChangeСhild}
              price='Детский билет, 400P/600P.'
              disabled={tickets}
            />

            {/* кнопки */}
            <button onClick={handleClickEnd}
              disabled={buttonEnd}
            >Посчитать</button>
            <button onClick={handleClickAgain}
              disabled={buttonAgain}
            >Сбросить</button>




          </div>

          {/* <div className="lis-order">
            <div className="lis-order__id"></div>
            <div className="lis-order__event-id"></div>
            <div className="lis-order__event-date"></div>
            <div className="lis-order__ticket-adult-price"></div>
            <div className="lis-order__ticket-adult-quantity"></div>
            <div className="lis-order__ticket-kid-price"></div>
            <div className="lis-order__ticket-kid-quantity"></div>
            <div className="lis-order__barcode"></div>
            <div className="lis-order__	user-id"></div>
            <div className="lis-order__equal-price"></div>
            <div className="lis-order__created"></div>

          </div> */}












        </div>
      </div>
    </div>
  );
}

export default App;
