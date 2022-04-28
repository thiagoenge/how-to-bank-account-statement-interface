import Image from 'next/image'
import { 
  TimelineItemTransactions, 
  AccountStatementItem,
  TransactionTypesMap,
  TransactionType,
  HandleIcons,
} from 'src/interfaces'
import classNames from 'classnames'
import {parseItemTransactionDate,isToday} from 'src/utils/handle-dates'
import {formatCurrency} from 'src/utils/handle-currency'
import creditIcon from 'src/public/assets/entrance.png';
import debitIcon from 'src/public/assets/exit.png';
import scheduledIcon from 'src/public/assets/scheduled.png';
import style from './ItemTransactions.module.css'

const transactionType = ({status, source, entry}:TransactionType) => {
  return TransactionTypesMap[`${status}.${source}.${entry}`]
}

const handleIcon = ({entry, scheduled}:HandleIcons) => {
  const iconsMap = {
    scheduled:scheduledIcon,
    debit: debitIcon,
    credit:creditIcon
  }
  
  return scheduled ? iconsMap.scheduled : iconsMap[entry.toLowerCase()]
}

const TimelineItemTransactions = ({items}:TimelineItemTransactions) => {
  return (
    <div className={style.timelineItemTransactionsWrapper}>
      {items.map((item: AccountStatementItem, index: number) => (
        <div key={`timeline-item-transaction-${index}`} className={style.itemRow}>
          <div className={style.itemActor}>
            <span className={style.itemIcon}>
              <Image src={handleIcon(item)} />
            </span>
            {item.actor}
          </div>
          <div className={style.itemType}>
            {isToday(new Date(item.dateEvent)) ? 'Hoje - ' : ''}
            {transactionType(item)}
            </div>
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
