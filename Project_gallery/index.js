let listEl = document.querySelector('.pagination');
let targetEl; 
let elementMenu;
let spiner = document.querySelector('.preloader-wrapper');

function buildGallery(image) {
  let bodyEl = document.querySelector(".row");
  bodyEl.innerHTML = '';
  for(let i = 0; i < image.length; i++) {
      let rand = Math.round(100 + Math.random() * 100);
      image[i].height = rand;
      image[i].width = rand;
      rand = Math.round(1 + Math.random() * 1000);
      image[i].id = rand;
      image[i].download_url = `https://picsum.photos/id/${image[i].id}/${image[i].height}/${image[i].width}`;
      let cardImg = `<div class="col s1 m2 l3">
                      <img class="materialboxed" src="${image[i].download_url}">
                    </div>`;
      bodyEl.insertAdjacentHTML('beforeend', cardImg);
  }
}


async function readImage() {
    try {
        let img = await fetch(`https://picsum.photos/v2/list?page=2&limit=10`);
        let images = await img.json();
         buildGallery(images);
    }
    catch {
        alert("So sorry, it's error...")
    }
    finally {
        spiner.remove();
    }
}

function startSession() {
    console.log(localStorage);
    if(localStorage.length == 0) {
        console.log(localStorage);
        localStorage.setItem('value', 1);
        console.log(localStorage);
        targetEl = listEl.children[localStorage.getItem('value')];
        targetEl.classList.add('active');
    } 
    else {
        console.log(localStorage);
        targetEl = listEl.children[localStorage.getItem('value')];
        console.log(targetEl);
        targetEl.classList.add('active');
    }
    readImage();
}

function pagination(event) {
    if(localStorage.getItem('value') > 5) {
        targetEl = listEl.children[listEl.children.length - 1];
        targetEl.classList.add('disabled');
        targetEl = listEl.children[0];
        targetEl.classList.remove('disabled');
    }
    else if(localStorage.getItem('value') == 1) {
        targetEl = listEl.children[0];
        targetEl.classList.add('disabled');
        targetEl = listEl.children[listEl.children.length - 1];
        targetEl.classList.remove('disabled');
    }
    else if (localStorage.getItem('value') > 1 && localStorage.getItem('value') < 5) {
        targetEl = listEl.children[0];
        targetEl.classList.remove('disabled');
        targetEl = listEl.children[listEl.children.length - 1];
        targetEl.classList.remove('disabled');
    }
    if (localStorage.getItem('value') > 1 && event.target.textContent.length == 12) {
        localStorage.setItem('value', +localStorage.getItem('value') - 1);
        elementMenu = listEl.children[localStorage.getItem('value')];
    }
    else if ((localStorage.getItem('value') > 0 && localStorage.getItem('value') < 5) && event.target.textContent.length == 13) {
        localStorage.setItem('value', +localStorage.getItem('value') + 1);
        elementMenu = listEl.children[localStorage.getItem('value')];
    }
    else if (event.target.textContent.length < 12) {
        localStorage.setItem('value', event.target.textContent);
        elementMenu = listEl.children[localStorage.getItem('value')];
    }
    for (let i = 0; i < listEl.children.length; i++) {
        let removeClass = listEl.children[i];
        removeClass.classList.remove('active');
    }
    elementMenu.classList.add('active');   
    readImage();  
}

listEl.addEventListener('click', pagination);
startSession();


// document.addEventListener('DOMContentLoaded', function() {
//     let elems = document.querySelectorAll('.materialboxed');
//     let instances = M.Materialbox.init(elems, options);
//   });

// M.AutoInit();