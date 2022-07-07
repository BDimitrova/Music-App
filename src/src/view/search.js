import { html } from '../../node_modules/lit-html/lit-html.js';

import { search } from '../api/data.js';
import { getUserData } from '../utility.js';

const searchTamplate = (albums, onSearch, user) => html`
        <section id="search-albums">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
        
            <h2>Results:</h2>
        
            ${albums != undefined ? html `
                <div class="search-result">
                ${albums.length == 0 ? html`
                <p class="no-result">No result.</p>` : 
                albums.map(x => html`
                <div class="card-box">
                    <img src="${x.imgUrl}">
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${x.name}</p>
                            <p class="artist">Artist: ${x.artist}</p>
                            <p class="genre">Genre: ${x.genre}</p>
                            <p class="price">Price: $${x.price}</p>
                            <p class="date">Release Date: ${x.releaseDate}</p>
                        </div>
                        ${user != undefined ? html`
                        <div class="btn-group">
                            <a href="/details/${x._id}" id="details">Details</a>
                        </div>
                        ` : ''}
                    </div>
                </div>`)
                            }
            </div>
            `: ''}
        </section>
    `;

export async function searchPage(ctx) {
    let user = getUserData(ctx.user);
    console.log(user);
    let albums = undefined;

    const name = ctx.querystring.split('=')[1];
    if(name !== undefined) {
        albums = await search(name);
    }
    
    console.log(albums);
    ctx.render(searchTamplate(albums, onSearch, user));

    async function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query !== '') {
            ctx.page.redirect(`/search?query=${query}`);
        } else {
            return alert('All fields are required!');
        }
    }
}