import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from '../More/More';

function MoviesCardList({
  cards,
  handleSave,
  isEnd,
  loadMore,
  savedPage
}) {

  const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));

  return (
    <section className='cards'>
      {
        cards.length ?
          (
            <>
              <ul className='cards__list'>
                {
                  cards.map((card, i) => (
                    <MoviesCard
                      key={i}
                      handleSave={handleSave}
                      card={card}
                      name={card.nameRU}
                      duration={card.duration}
                      imageUrl={card.image}
                      trailerLink={card.trailerLink}
                      button="Сохранить"
                      savedPage={savedPage}
                      saved={card.saved}
                    />
                  ))
                }
              </ul>
              {(!savedPage && !isEnd) && (<More loadMore={loadMore} />)}
            </>
          ) :
          (
            <div>
              <p className='cards__empty'>
                Ничего не найдено
              </p>
            </div>
          ) 
      }

    </section >
  )
}

export default MoviesCardList;