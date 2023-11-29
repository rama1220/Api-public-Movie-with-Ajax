  function searchMovie() {

      $('#movie-list').html('');

      $.ajax({

          url: 'http://www.omdbapi.com',
          type: 'get',
          dataType: 'json',
          data: {
              'apikey': 'dba794f8',
              's': $('#search-input').val()
          },
          success: function (result) {
              if (result.Response == "True") {
                  let movie = result.Search;
                  $.each(movie, function (i, data) {
                      $('#movie-list').append(`
                      <div class = "col-md-3">
                      <div class="card-1">
                      <div class = "card mb-3 card-body">
                          <img src = "` + data.Poster + `"class = "card-img-top" alt = "..." >
                          <div class = "card-body" >
                          <h5 class = "card-title"> ` + data.Title + ` </h5> 
                          <p class = "card-text">` + data.Year + `</p> 
                          <a href = "#" class ="btn btn-primary"
                      data-bs-toggle = "modal"
                      data-bs-target = "#exampleModal" data-id="` + data.imdbID + `" > Details </a> </div>
                      </div> </div >
                      </div>
                      `)
                  });

              } else {
                  $('#movie-list').html(`
            <div class="col">
            <h1 class="text-center">` + result.Error + `</h1></div>
    
            `)
              }
          }
      });
  }
  $('#search-button').on('click', function () {
      searchMovie();
  })
  $('#search-input').on('keyup', function (e) {
      if (e.keyCode == 13) {
          searchMovie();
      }
  });


  $('#movie-list').on('click', '.btn', function () {

      $.ajax({
          url: 'http://www.omdbapi.com',
          type: 'get',
          dataType: 'json',
          data: {
              'apikey': 'dba794f8',
              'i': $(this).data('id')
          },
          success: function (movie) {
              if (movie.Response == "True") {
                  $('.modal-body').html(`
                <div class="container-fluid">
                <div class="row">
                <div class="col-md-4">
                <img src="` + movie.Poster + `" class="img-fluid">
                </div>
                <div class="col-md-8">
                <ul class = "list-group" >
                    <li class ="list-group-item"> <h3> ` + movie.Title + ` </h3> </li >
                    <li class ="list-group-item"> Released : ` + movie.Released + ` </li> 
                    <li class ="list-group-item"> Genre :` + movie.Genre + ` </li> 
                    <li class ="list-group-item"> Director : ` + movie.Director + ` </li> 
                    <li class = "list-group-item"> Actor: ` + movie.Actors + ` </li> 
                    <li class ="list-group-item"> Plot : ` + movie.Plot + ` </li> 
                    </ul>

                </div>
                </div></div>
                `)
              }
          }
      });

  });