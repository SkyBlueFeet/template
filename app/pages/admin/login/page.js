import content from './content.ejs';
import layout from 'app/layout';
import logo from 'tpl/assets/images/bootstrap-solid.svg';


export default layout.initblock('bootstrap', content({ logo: logo }));