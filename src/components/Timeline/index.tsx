import classNames from 'classnames'
import { Timeline } from 'src/interfaces'
import TimelineItemHead from './ItemHead'
import TimelineItemTransactions from './ItemTransactions'

const Timeline = ({timeline}:Timeline) => {
  console.log('timeline', timeline)
  return (
    Object.keys(timeline).map((tmItem,index)=>{
      const timelineItem = timeline[tmItem]
      return (
        <div>
          <TimelineItemHead 
            date={timelineItem.dateParsed} 
            amountTotal={timeline.amountTotal}
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
