import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='form'>
        <label className='form__search'>
          <input className='form__input' type="search" placeholder='Фильм' />
          <button className='form__button' type="submit" />
        </label>
        
        <label className='form__search'>
          <input type='checkbox' className='form__checkbox' />
          <div className='form__checkbox_switch' />
          <p className='form__label'>Короткометражки</p>
        </label>
        
      </form>
      <div className='section__underscore search__underscore' />
    </section>
  )
}

export default SearchForm;