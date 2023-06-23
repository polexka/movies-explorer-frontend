import './ErrorMessage.css';

function ErrorMessage({ message }) {

  return (
    <div className={message ? 'message message_active' : 'message'}>
      <p className='message__text'>
        {message && message}
      </p>
    </div>
  )
}

export default ErrorMessage;