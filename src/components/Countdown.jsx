import { useState } from "react";
import { countdownIn24Hours, convertMilliseconds } from "../utils";


export default function Countdown(props) {

  const {handleChnagePage, daysWords, dateline, day} = props;
  
  
  const targetMillis = dateline || Date.UTC(1994, 2, 17, 12, 0, 0)
  
    const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))
  const timer = convertMilliseconds(remainingMs)

  console.log(timer )
  return (
    <div className="card countdown-card">
      <h1 className="item-header">Day {day}</h1>
      <div className="today-container">
        <div>
          <p>Time remaining</p>
          <h3>
            {dateline ? `${Math.abs(timer.hours)}H ${Math.abs(timer.minutes)}M ${Math.abs(timer.seconds)}s`: '24H 60M 60s'}
          </h3>
        </div>
        <div>
          <p>Words for today</p>
          <h3>{daysWords.length}</h3>
        </div>
      </div>

      <button onClick={() =>{handleChnagePage(2)}}>
        Start
      </button>
   
    </div>
  )
}