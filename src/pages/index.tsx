import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'src/utils/fetcher'
import {sortDates} from 'src/utils/handle-dates'
import Layout from 'src/components/Layout'
import Filter, { FilterData } from 'src/components/Filter'
import Timeline from 'src/components/Timeline'
import { AccountStatementFilterStatus, AccountStatementItem, AccountStatementItemWrapper } from 'src/interfaces'

const IndexPage = () => {
  const { data, error } = useSWR('/api/statement', fetcher);
  const [sortedData, setSortedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(()=>{
    if (data) {
      const sortDatesDesc = sortDates(data.results)
      setSortedData(sortDatesDesc);
      setFilteredData(sortDatesDesc);
    }
  }, [data])

  const onFilterChange = (filterData: FilterData) => {
    if (!sortedData) return;

    const newFilteredData = sortedData.map((timelineItem: AccountStatementItemWrapper) => ({
      ...timelineItem,
      items: timelineItem.items.filter(item => filterByStatus(item, filterData.status) && filterByText(item, filterData.text))
    })).filter(timelineItem => timelineItem.items.length > 0);

    setFilteredData(newFilteredData);
  }

  const filterByStatus = (item: AccountStatementItem, status: AccountStatementFilterStatus) => {
    if (status === AccountStatementFilterStatus.ALL) return true;
    
    if (status === AccountStatementFilterStatus.PENDING && item.status === 'PENDING') return true;

    if (item.status !== 'PENDING' && AccountStatementFilterStatus[item.entry] === status) return true;

    return false;
  }

  const filterByText = (item: AccountStatementItem, text: string) => {
    const searchFields = ["actor", "amount"];
    const sanitizedText = text.toLowerCase().replace(/r\$|\.|,/, '').trim();
    
    if (sanitizedText === "") return true;
    
    return searchFields.findIndex(key => item[key].toString().toLowerCase().match(sanitizedText)) >= 0;
  }

  return (
    <Layout title="Extrato Conta Corrente - Banco Cora" section='Extrato'>
      {error ? <div>Ops...alguma coisa deu errado. Nosso time recebeu esse alerta, tente novamente daqui a pouco</div> : null }
      {!filteredData ? 
          <div>Carregando...</div> 
          :
          <>
            <Filter onChange={onFilterChange} />
            <Timeline timeline={filteredData}/>
          </>
      }
    </Layout>
  )
}

export default IndexPage
