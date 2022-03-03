import { TimelineItemHead } from 'src/interfaces'
import style from './ItemHead.module.css'

const TimelineItemHead = ({date,amountTotal, isFirst}:TimelineItemHead) => {
  return (
    <div className={style.timelineItemHeadWrapper}>
      <div className={style.timelineDate}>
        {date}
      </div>  
      <div className={style.timelineTransactionType}>
        {isFirst ? <span className={style.timelineHead}>Tipo de Transação</span> : null }
      </div>
      <div className={style.timelineTransactionDate}>
        {isFirst ? <span className={style.timelineHead}>Data</span> : null}
      </div>
      <div className={style.timelineValue}>
        {isFirst ? 
          <span className={style.timelineHead}>Valor</span> 
          : <span className={style.timelineAmountTotal}>
            Saldo do dia
            <strong>{amountTotal}</strong>
          </span>
        }
      </div>
    </div>
  )
}


export default TimelineItemHead
