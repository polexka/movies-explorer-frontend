import { useContext, useState } from 'react';
import './Profile.css';
import useForm from '../../hooks/useForm';
import { CurrentAuthContext } from '../../contexts/CurrentAuthContext';
import useValidation from '../../hooks/useValidation';

function Profile({ patchUser, signOut }) {
  const currentUser = useContext(CurrentAuthContext);

  const form = useForm({
    name: currentUser.name,
    email: currentUser.email
  });

  const validity = useValidation({
    name: true,
    email: true
  });

  const [edit, setEdit] = useState(false);

  function handleChange(e) {
    form.handleChange(e);
    validity.handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    patchUser(form.values);
    setEdit(false);
  }

  function handleClick(e) {
    e.preventDefault();
    setEdit(true);
  }

  function handleSignOut(e) {
    e.preventDefault();
    signOut();
  }

  return (
    <section className='profile'>
      <p className='profile__name'>Привет, {currentUser.name}!</p>

      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__field'>
          <label className='profile__label'>
            Имя
          </label>
          <input
            className={validity.values.name ? 'profile__input' : 'profile__input profile__input_error'}
            value={form.values.name}
            name='name'
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <span className='profile__span'>
          {validity.values.name ? '' : 'Введите имя'}
        </span>
        <div className='profile__underscore' />
        <div className='profile__field'>
          <label className='profile__label'>
            E-mail
          </label>
          <input
            className={validity.values.email ? 'profile__input' : 'profile__input profile__input_error'}
            value={form.values.email}
            name='email'
            onChange={handleChange}
            disabled={!edit}
          />
        </div>
        <span className='profile__span'>
          {validity.values.email ? '' : 'Введите email'}
        </span>

        {
          edit ?
            (
              <button
                className='button profile__button'
                type='submit'
                disabled={
                  (
                    validity.values.email && validity.values.name &&
                    ((form.values.name != currentUser.name) || (form.values.email != currentUser.email))
                  ) ?
                    false : true
                }
              >
                Сохранить
              </button>
            ) :
            (
              <button
                className='button profile__button'
                type='button'
                onClick={handleClick}
              >
                Редактировать
              </button>
            )
        }

        <button
          className='button profile__button profile__button_exit'
          type='button'
          onClick={handleSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  )
}

export default Profile;