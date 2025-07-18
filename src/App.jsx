import Layout from "./components/layouts/Layout"
import Welcome from  "./components/layouts/Welcome"
import Dashboard from "./components/layouts/Dashboard"
import Challenge from "./components/layouts/Challenge"
import React from "react"
import WORDS from './utils/VOCAB.json'
import {getWordByIndex,PLAN, countdownIn24Hours} from './utils'
import { useState, useEffect } from "react"

function App() {
  const [selectedPage, setSelectedPage] = useState(0)
  // const selectedPage =  2;
  const [name, setName] =useState("");
  const [day,  setDay] = useState(1);
  
  const [dateline, setDateline] = useState(null);
  const [history, setHistory] = useState({});
  const [attempts, setAttempts] = useState(0);


  const daysWords = PLAN[day].map((idx) =>{
    return getWordByIndex(WORDS, idx).word
  })
 



  // function to change the page
  function handleChnagePage(pageIndex){
    setSelectedPage(pageIndex)
  }

  // check if name is entered
  function handleCreateAccount(){
    if (!name){return};
    localStorage.setItem('userName', name)
    handleChnagePage(1)
  }


  function handleCompleteDay(){
    const newDay = day + 1;
    const newDateLine = Date.now()
    setDay(newDay)
    setDateline(newDateLine)

    localStorage.setItem('day', JSON.stringify({day: newDay, dateline:newDateLine}))
    setSelectedPage(1)
  }


  function handleIncrementAttempts(){
    const newRecord = attempts + 1;
    localStorage.setItem('attempts', newRecord);
    setAttempts(newRecord)
  }





  useEffect(() => {
    // this callback function is triggered on page load
    if (!localStorage) { return } // if we don't yet have access to the database, then exit the callback function

    if (localStorage.getItem('username')) {
      // if we find the item (so get item returns something), then we enter the if block
      setName(localStorage.getItem('username'))

      // we have a name, so we can skip to the dashboard
      setSelectedPage(1)
    }

    if (localStorage.getItem('attempts')) {
      // then wefound attempts
      setAttempts(parseInt(localStorage.getItem('attempts')))
    }

    if (localStorage.getItem('history')) {
      setHistory(JSON.parse(localStorage.getItem ('history')))
    }

    if (localStorage.getItem('day')) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem('day'))
      setDateline(dt)
      setDay(d)

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt) 
        if (diff < 0) {
          console.log('Failed challenge')
          let newHistory = { ...history }
          const timestamp = new Date(dt)
          const formattedTimestamp = timestamp.toString().split(' ').slice(1, 4).join(' ')
          newHistory[formattedTimestamp] = d
          setHistory(newHistory)
          setDay(1)
          setDateline(null)
          setAttempts(0)

          localStorage.setItem('attempts', 0)
          localStorage.setItem('history', JSON.stringify(newHistory))
          localStorage.setItem('day', JSON.stringify({ day: 1, datetimne: null }))
        }
      }
    }


  }, [])










  const pages = {
    0:<Welcome handleCreateAccount={handleCreateAccount} userName='Hello world' name={name} setName={setName} />,
    1:<Dashboard name={name} attempts={attempts} PLAN={PLAN} day={day} 
    handleChnagePage={handleChnagePage} daysWords={daysWords} dateline={dateline} history={history}    />,


    2:<Challenge day={day} daysWords={daysWords} handleChnagePage={handleChnagePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}/>
  }


  // useEffect(()=>{
  //   if(!localStorage) {return}


  //   if(localStorage.getItem('userName')){
  //     setName(localStorage.getItem('userName'))

  //     setSelectedPage(1)
  //   }
  // }, [])
  return (
    <Layout>
     {pages[selectedPage]}
     
     
    </Layout>
  )
}

export default App