export async function getSearchRequest(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=e333684dcb3e9eac6a70505572519a23&language=en-US&query=${query}&page=1&include_adult=false`;
    const response = await fetch(searchUrl);
    const responseJson = await response.json();
    const searchResults = responseJson.results;

    return searchResults;
}

export async function getWhereRequest(id) {
    const serviceUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=e333684dcb3e9eac6a70505572519a23`;
    const response = await fetch(serviceUrl);
    const responseJson = await response.json();
    const serviceseResponse = responseJson.results;

    return serviceseResponse;
}

export async function getWhereRequestSeries(id) {
    const serviceUrl = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=e333684dcb3e9eac6a70505572519a23`;
    const response = await fetch(serviceUrl);
    const responseJson = await response.json();
    const serviceseResponse = responseJson.results;

    return serviceseResponse;
}

export async function getMovieWithId(id) {
    const searchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=e333684dcb3e9eac6a70505572519a23&language=en-US`;
    const response = await fetch(searchUrl);
    const responseJson = await response.json();
    const searchResults = responseJson;

    return searchResults;
}

export async function getTvWithId(id) {
    const searchUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=e333684dcb3e9eac6a70505572519a23&language=en-US`;
    const response = await fetch(searchUrl);
    const responseJson = await response.json();
    const searchResults = responseJson;

    return searchResults;
}