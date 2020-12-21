import { createClient } from 'pexels'

const client = createClient('563492ad6f917000010000013fe1cee805884a23b65c3c701e001c16')

const fetchRandomImages = () => {
  const query = 'Nature';

  client.photos.search({ query, per_page: 4 }).then(photos => {console.log(photos)})
}

export default fetchRandomImages