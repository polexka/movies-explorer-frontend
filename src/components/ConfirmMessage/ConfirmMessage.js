import './ConfirmMessage.css';

function ConfirmMessage({ message }) {

  return (
    <div className={message ? 'message message_active' : 'message'}>
      <p className='message__text message__text_confirm'>
        {message && message}
      </p>
    </div>
  )
}

export default ConfirmMessage;