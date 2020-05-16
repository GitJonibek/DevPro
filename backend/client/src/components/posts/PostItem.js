import React, { } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {addLike, removeLike, deletePost, getPost} from '../../actions/post'

const PostItem = ({
  auth,
  getPost,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, tags, avatar, user, likes, comments, date },
  showActions
}) => {

  const mTags = tags && tags.split(',').map(tag => <span key={Math.random()} className="profile-skill">{tag}</span>)

  return (
    <div className="post bg-white s-1 p-1">
      <div className='post-item-img'>
        <Link to={`/profile/${user}`}>
          <img className="round-img img-hovered" src={avatar} alt="" style={{width: '45px'}}/>
        </Link>
        <h4 className='text-primary'>{name.split(' ')[0]}</h4>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <div className='post-tags'>{mTags}</div>
        <div className='post-action-footer'>
          {showActions &&
            <div>
              <span type='button' className="btn-thumb-up btn-fixed-sm" onClick={(e) => addLike(_id)}>
                <i className="fas fa-thumbs-up"></i>{' '}
                {likes && likes.length > 0 && <span>{likes.length}</span> }
              </span>
              <span type='button' className="btn-thumb-down btn-fixed-sm"  onClick={(e) => removeLike(_id)}>
                <i className="fas fa-thumbs-down"></i>
              </span>
              <Link to={`/posts/${_id}`} className="btn-comment btn-fixed-sm" onClick={(e => getPost(_id))}>
                Comments{' '}
                {comments && comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  className="btn-danger btn-delete"
                  onClick={(e) => deletePost(_id)}>
                  Delete
                </button>
              )}
            </div>
          }
          <p className="post-date" >
            Posted on{' '} <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, getPost })(PostItem);
