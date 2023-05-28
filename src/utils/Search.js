export default function Search(moviesList, searchStr) {
  const searchResult = moviesList.filter((movie) => {
    return (
      ( movie['nameRU'].toLowerCase().indexOf(searchStr.toLowerCase()) + 1 ) ||
      ( movie['nameEN'].toLowerCase().indexOf(searchStr.toLowerCase()) + 1 )
    )
  })

  return searchResult;
}