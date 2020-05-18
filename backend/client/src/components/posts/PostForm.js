import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post'

const PostForm = ({ addPost, user, closed }) => {

  const [rows, setRows] = useState(5);
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');

  const onTagsChange = e => {
    setTags(e.target.value);
  }
  const onTextareChange = e => {
    setText(e.target.value);
    if(e.target.value.split('\n').length >= rows && rows < 15) setRows(rows + 1);
    if(e.target.value.split('\n').length < (rows - 1) && rows > 5 ) {
      setRows(rows - 1);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    addPost({ text, tags });
    setTags('');
    setText('');
    closed();
  }

  return (
    <div className='post-form'>
      <div className='cmp-view-backdrop' onClick={closed}/>
      <form
        className='form my-1'
        onSubmit={e => onSubmit(e)} >
        <div className='post-form-user'>
          <img src={user.avatar} alt=''/>
          <h3>{user.name}</h3>
          <span><i className="far fa-times-circle" onClick={closed}></i></span>
        </div>
        <textarea style={{outline: 'none'}}
          cols='30'
          rows={rows}
          placeholder='Create a post'
          value={text}
          onChange={(e) => onTextareChange(e)}
          required />
        <div className='form-group'>
          <input type='text'
            value={tags}
            onChange={(e) => onTagsChange(e)}
            placeholder=' '
            name='tags'/>
          <span className='placeholder-text'>Ex: react,nodejs, etc.</span>
        </div>
        <input type='submit' className='btn btn-round-dark' value='Submit' />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { addPost })(PostForm);
