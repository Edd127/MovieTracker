// localStorage.clear();

/*---------------------------lista firme hardcodata----------*/
let films = ["Breaking Bad", "Sons of Anarchy", "Peaky Blinders"];
/*--------------------------returnare film----------------*/

async function moviesRequest(movie) {
  try {
    const response = await fetch(
      "http://www.omdbapi.com/?apikey=fced3ba8&t=" + movie,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    const movieInfo = await response.clone().json();
    return movieInfo;
  } catch (error) {
    console.error(error);
  }
}
/*-------------------------returnare imagine film-----------------*/

async function returnImage(movie) {
  try {
    // movie = "Mirrors";
    const response = await fetch(
      "http://www.omdbapi.com/?apikey=fced3ba8&t=" + movie,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    const movieInfo = await response.clone().json();
    //console.log(movieInfo.Poster);
    return movieInfo.Poster;
  } catch (error) {
    console.error(error);
  }
}
/*------------------------------------------*/

async function moviesListInfo() {
  let moviesData = [];

  for (i = 0; i < films.length; i++) {
    let myArray = [];
    var obj = {};

    myArray = await moviesRequest(films[i]);
    console.log(myArray);

    obj["Titlu"] = myArray.Title;
    obj["Descriere"] = myArray.Plot;
    obj["Imagine"] = myArray.Poster;
    obj["An aparitie"] = myArray.Year.substring(0, 4);
    obj["Ratings"] = myArray.Ratings[0].Value.substring(0, 3);
    obj["Data Adaugarii"] = new Date().toLocaleString();
    moviesData.push(obj);
  }
  return moviesData;
}
/*-------------------populare tabel cu datele din API-----------------------*/
function storageCheck() {
  if (localStorage.length > 0) {
    return true;
  }
  return false;
}

/*-------------------transforamre array -> tabel -----------------------*/

async function arrayToTable() {
  let movieInfo = await moviesListInfo();

  var table = document.getElementById("table");
  table.innerHTML = "";
  for (var i = 0; i < movieInfo.length; i++) {
    var row = `<tr>
                      <td>${movieInfo[i].Titlu}</td>
                      <td>${movieInfo[i].Descriere}</td>
                      <td><img src=${movieInfo[i].Imagine} alt="" border=3 height=100 width=70></img></td>
                      <td>${movieInfo[i]["An aparitie"]}</td>
                      <td>${movieInfo[i].Ratings}</td>
                      <td>${movieInfo[i]["Data Adaugarii"]}</td>
                  </tr>`;
    table.innerHTML += row;
  }

  if (storageCheck()) {
    const nume = localStorage.getItem("Nume");
    const descriere = localStorage.getItem("Descriere");
    const imag = localStorage.getItem("Imagine");
    const anAparitie = localStorage.getItem("Anul aparitiei");
    const rating = localStorage.getItem("Rating");
    const dataAdaugarii = localStorage.getItem("Data adaugarii");

    let rowFinal = `<tr>
      <td>${nume}</td>
      <td>${descriere}</td><td>
      <img src=${imag} alt="" border=3 height=100 width=70></img></td>
      <td>${anAparitie}</td>
      <td>${rating}</td>
      <td>${dataAdaugarii}</td>


    </tr>`;
    $("#completedTable").append(rowFinal);
    purgeTableContent();
    document.getElementById("showTable").disabled = true;

    document.getElementById("contentTabel").style.display = "block";
    $("html, body").animate({
      scrollTop: $(document).height() - $(window).height(),
    });
  }
}

/*-------------------------*/

async function purgeTableContent() {
  document
    .getElementById("contentTabel")
    .addEventListener("click", function () {
      $("td").remove();
      document.getElementById("showTable").disabled = false;
      document.getElementById("contentTabel").style.display = "none";
      $("html, body").animate({ scrollTop: 0 }, "fast");
    });
}

/*------------------------------------------*/
/*-------------------------populare lista din array cu numele filmelor folosind datele din api-----------------*/
async function arrayToList() {
  let movieNames = [];

  for (i = 0; i < films.length; i++) {
    movieNames.push(films[i]);
  }
  if (storageCheck()) {
    const nume = localStorage.getItem("Nume");
    console.log(nume);
    movieNames.push(nume);
  }

  ul = document.createElement("ul");

  document.getElementById("movie-list").appendChild(ul);

  movieNames.forEach((item) => {
    let li = document.createElement("li");
    ul.appendChild(li);

    li.innerHTML += item;
  });
  movieNames.concat(films);

  purgeListContent();
  document.getElementById("switch").disabled = true;
  document.getElementById("switchLista").style.display = "block";
}
/*------------------------------------------*/
async function purgeListContent() {
  document.getElementById("switchLista").addEventListener("click", function () {
    $("ul").remove();

    document.getElementById("switch").disabled = false;
    document.getElementById("switchLista").style.display = "none";
  });
}
/*------------------------------------------*/

//async function addMovieIntoBrowser() {
document.getElementById("insert").addEventListener("click", async function () {
  const valueName = document.getElementById("fname");
  const valueDescription = document.getElementById("fdescription");
  const valueYear = document.getElementById("fyear");
  const valueRating = document.getElementById("frating");
  //const buttonInsert = document.getElementById("buttonInsert");

  // buttonInsert.onclick = async function () {
  const name = valueName.value;
  const description = valueDescription.value;
  const image = await returnImage(name);
  const year = valueYear.value;
  const rating = valueRating.value;

  if (name && description && image && year && rating) {
    localStorage.setItem("Nume", name);
    localStorage.setItem("Descriere", description);
    localStorage.setItem("Imagine", image);
    localStorage.setItem("Anul aparitiei", year);
    localStorage.setItem("Rating", rating);
    localStorage.setItem("Data adaugarii", new Date().toLocaleString());
  } else {
    alert("Campuri invalide. Introdu din nou datele despre film");
    location.reload();
  }
  const inputs = document.querySelectorAll(
    "#fyear, #fname,#fdescription, #frating"
  );

  inputs.forEach((input) => {
    input.value = "";
  });
  location.reload();
});

/*------------------------------------------*/
async function addItem() {
  var table = document.getElementById("completedTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = localStorage.getItem("Nume");
  cell2.innerHTML = localStorage.getItem("Descriere");
  cell3.innerHTML = localStorage.getItem("Imagine");
  cell4.innerHTML = localStorage.getItem("Anul aparitiei");
  cell5.innerHTML = localStorage.getItem("Rating");
  cell6.innerHTML = localStorage.getItem("Data adaugarii");
}
