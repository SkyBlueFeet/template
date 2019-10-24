import layout from 'app/layout/index.js';
import content from './content.ejs';
export default layout.initWithHeader({ title: '中科建业', content: content() });