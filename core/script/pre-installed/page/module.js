import content from '@core/layout/tpl/admin.ejs';
import layout from '@core/layout';
import argon from '@core/layout/tpl/argon.ejs';
import _table from '@core/layout/snippets/_table.ejs';
import _nav from '@core/layout/components/_nav.ejs';
import _modal from '@core/layout/components/_modal.ejs';
import _modalContent from '@core/layout/snippets/_modal.ejs';
import { moduleTableConfig, moduleFormConfig } from '@core/config';
// modal: tModal({ title: '新增', config: moduleFormConfig({}, []) })
let tableHtml = _table({ config: moduleTableConfig });
export default layout.initArgon({
    main: content({ table: tableHtml }),
    modal: _modal(_modalContent({ config: moduleFormConfig({}, []) }))
});