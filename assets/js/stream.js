function getUrlVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue){
  let urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars()[parameter];
      }
  return urlparameter;
}
let imdb = getUrlParam('id', 0)
if(!imdb) {
  window.location.href = 'index.html'
}

$.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://api.gdriveplayer.us/v1/imdb/'+imdb,
  type : 'get',
  dataType : 'json',
  success: function(result) {
    embedVideoUrl = 'http://database.gdriveplayer.us/player.php?imdb='+imdb
    $('.movie-media').attr('src', result.player_url)
    $('.title').text('title : '+result.Title)
    $('.released').text('released : '+result.Released)
    $('.duration').text('duration : '+result.Runtime)
    $('.country').text('country : '+result.Country)
    $('.imdb-rate').text('imdb-rate : '+result.imdbRating)
    $('.genre').text('genre : '+result.Genre)
    $('.actors').text('actors : '+result.Actors)
    $('.directors').text('directors : '+result.Director)
    $('.writers').text('writer : '+result.Writer)
    $('.productions').text('production : '+result.Production)
  }
})

