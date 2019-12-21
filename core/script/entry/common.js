import application from '../application';
import admin from './app';
import src from './src';
import '@core/style/app.scss';


const runtime = app => {

    let pageName = app.$page.name;

    let adminArray = ['module', 'element', 'role', 'user'];

    if (adminArray.includes(pageName)) {
        import(`@core/script/event/page/${pageName}.js`);
        import('@core/script/event/preload/state');
        typeof admin === 'function' ? admin(app) : console.log('admin is not a function');
    } else {
        typeof src === 'function' ? src(app) : console.log('src is not a function');
    }

};

application.run(runtime);