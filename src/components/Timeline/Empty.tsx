import style from './Timeline.module.css'

const TimelineEmpty = () => {
  return (
    <div className={style.timelineEmpty}>
      <h4>
        nenhum item corresponde a sua busca =/
      </h4>
    </div>
  )
}


export default TimelineEmpty
