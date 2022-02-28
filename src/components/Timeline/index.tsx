import { AccountStatement,Timeline, TimelineItem } from 'src/interfaces'
import style from './Timeline.module.css'


const TimelineItem = ({item, isHead}:TimelineItem) => {
  return (
    <div className="timelineItemWrapper">
      <div className="timelineDate">
        {item.dateParsed}
      </div>
      {isHead ? (
        <>
          <div className="timelineTransactionType">
            Tipo de Transação
          </div>
          <div className="timelineTransactionDate">
            Data
          </div>
        </>
      ) : null}
    </div>
  )
}

const Timeline = ({timeline}:Timeline) => {
  console.log('timeline', timeline)
 
  // return <div>Hello</div>
   return Object.keys(timeline).map((tmItem,index)=>{
    console.log('tmItem', tmItem)
    return (
      <div>
        <TimelineItem isHead={!index} item={timeline[tmItem]} />
      </div>
    )
   })
}

export default Timeline
