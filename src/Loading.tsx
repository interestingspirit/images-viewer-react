import * as React from 'react'

export interface LoadingProps {
  style?: React.CSSProperties
}

const Loading = (props: LoadingProps): React.ReactElement => {
  const cls = 'circle-loading'
  return (
    <div className='loading-wrap' style={props.style}>
      <div className={cls}></div>
    </div>
  )
}

export default Loading
