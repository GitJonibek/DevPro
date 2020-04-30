import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post'

const PostForm = ({ addPost }) => {

  const [text, setText] = useState('');
  const [rows, setRows] = useState(5);

  const onChange = e => {
    setText(e.target.value);
    if(e.target.value.split('\n').length >= rows && rows < 15) setRows(rows + 1);
    if(e.target.value.split('\n').length < (rows - 1) && rows > 5 ) {
      setRows(rows - 1);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText('');
  }

  return (
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={e => onSubmit(e)} >

        <textarea style={{outline: 'none'}}
          name='text'
          cols='30'
          rows={rows}
          placeholder='Create a post'
          value={text}
          onChange={onChange} required />

        <input type='submit' className='btn btn-round-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
