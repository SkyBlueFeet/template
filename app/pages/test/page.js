import layout from 'layout/newLayout.js';
import content from './content.ejs';
const headerParama = {
    test: 15
};
export default layout.initWithHeader('我的世界', headerParama, content());