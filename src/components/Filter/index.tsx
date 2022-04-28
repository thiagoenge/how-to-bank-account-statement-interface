import { useEffect, useState } from 'react'
import {AccountStatementFilterStatus} from 'src/interfaces'
import Tabs from 'src/components/Tabs'
import Search from 'src/components/Search'
import style from './Filter.module.css'

export interface FilterData {
  status: AccountStatementFilterStatus,
  text: string
}
export interface FilterProps {
  onChange: (data: FilterData) => void
}

const Filter = ({onChange}: FilterProps) => {
  const [filterData, setFilterData] = useState<FilterData>({status: AccountStatementFilterStatus.ALL, text: ''});

  useEffect(() => {
    onChange(filterData)
  }, [filterData]);

  const onSearchChange = (text) => setFilterData({...filterData, text})

  const onTabsChange = (status) => setFilterData({...filterData, status})

  return (
    <div className={style.filterAccountStatement}>
      <Tabs 
        items={Object.values(AccountStatementFilterStatus)} 
        initialValue={AccountStatementFilterStatus.ALL}
        onChange={onTabsChange}/>
      <Search onChange={onSearchChange} />
    </div>
  );
}

export default Filter
