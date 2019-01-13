const api = "http://www.omdbapi.com/?apikey=576f8801";

export const searchByTitle = (title, page) => fetch(`${api}&s=${title}&page=${page}`)
    .then(res => res.json())
    .catch(err => { throw err });
