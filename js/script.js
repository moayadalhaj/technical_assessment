const categories = document.getElementById('categories');
const cards = document.getElementById('cards');
let dataArray;
let categoriesArray;
const apiURL = 'https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=["category1","category2","category3"]&pretty=true';

// Function to get data from  filltext api
const getData = async () => {
  await fetch(apiURL)
    .then(res => res.json())
    .then(data => dataArray = data)
    .catch(err => console.log(err));
  renderCategories();
  renderData();
}

// Fuction to render categories in the page
const renderCategories = () => {
  let url = new URL(apiURL);
  let categoriesParams = url.searchParams.get("category");
  categoriesArray = JSON.parse(categoriesParams);

  for (let category of categoriesArray) {
    let btnElement = document.createElement('button');
    btnElement.textContent = category;
    btnElement.type = 'button';
    btnElement.id = category;
    btnElement.onclick = filterDataByCategory;
    categories.appendChild(btnElement);
  }
}

// Function to render data from the api on cards and display them in the page
const renderData = () => {
  for (let user of dataArray) {
    let divElement = document.createElement('div');
    let divElement2 = document.createElement('div');
    let avatarElement = document.createElement('h2');
    let nameElement = document.createElement('h3');
    let categoryElement = document.createElement('p');

    divElement.className = 'content';
    divElement.id = user.category
    avatarElement.textContent = user.fname[0] + user.lname[0];
    nameElement.textContent = user.fname + " " + user.lname;
    categoryElement.textContent = user.category;

    divElement2.appendChild(avatarElement);
    divElement2.appendChild(nameElement);
    divElement.appendChild(divElement2);
    divElement.appendChild(categoryElement);
    cards.appendChild(divElement)
  }
}

// Function to filter data by category that depends on the clicked button
const filterDataByCategory = (e) => {
  let cardsArray = document.querySelectorAll('.content');
  cardsArray.forEach(el => {
    if (el.id == e.target.id) {
      el.style.display = '';
    } else {
      el.style.display = 'none'
    }
  })
}

getData();