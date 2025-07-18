export default function ProgressBar(props) {

  const {text, remainder} = props
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];

  return (
    <div className="level">
      <div>
        <h4>{text}</h4>
      </div>

      {
        arr.map((num, numId) => {
          return(
            <div className="level-bar" key={numId}></div>
          )
        })
      }


      <div className="xp" style={{width: `${remainder}%`}}></div>
    </div>
  )
}