import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SavedDevider from "../SavedDevider/SavedDevider";
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
  if (!localStorage.getItem('lastSearch')) {
    localStorage.setItem('lastSearch', JSON.stringify({ searchStr: '', shortsOnly: false }));
  }
  const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
  
  return (
    <>
      <SearchForm
        handleCheckbox={handleCheckbox}
        handleSearchMovie={handleSearchMovie}
        shortsOnly={lastSearch.shortsOnly}
        searchStr={lastSearch.searchStr}
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
              <SavedDevider />
            )
      }
    </>
  )
}

export default MoviesPage;