var searchYouTube = ({query, key, max = 5}, callback) => {
  // TODO

  $.get('https://www.googleapis.com/youtube/v3/search', {
    q: query,
    key: key,
    maxResults: max,
    videoEmbeddable: true,
    type: 'video',
    part: 'snippet'
  })
  .done(({items}) => {
    callback(items);
  })
  .fail(({responseJSON}) => {
    console.log('error');
  })
};

export default searchYouTube;