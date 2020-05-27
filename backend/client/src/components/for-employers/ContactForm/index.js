import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Contact = (props) => {

  const [inputHandler, setInputHandler] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const { name, company, email, message } = inputHandler;
  const onchange = e => setInputHandler({ [e.target.name]: e.target.value });

  return (
    <div className='contact-container'>
      <div className='contact-background' onClick={props.clicked}/>
      <div className='contact-us'>
        <h1 className='large'>Let's get started!</h1>
        <p>Please provide us with some quick info about your company and we'll get back to you with a complete guide on our pricing and other details ASAP.</p>
        <form className='form'>
          <div className='form-group my-1'>
            <input required type='text' placeholder=' ' name='name' value={name} onChange={e => onchange(e)}/>
            <span className='placeholder-text'>Full name</span>
          </div>
          <div className='form-group my-1'>
            <input required type='text' placeholder=' ' name='company' value={company} onChange={e => onchange(e)}/>
            <span className='placeholder-text'>Company name</span>
          </div>
          <div className='form-group my-1'>
            <input required type='email' placeholder=' ' name='email' value={email} onChange={e => onchange(e)}/>
            <span className='placeholder-email'>Company email</span>
          </div>
          <div className='form-group my-1'>
            <textarea
              required
              rows='5'
              className='message'
              placeholder=' '
              name='message'
              value={message}
              onChange={e => onchange(e)}/>
          </div>
          <input type='submit' className='btn btn-primary' value='Submit'/>
        </form>
      </div>
    </div>
  )
}

export default Contact;
