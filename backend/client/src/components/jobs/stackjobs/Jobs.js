import React from 'react'
import JobItem from './JobItem'
import JobView from './jobview/JobView'

const StackJobs = (props) => {
  return (
    <div className="gl_jobs_container">
      <header className="jobs_header">
        <input type="text" name="search" />
        <input type="text" name="location" />
      </header>
      <main className="jobs_main">
        <section className="jobs_list">
          <div className="jobs_list_wrapper">
            <JobItem />
          </div>
        </section>
        <section className="jobs_viewer_item">
          <JobView />
        </section>
      </main>
    </div>
  )
}

export default StackJobs;
