import { useState } from 'react';
import './Profile.css';
import useForm from '../../hooks/useForm';

function Profile(props) {
  const form = useForm({name: props.name, email: props.email});
  const [inputs, setInputs] = useState({name: true, email: true});

  function handleChange(e) {
    form.handleChange(e);
  }

  function handleClick() {
    if (!inputs.name) {
      //тут сохраняются данные, валидируются и отправляются ( тк нажата кнопка сохранить )
      props.setUser(form.values);
    }

    setInputs({name: !inputs.name, email: !inputs.email});
  }

  return (
    <section className='profile'>
      <p className='profile__name'>Привет, {props.name}!</p>

      <form className='profile__form'>
        <div className='profile__field'>
          <label className='profile__label'>
            Имя
          </label>
          <input
            className='profile__input'
            value={form.values.name}
            name='name'
            onChange={handleChange}
            disabled={inputs.name}
          />
        </div>
        <div className='section__underscore profile__underscore' />
        <div className='profile__field'>
          <label className='profile__label'>
            E-mail
          </label>
          <input
            className='profile__input'
            value={form.values.email}
            name='email'
            onChange={handleChange}
            disabled={inputs.email}
          />
        </div>

        <button className='button profile__button' type='button' onClick={handleClick}>
          {inputs.name ? 'Редактировать' : 'Сохранить'}
        </button>
        <button className='button profile__button profile__button_exit' type='button'>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  )
}

export default Profile;