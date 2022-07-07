import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js';
import { getUserData } from './utility.js';
import { homePage } from './view/home.js';
import { loginPage, registerPage } from './view/auth.js';
import { createPage } from './view/create.js';
import { catalogPage } from './view/catalog.js';
import { detailsPage } from './view/details.js';
import { editPage } from './view/edit.js';
import { searchPage } from './view/search.js'

const main = document.querySelector('#main-content');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/', decorateContext, homePage);
page('/create-album', decorateContext, createPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/search', decorateContext, searchPage);

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();

    next();
}

function setUserNav() {
    const user = getUserData();

    if (user) {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    } else {
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline-block');
    }
}

async function onLogout() {
    await apiLogout();
    setUserNav()
    page.redirect('/');
}