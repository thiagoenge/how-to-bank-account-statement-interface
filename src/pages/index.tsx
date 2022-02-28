import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'src/utils/fetcher'
import {parseItemDate, sortDates} from 'src/utils/handle-dates'
import Layout from 'src/components/Layout'
import Filter from 'src/components/Filter'
import Timeline from 'src/components/Timeline'

const IndexPage = () => {
  const { data, error } = useSWR('/api/statement', fetcher)
  const [statementAccount, setStatementAccount] = useState(null)
  
  useEffect(()=>{
    if(data) {
      const {results} = data
      console.log('data', data)
      const sortDatesDesc = sortDates(results)
      const parsedTimeline = sortDatesDesc.reduce((acc, item)=>{
        acc[item.date] = {...item, dateParsed:parseItemDate(item.date)}
        return acc
      },{})
      console.log('parsedTimeline', Object.keys(parsedTimeline))
      setStatementAccount(parsedTimeline)
    }
  },[data])

  return (
    <Layout title="Extrato Conta Corrente - Banco Cora" section='Extrato'>
      <Filter/>
      {error ? <div>Ops...alguma coisa deu errado. Nosso time recebeu esse alerta, tente novamente daqui a pouco</div> : null }
      {!statementAccount ? 
        <div>Carregando...</div> 
        : <Timeline timeline={statementAccount}/>
      }
    </Layout>
  )
}

export default IndexPage
