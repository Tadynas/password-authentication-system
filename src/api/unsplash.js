const regex = /photo-\w{1,}-\w{1,}/

const fetchNewImage = () => {
  return fetch('https://source.unsplash.com/random').then((response) => (
    response.url.match(regex)[0]
  ))
}

export default fetchNewImage