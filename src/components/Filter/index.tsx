import {AccountStatementFilter, AccountStatementFilterStatus} from 'src/interfaces'
import Tabs from 'src/components/Tabs'
import Search from 'src/components/Search'
import style from './Filter.module.css'

const Filter = ({onChange, onSearch}) => (
  <div className={style.filterAccountStatement}>
    <Tabs 
      items={AccountStatementFilterStatus} 
      type='pill' 
      onChange={onChange}/>
    <Search onChange={onSearch} />
  </div>
)

export default Filter
