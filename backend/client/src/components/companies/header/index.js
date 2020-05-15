import React, {Fragment, useState} from 'react'

const Header = (props) => {

  const [search, setSearch] = useState('');

  return (
    <Fragment>
      <p>FILTER BY</p>
      <div className='company-form-group'>
        <input
          type="text"
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='search'/>
      </div>
    </Fragment>
  )
}

export default Header;
