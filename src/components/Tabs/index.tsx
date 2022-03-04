import { useState } from 'react'
import classNames from 'classnames'
import { Tabs } from 'src/interfaces'
import style from './Tabs.module.css'
import { useDidUpdateEffect } from 'src/utils/custom-hooks'

const Tabs = ({items,type='pill', onChange}:Tabs) => {
  const [active, setActive] = useState(Object.keys(items)[0])
  const handleTabChange = (ev:React.MouseEvent<HTMLButtonElement>)=>{
    const { name } = ev.currentTarget
    setActive(name)
  }

  useDidUpdateEffect(()=>{
    onChange(active)
  },[active])

  return (
    <ul className={style.tabsWrapper}>
      {Object.keys(items).map(key=>{
        return(
          <li key={`${key}-${key.length}`}className={classNames(
            style.tabItem, 
            style[type],{ 
              [style.active]:key === active
            })}>
              <button
                type="button" 
                name={key}
                role="tab" 
                aria-selected="false" 
                id="simple-tab-0" 
                aria-controls="simple-tabpanel-0"
                onClick={handleTabChange}>
                {items[key]}
              </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Tabs
