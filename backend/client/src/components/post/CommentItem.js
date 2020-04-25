import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { removeComment } from '../../actions/post';

const CommentItem = ({ postId, comment: { date, _id, text, name, avatar, user }, auth, removeComment }) => {

  return (
    <div className="post bg-white p-1 my-1">
      <div className='img-wrapper'>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" style={{width: '70px'}}/>
          <h4 className='text-primary'>{name.split(' ')[0]}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date" style={{fontSize: '0.9em', color: '#666'}}>
          Commented on:{' '}
          <Moment format='YYYY/MM/DD hh:mm'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id &&
          <button
            style={{margin: '5px 0'}}
            type='button'
            className='btn-danger btn-delete'
            onClick={(e) => removeComment(postId, _id)}>
            Delete
          </button>
        }
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
