import { useEffect, useState } from 'react';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

function SearchForm({ handleCheckbox, handleSearchMovie }) {
  const checked = localStorage.getItem('shorts');
  const [value, setValue] = useState(checked === 'true' ? true : false);
  const form = useForm({ search: '' });

  function handleCheckboxChange() {
    setValue(!value);
    handleCheckbox();
  }

  function handleChange(e) {
    form.handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchMovie(form.values.search);
  }

  useEffect(() => {
    localStorage.setItem('shorts', value);
  }, [value])

  return (
    <section className='search'>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <div className='form__search'>
          <input
            className='form__input'
            type="search"
            name='search'
            placeholder='Фильм'
            value={form.values.search}
            onChange={handleChange}
          />
          <button className='form__button' type="submit" />
        </div>

        <label className='form__search'>
          <input
            type='checkbox'
            className='form__checkbox'
            checked={value}
            onChange={handleCheckboxChange}
          />
          <span className='form__checkbox-switch' />
          <span className='form__label'>Короткометражки</span>
        </label>

      </form>
      <div className='search__underscore' />
    </section>
  )
}

export default SearchForm;