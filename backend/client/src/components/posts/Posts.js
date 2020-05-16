import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
//import Urls from '../../assets/urls'

import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'


const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [post, setPost] = useState(false);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const bk = require('../../assets/posts-bk.svg');

  return loading ? <Spinner /> : (
    <Fragment>
      <div className='posts-backdrop-img' style={{height: `${window.height}`}}>
        <img src={bk} alt=''/>
      </div>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        Welcome to the community!
      </p>
      {post && <PostForm closed={() => setPost(false)}/>}
      {
        <div className="masonry-wrapper">
          {posts.map(post => (
            <PostItem key={post._id} post={post}/>
          ))}
        </div>
      }
      <div className='posts-fab' onClick={() => setPost(true)}>+</div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
