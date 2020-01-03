function getUrlVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

$(document).ready(function(){
  $('.sidenav').sidenav();
});

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

function addLoadingAnimation(selector) {
  $('.'+selector).append(`
  <div class="load-animation">
  <div class="col s12 xl12 l12 m12 mt-5 mb-5 align-center center-align">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
`)
}

addLoadingAnimation('load-movie')
$.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://api.gdriveplayer.us/v1/imdb/'+imdb,
  type : 'get',
  dataType : 'json',
  success: function(result) {
    embedVideoUrl = 'http://database.gdriveplayer.us/player.php?imdb='+imdb
    $('.movie-media').attr('src', embedVideoUrl)
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
    $('.movie-media').load(function() {
      $('.load-animation').html('')
    })
  }
})

