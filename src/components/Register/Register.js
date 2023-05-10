import useForm from '../../hooks/useForm';
import useValidation from '../../hooks/useValidation';
import './Register.css';
import { Link } from "react-router-dom";

function Register(props) {
  const form = useForm({
    name: '',
    email: '',
    password: '',
  });
  const validity = useValidation({
    name: false,
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
      <Link to='/' className='link header__link header__logo login__logo' />
      <p className='greet_login'>Добро пожаловать!</p>

      <form
        className='login__form'
        onSubmit={handleSubmit}>
        <label className='login__label'>
          Имя
        </label>
        <input
          className={validity.values.name ? 'login__input' : 'login__input login__input_error'}
          type='name'
          name="name"
          value={form.values.name}
          onChange={handleChange}
          required minLength="2" maxLength="40"
        />
        <span className="login__span">
          {validity.values.name === Boolean(form.values.name) ? '' : 'Имя должно быть от 2 до 40 символов'}
        </span>

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
          required minLength="8" maxLength="40"
        />
        <span className="login__span">
          {validity.values.password === Boolean(form.values.password) ? '' : 'Пароль должен быть от 8 до 40 символов'}
        </span>


        <button
          className='login__button register__button'
          type='button'
        >
          Зарегистрироваться
        </button>

        <p className='login__text'>
          Уже зарегистрированы?
          <Link className='login__link' to='/signin'>Войти</Link>
        </p>
      </form>

    </section>
  )
}

export default Register;