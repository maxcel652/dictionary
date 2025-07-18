import Stats from '../Stats'
import Countdown from '../Countdown'
import History from '../History'

export default function Dashboard(props) {
  return (
    <section>
      <Stats {...props}/>
      <Countdown {...props}/>
        <History {...props}/>
    </section>
  )
}