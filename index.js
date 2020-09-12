console.log('this is my index js file')
//8c560d4b510e4749993b60007e1a4f79    API KEY

//initialize the news api parameter
let source = 'the-times-of-india';
let apikey = '8c560d4b510e4749993b60007e1a4f79'

//grab the news container
let newsaccordian = document.getElementById('newsAccordion');
//create an ajax get request
const xhr = new XMLHttpRequest()



// var client = new HttpClient();
// client.get( `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`, function(response) {
//     console.log(response)
// });
// var url=`http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`
// fetch(url).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data);
//   }).catch(function() {
//     console.log("Booo");
//   });


xhr.open('GET', `http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`, true)


xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    // console.log(articles);
    let newsHtml = "";
    articles.forEach(function (element, index) {
      // console.log(element, index)
      let news = `<div class="card">
                          <div  class="card-header" id="heading${index}">
                              <h2 class="mb-0">
                              <button  class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                  aria-expanded="false" aria-controls="collapse${index}">
                                 <b>Breaking News ${index + 1}:</b> ${element["title"]}
                              </button>
                              </h2>
                          </div>

                          <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                              <div class="card-body"> <h7>${element["description"]}. <a href="${element['url']}" target="_blank" >Read more here</a> </h7></div>
                          </div>
                      </div>`;
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  }
  else {
    console.log("Some error occured")
  }
}

xhr.send()



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value
  console.log('Input event fired!', inputVal);
  let Newscard = document.getElementsByClassName('card');
  // console.log(Newscard)
  Array.from(Newscard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName('h7')[0].innerText
    // console.log(cardTxt)
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
      console.log(cardTxt);
    }
    else {
      element.style.display = "none";
    }
    
  })
})
