import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { getNoun } from '../../utils/constants';

function MoviesCard({
  card,
  handleSave,
  savedPage,
  name,
  duration,
  imageUrl,
  trailerLink,
  saved
}) {
  const buttonClass = savedPage ?
    'button movie__button movie__button_delete' :
    saved ? 'button movie__button movie__button_saved' : 'button movie__button';

  const [button, toggleButton] = useState(buttonClass);

  useEffect(() => {
    const newClass = savedPage ?
      'button movie__button movie__button_delete' :
      saved ? 'button movie__button movie__button_saved' : 'button movie__button';
    toggleButton(newClass);

  }, [saved, savedPage]);

  function saveCard() {
    handleSave(card);
  }

  return (
    <li className='movie'>
      <p className='movie__name'>
        <a
          rel="noreferrer"
          href={trailerLink}
          target='_blank'
          className='movie__link'
        >
          {name}
        </a>
      </p>
      <p className='movie__duration'>
        {duration + ' ' + getNoun(duration, ['минута', 'минуты', 'минут'])}
      </p>
      <a
        rel="noreferrer"
        href={trailerLink}
        target='_blank'
        className='movie__link'
      >
        <img className='movie__preview' src={imageUrl} alt={name} />
      </a>
      <button
        className={button}
        type='button'
        aria-label='Сохранить'
        onClick={saveCard}
      />
    </li>
  )
}

export default MoviesCard;