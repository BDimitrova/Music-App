import { html } from '../../node_modules/lit-html/lit-html.js';

import { login, register } from '../api/api.js';

const loginTamplate = (onSubmit) => html`
        <section id="loginPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Login</legend>
        
                    <label for="email" class="vhide">Email</label>
                    <input class="email" name="email" type="text" placeholder="Email">
        
                    <label for="password" class="vhide">Password</label>
                    <input class="password" name="password" type="password" placeholder="Password">
        
                    <button type="submit" class="login">Login</button>
        
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export async function loginPage(ctx) {
    ctx.render(loginTamplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        await login(email, password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}

const registerTamplate = (onSubmit) => html`
        <section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>
        
                    <label for="email" class="vhide">Email</label>
                    <input class="email" name="email" type="text" placeholder="Email">
        
                    <label for="password" class="vhide">Password</label>
                    <input class="password" name="password" type="password" placeholder="Password">
        
                    <label for="password" class="vhide">Confirm Password:</label>
                    <input class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
        
                    <button type="submit" class="register">Register</button>
        
                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTamplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('conf-pass');

        if (!password || !email) {
            return alert('All fields are required!');
        } else if (password != repeatPass) {
            return alert('Password don\'t match')
        }

        await register(email, password);
        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}