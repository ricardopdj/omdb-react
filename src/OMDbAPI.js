const api = "http://www.omdbapi.com/?apikey=576f8801&s=";

export const searchByTitle = (title) => fetch(`${api}${title}`)
    .then(res => res.json())
    .catch(err => { throw err });
