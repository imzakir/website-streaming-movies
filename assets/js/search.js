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
$(document).ready(function(){
  $('.sidenav').sidenav();
  //add loading animation

  // loadMovies(1)
});

function loadMovies(query) {
  let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.gdriveplayer.us/v1/movie/search?title='+query+'&limit=20'
  $.ajax({
    url: baseUrl,
    type : 'get',
    dataType : 'json',
    success: function(docs) {
      if (docs == null) {
        $('.load-animation').html('')
        $('.loading').html('')  
        $('.result-amount').text('0 movies found')
        return
      }
      $('.result-amount').text(docs.length+' movies')
      $('.load-animation').html('')
      docs.forEach(doc => {
        $('.movies-list').append(`
          <div class="col s6 m6 l3 xl3">
          <a href="stream.html?id=${doc.imdb}">
              <div class="card">
                <div class="card-image">
                  <img src="${doc.poster}">

                </div>
                <div class="card-content blue-grey darken-4">
                  <p style="color: white;">${doc.title} ${doc.year}</p>
                </div>
              </div>
            </a>
          </div>
        `)

      })
    }
  })
}

$('.btn-search').on('click', function() {
  $('.result-amount').text('')
  $('.movies-list').html('')
  $('.result-text').text('SEARCH RESULT FOR : '+$('.search-input').val().toUpperCase())
  addLoadingAnimation('movies-list')
  loadMovies($('.search-input').val())
})