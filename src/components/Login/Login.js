import useForm from '../../hooks/useForm';
import useValidation from '../../hooks/useValidation';
import './Login.css';
import { Link } from "react-router-dom";

function Login(props) {
  const form = useForm({ email: '', password: '' });
  const validity = useValidation({
    email: false,
    password: false
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      email: form.values.email,
      password: form.values.password
    });
  }

  function handleChange(e) {
    form.handleChange(e);
    validity.handleChange(e);
  }

  return (
    <section className='login'>
      <Link to='/' className='link login__header-link login__logo' />
      <p className='login__greet'>Рады видеть!</p>

      <form
        className='login__form'
        onSubmit={handleSubmit}>
        <label className='login__label'>
          E-mail
        </label>
        <input
          className={validity.values.email ? 'login__input' : 'login__input login__input_error'}
          type='email'
          name="email"
          value={form.values.email}
          onChange={handleChange}
          required minLength="2" maxLength="40"
        />
        <span className="login__span">
          {validity.values.email === Boolean(form.values.email) ? '' : 'Введите email'}
        </span>

        <label className='login__label'>
          Пароль
        </label>
        <input
          className={validity.values.password ? 'login__input' : 'login__input login__input_error'}
          type="password"
          name="password"
          value={form.values.password}
          onChange={handleChange}
          required minLength="2" maxLength="200"
        />
        <span className="login__span">
          {validity.values.password === Boolean(form.values.password) ? '' : 'Пароль должен быть от 8 до 40 символов'}
        </span>

        <button
          className='login__button'
          type='button'
        >
          Войти
        </button>

        <p className='login__text'>
          Ещё не зарегистрированы?
          <Link className='login__link' to='/signup'>Регистрация</Link>
        </p>
      </form>

    </section>
  )
}

export default Login;