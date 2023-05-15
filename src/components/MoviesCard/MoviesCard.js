import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
  const buttonClass = props.savedPage ? 'button movie__button movie__button_delete' : 'button movie__button';

  const [button, toggleButton] = useState(buttonClass);

  function toggle() {
    if (button === 'button movie__button') {
      toggleButton('button movie__button movie__button_saved');
      if (props.savedPage) {
        toggleButton(buttonClass);
      }
    } else {
      toggleButton('button movie__button');
    }
  }

  function getNoun(number, word) {
    let n = number % 100;
    if (n >= 5 && n <= 20) {
      return word[2];
    }
    n %= 10;
    if (n === 1) {
      return word[0];
    }
    if (n >= 2 && n <= 4) {
      return word[1];
    }
    return word[2]
  }


  return (
    <li className='movie'>
      <p className='movie__name'>{props.name}</p>
      <p className='movie__duration'>
        {props.duration + ' ' + getNoun(props.duration, ['минута', 'минуты', 'минут'])}
      </p>
      <div className='movie__preview' />
      <button
        className={button}
        type='button'
        aria-label='Сохранить'
        onClick={toggle}
      />
    </li>
  )
}

export default MoviesCard;