export function fetchWhichMovies() {
    let which_movies = localStorage.getItem("which_movies")
    if (which_movies) {
        return JSON.parse(which_movies)
    }
    else {
        return "top_rated"
    }
}

export function storeWhichMovies(data) {
    localStorage.setItem("which_movies", JSON.stringify(data))
}

export function fetchSortedBy() {
    let sorted_by = localStorage.getItem("sorted_by")
    if (sorted_by) {
        return JSON.parse(sorted_by)
    }
    else {
        return "descending"
    }
}

export function storeSortedBy(data) {
    localStorage.setItem("sorted_by", JSON.stringify(data))
}

export function fetchLanguage() {
    let language = localStorage.getItem("language")
    if (language) {
        return JSON.parse(language)
    }
    else {
        return "en-US"
    }
}

export function storeLanguage(data) {
    localStorage.setItem("language", JSON.stringify(data))
}

export function fetchInput() {
    let input = localStorage.getItem("input")
    if (input) {
        return JSON.parse(input)
    }
    else {
        return ""
    }
}

export function storeInput(data) {
    localStorage.setItem("input", JSON.stringify(data))
}