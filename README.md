# nkjoep.github.io

setup:

- `master` branch contains the static website (html, css, js, assets). It uses plain github pages to be displayed.
- `hexo` branch contains the source
- from `hexo` compile the static site (`npm run build`) and copy it to `master`
- the compiled website can be found in `public/*`
- the posts are located in `source/_posts`
- check the _config.yml for the hexo config
