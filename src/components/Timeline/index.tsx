import { Timeline } from 'src/interfaces'
import TimelineEmpty from './Empty'
import TimelineItemHead from './ItemHead'
import TimelineItemTransactions from './ItemTransactions'

const Timeline = ({timeline}:Timeline) => {
  const indexFirst = timeline.findIndex(t => t.items.length)
  if (indexFirst<0) {
    return <TimelineEmpty />
  }

  return (
    <>
      { timeline.map((timelineItem, index) => {
        if (!timelineItem.items.length) {
          return null
        }

        return (
          <div key={`timeline-item-${index}`}>
            <TimelineItemHead
              date={timelineItem.date} 
              amountTotal={timelineItem.amountTotal}
              isFirst={indexFirst === index}
            />
            <TimelineItemTransactions items={timelineItem.items}/>
          </div>
        )
      })
    }
    </>
  )
}

export default Timeline
