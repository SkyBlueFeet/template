import 'static/style/app.scss';
import application from 'app/static/application';

application.run(function(that) {

    import('static/script/page/state');

    console.log(that.$user);
});