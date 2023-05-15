import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='form'>
        <div className='form__search'>
          <input className='form__input' type="search" placeholder='Фильм' required />
          <button className='form__button' type="submit" />
        </div>
        
        <label className='form__search'>
          <input type='checkbox' className='form__checkbox' />
          <span className='form__checkbox-switch' />
          <span className='form__label'>Короткометражки</span>
        </label>
        
      </form>
      <div className='search__underscore' />
    </section>
  )
}

export default SearchForm;