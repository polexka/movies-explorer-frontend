import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function MoviesPage({
  cardsLoading,
  handleCheckbox,
  handleSearchMovie,
  cards,
  handleSave,
  isEnd,
  loadMore,
}) {
  const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));

  return (
    <>
      <SearchForm
        handleCheckbox={handleCheckbox}
        handleSearchMovie={handleSearchMovie}
        key='movies-search'
      />
      {
        cardsLoading ?
          (
            <Preloader />
          )
          :
          lastSearch.searchStr ?
            (
              <MoviesCardList
                cards={cards}
                handleSave={handleSave}
                savedPage={false}
                isEnd={isEnd}
                loadMore={loadMore}
                key='movies'
              />
            )
            :
            (
              <></>
            )
      }
    </>
  )
}

export default MoviesPage;