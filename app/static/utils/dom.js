import header from 'components/header.ejs';
import module from '../db/module';

/**
 *
 * @param {Object} data
 * @returns {Promise} function
 */
export function moduleUpdata(data) {

    if (data === null) return;

    const packageModuleData = data => {
        const nAuth = [],
            stageArr = [];
        data.forEach((nav, index, data) => {
            if (nav['parentModuleId'] === null) {
                let a = {};
                Object.keys(nav).forEach(key => {
                    a[key] = nav[key];
                });
                a['submenu'] = [];
                nAuth.push(a);
            } else {
                let a = {};
                Object.keys(nav).forEach(key => {
                    a[key] = nav[key];
                });
                stageArr.push(a);
            }
        });
        stageArr.forEach(sub => {
            nAuth.forEach(nav => {
                if (sub['parentModuleId'] === nav['id']) {
                    nav['submenu'].push(sub);
                }
            });
        });
        return nAuth;
    };

    const moduleToTable = (moduleArray) => {
        let tHtml = '';

        moduleArray.forEach(modules => {
            tHtml += `<tr>
                    <td>
                        <label class="checkblock">
                            <input type="checkbox"/>
                            <i class="s-icon__checkbox"></i>
                        </label>
                    </td>
                    <td id='${modules.id}'>${modules.title ||''}</td>
                    <td>${modules.parentModuleId || ''}</td>
                    <td>${modules.key || ''}</td>
                    <td>${modules.order || ''}</td>
                    <td>${modules.link || ''}</td>
                    <td>${modules.remark || ''}</td>
                </tr>`;

            if (modules['submenu'].length > 0) {
                modules['submenu'].forEach(sub => {
                    tHtml += `<tr>
                            <td>
                                <label class="checkblock">
                                    <input type="checkbox"/>
                                    <i class="s-icon__checkbox"></i>
                                </label>
                            </td>
                            <td id='${sub.id}'> ${sub.title || ''}</td>
                            <td id='${sub.parentModuleId}'> ${modules.title || ''}</td>
                            <td>${sub.key || ''}</td>
                            <td>${sub.order || ''}</td>
                            <td>${sub.link || ''}</td>
                            <td>${sub.remark || ''}</td>
                        </tr>`;
                });
            }
        });
        return tHtml;
    };

    /**
     * table初始化
     * @param { Object } initData 是否请求远程数据
     */
    const initTable = (data) => {
        $('tbody').html(moduleToTable(packageModuleData(data)));
    };


    const initHeader = (data) => {
        $('.header').html(header(packageModuleData(data)));
    };

    return (async function() {
        $(() => {
            initHeader(data);
            if ($('tbody').length) initTable(data);
        });
    })();
}





export default { moduleUpdata };