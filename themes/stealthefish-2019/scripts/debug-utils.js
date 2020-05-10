const { inspect } = require('util');

hexo.extend.helper.register('inspect', function(obj){
  if (hexo.theme.config !== true) {
    return '';
  }
  return inspect(obj, {
    // showHidden: true,
    sorted: true,
    // getters: true,
  });
});

hexo.extend.helper.register('keys', function(obj){
  if (hexo.theme.config !== true) {
    return '';
  }
  try {
    return Object.keys(obj);
  } catch (e) {
    return '[keys: no keys]'
  }
});

hexo.extend.helper.register('debug', function(objectsToDebug){
  if (hexo.theme.config !== true) {
    return '';
  }
  return `
    <hr />
    <details>
      <summary>debug</summary>
      ${
        Object.entries(objectsToDebug).map(([name, obj]) => {
          return `
            <table style="font-family: 'Arial';">
              <tr><th colspan="2"><dfn>${name}</dfn> values</th>
              ${ Object.keys(obj).map((k) => {
                return `
                  <tr>
                    <th style="
                      vertical-align: top;
                      text-align:right;
                    "><b>${k}</b></th>
                    <td style="padding-bottom: 1rem;">${
                      k === 'posts' ? `[${obj[k].length}]` :
                      k === 'content' ? `... ${obj[k].length} chars` :
                      k === '_raw' ? `... ${obj[k].length} chars` :
                      k === 'raw' ? `... ${obj[k].length} chars` :
                      k === '_content' ? `... ${obj[k].length} chars` :
                      k === 'more' ? `... ${obj[k].length} chars` :
                      k === '_Document' ? `{${Object.keys(obj[k])}}` :
                      k === 'next' ? `{${Object.keys(obj[k])}}` :
                      k === 'prev' ? `{${Object.keys(obj[k])}}` :
                      inspect(obj[k])
                    }
                    </td>
                  </tr>
                  `;
                }).join('\n')}
            </table>
          `
        }).join('\n<hr />')
      }
    </details>
  `;
});
