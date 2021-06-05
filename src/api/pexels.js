import { createClient } from 'pexels'

const client = createClient(process.env.PEXELS_CLIENT_KEY)
const query = 'Nature, City, Animals, Art'
const per_page = 4

const suffix = '?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=500&w=500'
 
const fetchNewImages = () => {
  const page = Math.floor(Math.random()*1999);

  return client.photos.curated({ query, per_page, page }).then((images) => {
    return images.photos.map(( { src: { original } } ) => original + suffix)
  })
}

export default fetchNewImages