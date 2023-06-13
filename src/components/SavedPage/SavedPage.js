import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SavedDevider from "../SavedDevider/SavedDevider";
import SearchForm from "../SearchForm/SearchForm";

function SavedPage({ 
  cardsLoading, 
  cards, 
  handleSave, 
  handleCheckbox,  
  handleSearchMovie,
}) {
  return (
    <>
      <SearchForm
        handleCheckbox={handleCheckbox}
        handleSearchMovie={handleSearchMovie}
      // key='saved-movies-search'
      />
      {
        cardsLoading ?
          <Preloader />
          :
          <>
            <MoviesCardList
              cards={cards}
              handleSave={handleSave}
              savedPage={true}
              key='saved-movies'
            />
            <SavedDevider />
          </>
      }
    </>
  )
}

export default SavedPage;