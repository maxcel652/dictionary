import ProgressBar from '../ProgressBar'
import { useState } from 'react';
import { shuffle, isEncountered } from '../../utils';
import DEFINITIONS from '../../utils/VOCAB.json'

export default function Challenge(props) {
  const {day, daysWords, handleChnagePage, handleIncrementAttempts, handleCompleteDay, PLAN} = props;

  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVAl] =  useState('');
  const [showDefinition, setShowDefinition] = useState(false);
  const [listToLearn, setListToLearn] = useState([
    ...daysWords,
    ...shuffle(daysWords),
    ...shuffle(daysWords),

    ...shuffle(daysWords),

  ])


  function giveUp (){
    setListToLearn([...listToLearn, word])
    setShowDefinition(true)
  }



  const word = listToLearn[[wordIndex]]
  const isNewWord = showDefinition||  (
    !isEncountered(day, word) && wordIndex < daysWords.length
  )
  const definition = DEFINITIONS[word];

  
  
  return (
    <section id="challenge">
      <h1>{word}</h1>
      {isNewWord && (<p>{definition}</p>)}

      <div className="helper">
        <div>
              {/*contains all the error corrections visual bars  */}

              {[...Array(definition.length).keys()].map((char,elID) => {
                // determine if user's definition is correct

                const styleToApply = inputVal.length < char + 1 ? 
                  '':
                  inputVal.split('')[elID].toLocaleLowerCase() == definition.split('')[elID].toLocaleLowerCase() ? 'correct':'incorrect' 

                return(
                  <div className={' ' + styleToApply} key={elID}></div>
                )
              })}
        </div>  

        <input value={inputVal} 
        onChange={(e) =>{
          if(e.target.value.length === definition.length && e.target.value.length > inputVal.length){
            handleIncrementAttempts()
            if(e.target.value.toLocaleLowerCase() == definition.toLocaleLowerCase()){
              if(wordIndex >= listToLearn.length - 1){
                handleCompleteDay()
                return
              }
              setWordIndex(wordIndex + 1)
              setShowDefinition(false)
              setInputVAl('')
              return
            }
          }

          setInputVAl(e.target.value)
        }} type="text" placeholder='Enter the definition...'/>
      </div>

      <div className='challenge-btns'>
        <button onClick={()=> {handleChnagePage(1)}} className='card-button-secondary'>
          <h6>Quit</h6>
        </button>
        <button onClick={giveUp} className="card-button-primary">
          <h6>I forgot</h6>
        </button>
      </div>

      <ProgressBar remainder={wordIndex * 100 / listToLearn.length} text={`${wordIndex} / ${listToLearn.length}`}/>
    </section>
  )
}