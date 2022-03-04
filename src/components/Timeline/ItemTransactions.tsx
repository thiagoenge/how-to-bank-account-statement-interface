import { 
  TimelineItemTransactions, 
  AccountStatementItem,
  TransactionTypesMap,
} from 'src/interfaces'
import classNames from 'classnames'
import {parseItemTransactionDate} from 'src/utils/handle-dates'
import {formatCurrency} from 'src/utils/handle-currency'
import style from './ItemTransactions.module.css'

const transactionType = ({status, source, entry}) => {
  return TransactionTypesMap[`${status}.${source}.${entry}`]
}

const TimelineItemTransactions = ({items}:TimelineItemTransactions) => {
  return (
    <div className={style.timelineItemTransactionsWrapper}>
      {items.map((item:AccountStatementItem)=>(
        <div className={style.itemRow}>
          <div className={style.itemActor}>
            <span className={style.itemIcon}>1</span>
            {item.actor}
          </div>
          <div className={style.itemType}>{transactionType(item)}</div>
          <div className={style.itemDateEvent}>{parseItemTransactionDate(item.dateEvent)}</div>
          <div className={classNames(style.itemAmount,{
            [style.refund]:item.status === 'REFUNDED',
            [style.entrance]:item.status !== 'REFUNDED' && item.entry === 'CREDIT',
            [style.exit]:item.status !== 'REFUNDED' && item.entry === 'DEBIT',
          })}>{formatCurrency(item.amount)}</div>
        </div>
      ))}
    </div>
  )
}


export default TimelineItemTransactions
