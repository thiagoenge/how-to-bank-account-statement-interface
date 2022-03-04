import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'src/utils/fetcher'
import {parseItemHeadDate, sortDates} from 'src/utils/handle-dates'
import Layout from 'src/components/Layout'
import Filter from 'src/components/Filter'
import Timeline from 'src/components/Timeline'
import { AccountStatementFilterStatus, AccountStatementItem, AccountStatementItemWrapper } from 'src/interfaces'

const IndexPage = () => {
  const { data, error } = useSWR('/api/statement', fetcher)
  const [initialStatementAccount, setInitialStatementAccount] = useState(null)
  const [filteredStatementAccount, setFilteredStatementAccount] = useState(null)
  const [searchedStatementAccount, setSearchedStatementAccount] = useState(null)
  const [statementAccount, setStatementAccount] = useState(initialStatementAccount)
  const [isSearched, setIsSearched] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(()=>{
    if(data) {
      const {results} = data
      const sortDatesDesc = sortDates(results)
      setInitialStatementAccount(sortDatesDesc)
    }
  },[data])

  useEffect(()=>{
    setStatementAccount(initialStatementAccount)
  },[initialStatementAccount])
  
  useEffect(()=>{
    console.log('isFIltered effect', statementAccount)
    setFilteredStatementAccount(statementAccount)
  },[isFiltered])
 
  useEffect(()=>{
    console.log('isSearched effect', statementAccount)
    setSearchedStatementAccount(statementAccount)
  },[isSearched])

  const handleFilter = (status:keyof typeof AccountStatementFilterStatus):void=>{
    const dataToPerform = isSearched ? searchedStatementAccount : initialStatementAccount
    console.log('handleFIlter -> dataToPerform', dataToPerform)
    if(status === 'ALL'){
      setStatementAccount(dataToPerform)
      setIsFiltered(false)
      return
    }
    
    setStatementAccount(()=>{
      return dataToPerform.map((timelineItem:AccountStatementItemWrapper)=>{
        let newTimelineItems:AccountStatementItem[] | []
        if(status!=='FUTURE') {
          newTimelineItems = timelineItem.items.filter(item=>item.entry===status)
        } else{
          newTimelineItems = timelineItem.items.filter(item=>item.scheduled)
        }
        return {...timelineItem, items:newTimelineItems}
      })
    })
    setIsFiltered(true)
  }

  
  const handleSearch = (searchVal:string)=>{
    const cleanSearchVal = searchVal.toLowerCase().replace(/r\$|\.|,/, '').trim()
    const dataToPerform = isFiltered ? filteredStatementAccount : initialStatementAccount
    if(!cleanSearchVal){
      setStatementAccount(dataToPerform)
      console.log(isSearched)
      setIsSearched(false)
      return
    }
    const results = [];
    const searchFields = ["actor", "amount"];
   
    for (let index = 0; index < dataToPerform.length; index++) {
      const newStatementAccount = [...dataToPerform]
      const {items} = newStatementAccount[index]
      const newItems = []
      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const item = items[itemIndex];
        for (let i = 0; i < searchFields.length; i++) {
          const key = searchFields[i];
          console.log('item[key]', item[key])
          if(item[key].toString().toLowerCase().match(cleanSearchVal)){
            newItems.push(item)
          }
        }
      }
      results.push({
        ...statementAccount[index], 
        items:newItems
      })
    }
    setStatementAccount(results)
    setIsSearched(true)
  }

  return (
    <Layout title="Extrato Conta Corrente - Banco Cora" section='Extrato'>
      {error ? <div>Ops...alguma coisa deu errado. Nosso time recebeu esse alerta, tente novamente daqui a pouco</div> : null }
      {!statementAccount ? 
          <div>Carregando...</div> 
          :
          <>
            <Filter onChange={handleFilter} onSearch={handleSearch} />
            <Timeline timeline={statementAccount}/>
          </>
      }
    </Layout>
  )
}

export default IndexPage
