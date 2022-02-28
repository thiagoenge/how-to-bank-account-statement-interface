import {AccountStatementFilter, AccountStatementFilterStatus} from 'src/interfaces'
import Tabs from 'src/components/Tabs'
import Search from 'src/components/Search'
import style from './Filter.module.css'
const accountStatementeFilterNav:AccountStatementFilter = {
  navigation:[
    AccountStatementFilterStatus.ALL,
    AccountStatementFilterStatus.CREDIT,
    AccountStatementFilterStatus.DEBIT,
    AccountStatementFilterStatus.FUTURE
  ]
}

const Filter = () => (
  <div className={style.filterAccountStatement}>
    <Tabs 
      items={accountStatementeFilterNav.navigation} 
      type='pill' 
      onChange={()=>null}/>
    <Search onChange={()=>null} />
  </div>
)

export default Filter
