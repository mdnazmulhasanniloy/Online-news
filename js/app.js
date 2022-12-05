const  postLoad = async(category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
   displayNews(data.data);
}

 //sliice detail
 const newsDetails = details =>{
  const datile = details;
  if(datile.lenth>150){
    return datile;
  }else{
    const newsdetails = datile.slice(0,150);
    return newsdetails;
  }
}

//news container

const displayNews = data =>{
  const displayPost = document.getElementById('display-post');
  displayPost.textContent = '';

  //news not found massage
  const noNews = document.getElementById('no-found-message');
  if(data.length==0){
    noNews.classList.remove('d-none');
    const message = document.getElementById('message');
    message.innerText = "Not Data found"
  }else{
    noNews.classList.add('d-none');
  }
  // sort by user view

  data.sort((a,b) =>{
    return b.total_view - a.total_view;
  });


  data.forEach(news => {
    const postsDiv = document.createElement('div');
    postsDiv.classList.add("col");

    postsDiv.innerHTML = ` <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                          <div class="col-md-4 p-3 ">
                            <img  src="${news.thumbnail_url? news.thumbnail_url:'image Not found'}" class="img-fluid rounded-start h-100 w-100" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${news.title?news.title:'title Not found'}</h5>
                              <p class="card-text">${newsDetails(news.details? news.details:'Details Not found')}</p>
                              <div class="card-text d-flex justify-content-between align-items-center">
                                  <div class="user d-flex">
                                      <img src="${news.author.img?news.author.img:'image Not found'}" class="rounded-circle d-md-flex d-lg-inline-flex mx-2" height="40" alt="Black and White Portrait of a Man" loading="lazy"/>
                                      <div class="d-flex flex-column">
                                        <h6>${news.author.name?news.author.name:'author name Not found'}</h6>
                                        <p>${news.author.published_date?news.author.published_date:'date Not found'}</p>
                                      </div>
                                  </div>
                                  <div class="viewr">
                                    <p><i class="fa-regular fa-eye"></i> ${news.total_view?news.total_view:'visitor Not found'}</p>
                                  </div>
                                  <div class="button">
                                    <i class="fa-solid fa-arrow-right color-navi d-flex align-items-center px-3"></i>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> `;

                    
                    displayPost.appendChild(postsDiv);
                    
                  });
                  toggleSpinner(false);
                  
                  const totalPost = document.getElementById('total-post');
                  totalPost.innerText =  displayPost.childNodes.length;
                }
//Spinner Loader function
const toggleSpinner = isLoader =>{
  const LoaderSection = document.getElementById('loader');
  if(isLoader){
      LoaderSection.classList.remove('d-none');
  }else{
      LoaderSection.classList.add('d-none');
  }
}

//manue active
const links = document.querySelectorAll('.manue');
    
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
    });
  });
}

const category = newses =>{
  toggleSpinner(true);
  newses.classList.add('active');

  const category = newses.getAttribute('name')
  postLoad(category);

  const categotySpan = document.getElementById('category-span');
  const categotyName = newses.innerText;
  categotySpan.innerText = categotyName ;


}

const News = () =>{
  const NewsBtn = document.getElementById('news-btn');
  NewsBtn.classList.add('active');
  const blogBtn = document.getElementById('Blog-btn');
  blogBtn.classList.remove('active')

  const manue = document.getElementById('category');
  manue.classList.remove('d-none');
  const newsContainer = document.getElementById('display-post');
  newsContainer.classList.remove('d-none');
  const blogContainer = document.getElementById('blog-post');
  blogContainer.classList.add('d-none');
  
  postLoad(`01`);
}
const Blog = () =>{
  const blogBtn = document.getElementById('Blog-btn');
  blogBtn.classList.add('active');
  const newsBtn = document.getElementById('news-btn');
  newsBtn.classList.remove('active');

  const manue = document.getElementById('category');
  manue.classList.add('d-none');
  const newsContainer = document.getElementById('display-post');
  newsContainer.classList.add('d-none');
  const blogContainer = document.getElementById('blog-post');
  blogContainer.classList.remove('d-none');
}

postLoad(`01`);
