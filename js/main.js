(function musicDB() {
  this.init = function() {
    this.search();
  };

  this.search = function() {
    var form = document.querySelector("#form");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var value = document.querySelector("#input_search").value;
      form.reset();
      getData(value.split(" ").join("+"));
    });
  };

  this.getData = function(artist) {
    var http = new XMLHttpRequest();
    var url =
      "https://itunes.apple.com/search?term=" + artist + "&entity=album";
    var method = "GET";

    var container = document.querySelector("#album_list_container");
    container.innerHTML = "";

    http.open(method, url);
    http.onreadystatechange = function() {
      if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        showArtist(JSON.parse(http.response));
      } else if (
        http.readyState === XMLHttpRequest.DONE &&
        http.status !== 200
      ) {
        alert("Something went wrong.");
      }
    };
    http.send();
  };

  this.showArtist = function(obj) {
    var container = document.querySelector("#album_list_container");
    var template = "";

    if (obj.results.length > 0) {
      document.querySelector("#not_match").style.display = "none";
      for (var i = 0; i < obj.results.length; i++) {
        template += '<div class="sol-sm-3 album_item">';
        template +=
          '<div class="item_thmb" style="background: URL(' +
          obj.results[i].artworkUrl100 +
          ')"></div>';
        template +=
          '<div class="item_title">' + obj.results[i].collectionName + "</div>";
        template +=
          '<div class="item_price"><span>Price:</span> $' +
          obj.results[i].collectionPrice +
          "</div>";
        template +=
          '<a href="' +
          obj.results[i].collectionViewUrl +
          '" target="_blank">Buy now</a>';
        template += "</div>";
      }
      container.innerHTML = "";
      container.insertAdjacentHTML("afterbegin", template);
    } else {
      document.querySelector("#not_match").style.display = "block";
    }
  };

  this.init();
})();
