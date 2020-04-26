import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {

  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className='profile-github'>
      <h2 className="text-primary my-1"> <i className="fab fa-github"></i> Github Repos </h2>
      { repos === null ? <Spinner /> : (
        repos.map((repo, index) => (
          <div key={index} className='repo bg-white p-1 my-1' >
            <div>
              <h4><a className='text-primary' href={repo.html_url} rel='opener'>{repo.name}</a></h4>
              <p className='text-primary-light'>{repo.description}</p>
            </div>

            <div>
              <ul>
                <li className=""><i className="fas fa-star"></i>{' '}{repo.stargazers_count}</li>
                <li className=""><i className="fas fa-eye"></i>{' '}{repo.watchers_count}</li>
                <li className="">{' '}<i className="fas fa-code-branch"></i>{' '}{repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
