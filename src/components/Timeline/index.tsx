import classNames from 'classnames'
import { Timeline } from 'src/interfaces'
import TimelineItemHead from './ItemHead'
import TimelineItemTransactions from './ItemTransactions'

const Timeline = ({timeline}:Timeline) => {

  return (
    Object.keys(timeline).map((tmItem,index)=>{
      const timelineItem = timeline[tmItem]
      if(!timelineItem.items.length){
        return null
      }
      return (
        <div>
          <TimelineItemHead 
            date={timelineItem.dateParsed} 
            amountTotal={timelineItem.amountTotal}
            isFirst={!index}
          />
          <TimelineItemTransactions 
            items={timelineItem.items}
          />
        </div>
      )
    })
  )
}

export default Timeline
