import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/data.js';
import { getUserData } from '../utility.js'

const albumTamplate = (albums, user) => html`

<section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length == 0 ? html`<p>No Albums in Catalog!</p>` :
    albums.map(x => html`<div class="card-box">
        <img src="${x.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${x.name}</p>
                <p class="artist">Artist: ${x.artist}</p>
                <p class="genre">Genre: ${x.genre}</p>
                <p class="price">Price: $${x.price}</p>
                <p class="date">Release Date: ${x.releaseDate}</p>
            </div>
            ${user !== undefined ? html`<div class="btn-group">
                <a href="/details/${x._id}" id="details">Details</a>
            </div>` : html``}
        </div>
    </div>`)}
</section>`;

export async function catalogPage(ctx) {
    const user = getUserData(ctx.user);
    const albums = await getAllAlbums();
    ctx.render(albumTamplate(albums, user));
}