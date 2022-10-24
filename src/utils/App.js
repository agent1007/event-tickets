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
  // Количество билетов
  const [ticketsCounter, setTicketsCounter] = useState(0);
  // Запись билетов
  const [value, setValue] = useState('')
console.log(ticketsCounter)
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
    setValue('')
  }


  const outputResult = useCallback(() => {
    const data = ticketsCounter.number >= 2 ? (ticketsCounter.number >= 5 ? 'ов' : 'а') : ''
    setResultat('Вы выбрали ' + ticketsCounter.number + ' билет' + data + ' по маршруту: ' + direction.title + ' Cоимость составляет: ' + ticketsCounter.number * direction.price + 'р. Теплоход отправляется в ' + timeThere.there + '  , а прибудет в 18-00.')
  }, [handleClickEnd])




  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    setValue(e.target.value)
    setTicketsCounter(data => ({
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
            
            <input value={value}
              type="number" name='number1' id="number1"
              onChange={handleChange}
              required
              disabled={tickets}
              min={0} max={10}

            />
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
