import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

  return (
    <section className='cards'>
      <ul className='cards__list'>
        {props.cards.map((card) => (
          <MoviesCard
            key={card.id}
            name={card.nameRU}
            duration={card.duration}
            button="Сохранить"
            savedPage={props.saved}
          />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList;