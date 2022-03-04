import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'src/utils/fetcher'
import {parseItemHeadDate, sortDates} from 'src/utils/handle-dates'
import Layout from 'src/components/Layout'
import Filter from 'src/components/Filter'
import Timeline from 'src/components/Timeline'

const IndexPage = () => {
  const { data, error } = useSWR('/api/statement', fetcher)
  const [initialStatementAccount, setInitialStatementAccount] = useState(null)
  const [statementAccount, setStatementAccount] = useState(initialStatementAccount)
  
  useEffect(()=>{
    if(data) {
      const {results} = data
      const sortDatesDesc = sortDates(results)
      const parsedTimeline = sortDatesDesc.reduce((acc, item)=>{
        acc[item.date] =  {
          ...item, 
          dateParsed:parseItemHeadDate(item.date)
        }
        return acc
      },{})
      setInitialStatementAccount(parsedTimeline)
    }
  },[data])

  useEffect(()=>{
    setStatementAccount(initialStatementAccount)
  },[initialStatementAccount])

  const handleFilter = (status):void=>{
    console.log('handleFilter', status)
    if(status === 'ALL'){
      setStatementAccount(initialStatementAccount)
      return
    }
    const newStatementAccount = {...initialStatementAccount}
    Object.keys(newStatementAccount).map((timelineKey)=>{
      const timelineItem = newStatementAccount[timelineKey]
      console.log('timelineItem.items', timelineItem.items)
      let newTimelineItems:[]
      if(status!=='FUTURE') {
        newTimelineItems = timelineItem.items.filter(item=>item.entry===status)
      } else{
        newTimelineItems = timelineItem.items.filter(item=>item.scheduled)
      }
      console.log('newTImelineItems', newTimelineItems, timelineKey)
      
      newStatementAccount[timelineKey] = {...timelineItem, items:newTimelineItems}
      
    })
    console.log('newStatementAccount',newStatementAccount)
    setStatementAccount(newStatementAccount)
  }

  return (
    <Layout title="Extrato Conta Corrente - Banco Cora" section='Extrato'>
      {error ? <div>Ops...alguma coisa deu errado. Nosso time recebeu esse alerta, tente novamente daqui a pouco</div> : null }
      {!statementAccount ? 
          <div>Carregando...</div> 
          :
          <>
            <Filter onChange={handleFilter} />
            <Timeline timeline={statementAccount}/>
          </>
      }
    </Layout>
  )
}

export default IndexPage
