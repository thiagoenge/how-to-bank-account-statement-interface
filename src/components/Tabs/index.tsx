import { useState } from 'react'
import classNames from 'classnames'
import { Tabs } from 'src/interfaces'
import style from './Tabs.module.css'

const Tabs = ({items,type='pill', onChange}:Tabs) => {
  const [active, setActive] = useState('Tudo')

  const handleTabChange = (ev:React.MouseEvent<HTMLButtonElement>)=>{
    const { name } = ev.currentTarget
    setActive(name)
  }

  return (
    <ul className={style.tabsWrapper}>
      {items.map(tab=>(
        <li key={`${tab}-${tab.length}`}className={classNames(
          style.tabItem, 
          style[type],{ 
            [style.active]:tab === active
          })}>
            <button
              type="button" 
              name={tab}
              role="tab" 
              aria-selected="false" 
              id="simple-tab-0" 
              aria-controls="simple-tabpanel-0"
              onClick={handleTabChange}>
              {tab}
            </button>
        </li>
      ))}
    </ul>
  )
}

export default Tabs
