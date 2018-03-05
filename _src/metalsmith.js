const source = './src';
const build = '../';

const Handlebars = require('handlebars');
const handlebars_layouts = require('handlebars-layouts');
Handlebars.registerHelper('json', function (obj) {
  try {
    const json = JSON.stringify(obj, null, 2);
    return new Handlebars.SafeString(Handlebars.Utils.escapeExpression(json));
  } catch (e) {
    if (obj && obj.toString) {
      return new Handlebars.SafeString(obj.toString());
    }
    return new Handlebars.SafeString(`[object object]`);
  }
});

const websiteOptions = require('./package.json').metalsmith;
websiteOptions.metadata.lastBuildDate = new Date();
websiteOptions.metadata.copyrightYear = new Date().getFullYear();

websiteOptions.metadata.author.githubRepos = (() => {
  const user = websiteOptions.metadata.author.github;
  const url = `https://api.github.com/users/${user}/repos?sort=pushed`;
  return [
    { html_url: 'https://github.com/NKjoep/repo1', full_name: 'NKjoep/repo1' },
    { html_url: 'https://github.com/NKjoep/repo2', full_name: 'NKjoep/repo2' },
  ]
})();

websiteOptions.metadata.revision = (() => {
  let REVISION = 'norev';
  // get the revision git rev-parse --short HEAD
  const spawn = require('child_process').spawnSync;
  const gitRevCmd = spawn('git', ['rev-parse', '--short', 'HEAD']);

  // if error, notify
  if (gitRevCmd.stderr && gitRevCmd.stderr.toString()) {
    console.error('build-index', gitRevCmd.stderr.toString(), 'using default rev `norev`');
  } else {
    REVISION = gitRevCmd.stdout.toString().trim();
  }
  return REVISION;
})();

const Metalsmith = require('metalsmith');
const mp_collections = require('metalsmith-collections');
const mp_excerpts = require('metalsmith-excerpts');
const mp_feed = require('metalsmith-feed');
const mp_layouts = require('metalsmith-layouts');
const mp_markdown = require('metalsmith-markdown');
const mp_permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata(websiteOptions.metadata)
  .source(source)
  .destination(build)
  .clean(false)
  .use(mp_collections({
    articles: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    },
    unwritten: {
      pattern: 'unwritten/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(mp_markdown())
  .use(mp_excerpts())
  .use(mp_permalinks({
    pattern: 'blog/:date/:title',
    date: 'YYYY'
  }))
  .use(mp_layouts({
    engine: 'handlebars'
  }))
  .use(mp_feed({
    collection: 'articles',
    destination: 'feed.xml'
  }))
  .build((err, files) => {
    if (err) { throw err; }
    compileCss();
    console.log('Build done.');
  });

function compileCss() {
  const sass = require('node-sass');
  const fs = require('fs');
  const src = 'src/style.scss';
  const dest = '../assets/css/style.css';

  sass.render({
    file: src,
  }, function(err, result) {
    if (!err) {
      fs.writeFileSync(dest, result.css);
    }
  });

}

