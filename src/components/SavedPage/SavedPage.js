import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SavedDevider from "../SavedDevider/SavedDevider";
import SearchForm from "../SearchForm/SearchForm";
import Search from "../../utils/Search";
import { shortsDuration } from "../../utils/constants";

function SavedPage({ 
  cardsLoading, 
  cards, 
  handleSave, 
}) {
  const [visibleFilms, setVisibleFilms] = useState(cards);
  const [shortsOnly, setShortsOnly] = useState(false);

  function handleSearchMovie(searchStr) {
    if (shortsOnly) {
      setVisibleFilms(
        Search(cards.filter((movie) => movie.duration <= shortsDuration), searchStr)
      )
    } else {
      setVisibleFilms(
        Search(cards, searchStr)
      )
    }
  }

  function handleCheckbox() {

  }

  return (
    <>
      <SearchForm
        handleCheckbox={handleCheckbox}
        handleSearchMovie={handleSearchMovie}
        shortsOnly={shortsOnly}
        key='saved-movies-search'
      />
      {
        cardsLoading ?
          <Preloader />
          :
          <>
            <MoviesCardList
              cards={visibleFilms}
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