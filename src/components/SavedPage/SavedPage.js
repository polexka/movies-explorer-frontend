import { useEffect, useRef, useState } from "react";
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
  const [searchStr, setSearch] = useState('');
  const [shortsOnly, setShortsOnly] = useState(false);

  function handleSearchMovie(searchStr) {
    setSearch(searchStr);
    if (shortsOnly) {
      setVisibleFilms(
        Search(cards.filter((movie) => movie.duration <= shortsDuration), searchStr)
      )
    } else {
      setVisibleFilms(Search(cards, searchStr))
    }
  }

  function handleCheckbox() {
    setShortsOnly(!shortsOnly);
    if (searchStr) {
      if (!shortsOnly) {
        setVisibleFilms(
          Search(cards.filter((movie) => movie.duration <= shortsDuration), searchStr)
        )
      } else {
        setVisibleFilms(Search(cards, searchStr))
      }
    } else {
      if (!shortsOnly) {
        setVisibleFilms(
          cards.filter((movie) => movie.duration <= shortsDuration)
        )
      } else {
        setVisibleFilms(cards)
      }
    }
  }

  useEffect(() => {
    if (searchStr) {
      setVisibleFilms(Search(cards, searchStr))
    } else {
      setVisibleFilms(cards);
    }

    if (shortsOnly) {
      setVisibleFilms((state) => state.filter((movie) => movie.duration <= shortsDuration))
    }

  }, [cards])

  return (
    <>
      <SearchForm
        handleCheckbox={handleCheckbox}
        handleSearchMovie={handleSearchMovie}
        shortsOnly={shortsOnly}
        searchStr={''}
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