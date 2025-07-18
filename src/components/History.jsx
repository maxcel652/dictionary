export default function History(props) {
  const {history, handleChnagePage} = props;
  const historyKeys = Object.keys(history)


  return (
    <div className="card history-card">
      <h4>History</h4>
      {history.length == 0 ? 
        (<p>You have no attempts! Press <a href="handleChnagePage(2)" onClick={(e)=>{
          e.preventDefault()
          handleChnagePage(2)}}>Start</a> to begin</p>): (

      <div className="history-list">
        {historyKeys.map((item, itemId) =>{
          const dateKye = (new Date(item)).toString().split(' ').slice(1,4).join(' ')


          return(
            <div key={itemId}className="card-button-secondary">
              <div>
                <p>Started</p>
                <h6>{dateKye}</h6>
              </div>

              <div>
                <p>Streak</p>
                <h6>{history[item]}</h6>
              </div>
              
            </div>

          )
        })}
      </div>
        

    )}

  </div>
)}