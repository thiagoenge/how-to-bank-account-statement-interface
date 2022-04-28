import { useState } from 'react'
import classNames from 'classnames'
import { TabsProps } from 'src/interfaces'
import style from './Tabs.module.css'
import { useDidUpdateEffect } from 'src/utils/custom-hooks'

const Tabs = ({items, initialValue, onChange}: TabsProps) => {
  const [active, setActive] = useState(initialValue);

  const handleTabChange = (ev:React.MouseEvent<HTMLButtonElement>) =>
    setActive(ev.currentTarget.name);

  useDidUpdateEffect(() => onChange(active), [active]);

  return (
    <ul className={style.tabsWrapper}>
      {items.map((value: string) => (
          <li
            key={value}
            className={
              classNames(
                style.tabItem, 
                style.pill,
                { 
                  [style.active]: value === active
                }
              )
            }
          >
            <button
              type="button" 
              name={value}
              role="tab" 
              aria-selected="false" 
              id="simple-tab-0" 
              aria-controls="simple-tabpanel-0"
              onClick={handleTabChange}
            >
              {value}
            </button>
          </li>
        )
      )}
    </ul>
  )
}

export default Tabs
