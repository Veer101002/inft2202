import listBuilder from  "./app/animals/list.js";
import animalBuilder from  "./app/animals/index.js";
import twitter from './asset/twitter.svg';

var appObj = {
    recordPage: { page: 1, perPage: 10 },
    name: null,
    animalBuilder: function (app) {
        container.innerHTML = '';
        container.append(animalBuilder(app).element);
    },
    listBuilder: function (app) {
        container.innerHTML = '';
        container.append(listBuilder(app).element);
    }
};

const list = listBuilder(appObj);

let container = document.querySelector('main');
container.append(list.element);

let footImgs = document.querySelector('.ms-3 a');
const svgElement = document.createElement('img');
svgElement.src = twitter;
svgElement.width = 24; // width in pixels
svgElement.height = 24; // height in pixels
footImgs.appendChild(svgElement);