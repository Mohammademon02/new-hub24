// get the category name from api
const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => updateCategories(data.data.news_category))
    .catch(error => console.log(error));
}
const updateCategories = categories => {
    const categoryList = document.getElementById('category-list');
    for (const category of categories){
        // console.log(category);
        const menuItem = document.createElement('menu');
        menuItem.innerHTML = `
        <h6 onclick="loadNewsFromCatogory('${category.category_id}')" class="btn btn-outline-success px-2 py-2"> ${category.category_name} </h6>
        `;
        categoryList.appendChild(menuItem);
    }
} 

// display 10 news for default category
const loadDefaultNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/category/08')
    .then(res => res.json())
    .then(data => displayNewsFromCategory(data.data.slice(10,20)))
    .catch(error => console.log(error));
}

// display news dynamicly by category name
const loadNewsFromCatogory = (categoryId) => {
    // // start spinner 
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then (res => res.json())
    .then(data => displayNewsFromCategory(data.data))
    .catch(error => console.log(error));
}
let displayNewsFromCategory = allNews => {
    // console.log(allNews.length);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    for(const news of allNews){
        const getNewsFromCategory = document.createElement('div');
        getNewsFromCategory.innerHTML = `
            <div  class="card mb-5">
               <div class="row">
                <div class="col-md-4">
                  <img src="${news.image_url}" class="img-fluid rounded h-100" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0,300)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="author-details d-flex ">
                        <img src="${news.author.img}" width="30" height="24" class="img-fluid rounded-circle mx-2" alt="...">
                        <div>
                            <p class="fw-semibold m-0"> ${news.author.name ? news.author.name : 'No author found'} </p>
                            <p class="fw-semibold text-muted"> ${news.author.published_date ? news.author.published_date : 'Not available' } </p>
                        </div>
                        </div>
                        <div>
                            <span class="fw-bold text-muted text">  <i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No view'} </span>
                        </div>
                        <div>
                            <button onclick="getNewsDetails('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
                        <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        newsContainer.appendChild(getNewsFromCategory);
    }
    // stop spiner
    toggleSpinner(false)
}

// display news details in modal
const getNewsDetails = (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(details => newsDetails(details.data[0]))
    .catch(error => console.log(error));
}
const newsDetails = (details) =>{
    // console.log(details);
    const newsTitle = document.getElementById('news-title');
    newsTitle.innerText = `${details.title ? details.title : 'No title found'}`;
    const newsAuthor = document.getElementById('news-author');
    newsAuthor.innerText = `${details.author.name ? details.author.name : 'No author found'}`;
    const newsPublishedDate = document.getElementById('news-published-date');
    newsPublishedDate.innerText = `${details.author.published_date ? details.author.published_date : 'No publish date found'}`
}

// toggle spinner function here
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

loadCategories();
loadDefaultNews();



