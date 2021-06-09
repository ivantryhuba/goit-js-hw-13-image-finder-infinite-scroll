export default class PixApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles(searchQuery) {
    const API_KEY = '21947643-3ad5511e98ce1ab16d6eede2a';
    const URL = `https://pixabay.com/api/?q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal&key=${API_KEY}`;

    return fetch(URL)
      .then(response => response.json())
      .then(({hits}) => {
        this.page += 1;
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
