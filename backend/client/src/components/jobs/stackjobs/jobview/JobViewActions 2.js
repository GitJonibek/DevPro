import React, {Fragment} from 'react'

const Actions = (props) => {
  return (
    <Fragment>
      <button
        onClick={props.clicked}
        className='btn-jobview-apply'>
        Details to Apply
      </button>
      <button
        className='btn-jobview-save'>
        Save
      </button>
    </Fragment>
  )
}

export default Actions;
