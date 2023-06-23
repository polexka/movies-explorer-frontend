import useForm from '../../hooks/useForm';
import useValidation from '../../hooks/useValidation';
import './Register.css';
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
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
    onSubmit({
      email: form.values.email,
      password: form.values.password,
      name: form.values.name
    });
  }

  function handleChange(e) {
    form.handleChange(e);
    validity.handleChange(e);
  }

  return (
    <section className='register'>
      <Link to='/' className='link register__header-link register__logo' />
      <p className='register__greet'>Добро пожаловать!</p>

      <form
        className='register__form'
        onSubmit={handleSubmit}>
        <label className='register__label'>
          Имя
        </label>
        <input
          className={validity.values.name ? 'register__input' : 'register__input register__input_error'}
          type='text'
          name="name"
          value={form.values.name}
          onChange={handleChange}
          required minLength="2" maxLength="40"
        />
        <span className="register__span">
          {validity.values.name === Boolean(form.values.name) ? '' : 'Имя должно быть от 2 до 40 символов'}
        </span>

        <label className='register__label'>
          E-mail
        </label>
        <input
          className={validity.values.email ? 'register__input' : 'register__input register__input_error'}
          type='email'
          name="email"
          value={form.values.email}
          onChange={handleChange}
          required minLength="2" maxLength="40"
        />
        <span className="register__span">
          {validity.values.email === Boolean(form.values.email) ? '' : 'Введите email'}
        </span>

        <label className='register__label'>
          Пароль
        </label>
        <input
          className={validity.values.password ? 'register__input' : 'register__input register__input_error'}
          type="password"
          name="password"
          value={form.values.password}
          onChange={handleChange}
          required minLength="8" maxLength="40"
        />
        <span className="register__span">
          {validity.values.password === Boolean(form.values.password) ? '' : 'Пароль должен быть от 8 до 40 символов'}
        </span>


        <button
          className='register__button'
          type='submit'
          disabled={(validity.values.password && validity.values.email && validity.values.name) ? false : true}
        >
          Зарегистрироваться
        </button>

        <p className='register__text'>
          Уже зарегистрированы?
          <Link className='register__link' to='/signin'>Войти</Link>
        </p>
      </form>

    </section>
  )
}

export default Register;