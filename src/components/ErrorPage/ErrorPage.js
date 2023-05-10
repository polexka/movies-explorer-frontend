import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  const history = useHistory();
  
  return (<section className='error'>
    <p className='error__accent'>
      404
      </p>
      <p className='error__text'>
      Страница не найдена
      </p>
      <button className='button error__button' onClick={() => history.goBack()}>
        Назад
      </button>
  </section>);
}

export default ErrorPage;