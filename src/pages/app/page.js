import content from './content.ejs';
import layout from '@core/layout';

import _table from '@core/layout/snippets/_table.ejs';
import _nav from '@core/layout/components/_nav.ejs';
import _modal from '@core/layout/components/_modal.ejs';

export default layout.initArgon({ main: content(), modal: _modal() });