/**
 * http: //es6.ruanyifeng.com/#docs/string#JSON-stringify-%E7%9A%84%E6%94%B9%E9%80%A0
 * @param { String } template
 */

export function compile(template) {
    const evalExpr = /<%=(.+?)%>/g;
    const expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';

    let script =
        `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

    return script;
}

//用法如下
let template = `
            <ul>
            <% for(let i=0; i < data.supplies.length; i++) { %>
                <li><%= data.supplies[i] %></li>
            <% } %>
            </ul>
            `;
let parse = eval(compile(template));
let trs = parse({ supplies: ['broom', 'mop', 'cleaner'] });
console.log(trs);