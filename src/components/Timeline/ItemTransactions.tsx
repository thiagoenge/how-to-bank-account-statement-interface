import { 
  TimelineItemTransactions, 
  AccountStatementItem,
  TransactionType ,
  Status,
  Source, 
  Entry
} from 'src/interfaces'
import classNames from 'classnames'
import {parseItemTransactionDate} from 'src/utils/handle-dates'
import {formatCurrency} from 'src/utils/handle-currency'
import style from './ItemTransactions.module.css'

const transactionType = ({status}:TransactionType)=>{
  switch (status) {
    case Status.COMPLETED:
      return {
        [`${Source.PAYMENT}.${Entry.DEBIT}`]: 'Pagamento Realizado',
        [`${Source.TRANSFER}.${Entry.DEBIT}`]: 'Transfência Realizada',
        [`${Source.PAYMENT}.${Entry.CREDIT}`]: 'Pagamento Recebido',
        [`${Source.TRANSFER}.${Entry.CREDIT}`]: 'Transfência Recebida'
      }
      break;
    case Status.PENDING:
      
      break;
    case Status.REFUNDED:
      
      break;
  
    default:
      break;
  }
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
          <div className={style.itemType}>Pagamento Realizado</div>
          <div className={style.itemDateEvent}>{parseItemTransactionDate(item.dateEvent)}</div>
          <div className={classNames(style.itemAmount,{
            [style.refund]:false,
            [style.entrance]:true,
            [style.exit]:false,
          })}>{formatCurrency(item.amount)}</div>
        </div>
      ))}
    </div>
  )
}


export default TimelineItemTransactions
