const downloadRepo = require('./metalsmith-lib/repo');
const getRevision = require('./metalsmith-lib/revision');
const compileSass = require('./metalsmith-lib/sass-compile');
const copyFiles = require('./metalsmith-lib/copy-files');

const stylesSource = '../assets/sass/style.scss';
const stylesDestination = '../assets/css/style.css';

const sourcePath = './src';
const buildDistPath = './dist';
const buildFinalPath = '../';

const websiteOptions = require('./package.json').metalsmith;

(async () => {

  const datefns = require('date-fns');
  const fontawesome = require('@fortawesome/fontawesome');
  const solid = require('@fortawesome/fontawesome-free-solid').default;
  // Adds all the icons from the Solid style into our library for easy lookup
  fontawesome.library.add(solid)

  const Handlebars = require('handlebars');
  const handlebars_layouts = require('handlebars-layouts');

  Handlebars.registerHelper('fontawesome-css', function () {
    return new Handlebars.SafeString(
      fontawesome.dom.css()
    )
  });

  Handlebars.registerHelper('fontawesome-icon', function (args) {
    return new Handlebars.SafeString(
      fontawesome.icon({ prefix: 'fas', icon: args.hash.icon }).html
    )
  });

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

  Handlebars.registerHelper('datefn', (dateObj, ...formatOpts) => {
    let format;
    let datefnsOpts;
    if (formatOpts.length > 1) {
      format = formatOpts[0];
    }
    if (formatOpts.length > 2) {
      datefnsOpts = formatOpts[1];
    }
    const date = datefns.format(dateObj, format, datefnsOpts);
    return new Handlebars.SafeString(date);
  });


  websiteOptions.metadata.site.lastBuildDate = new Date();
  websiteOptions.metadata.site.copyrightYear = new Date().getFullYear();
  websiteOptions.metadata.site.lastBuild = new Date().toISOString();
  websiteOptions.metadata.author.githubRepos = await downloadRepo(websiteOptions.metadata.author.github);
  websiteOptions.metadata.site.revision = getRevision();

  const Metalsmith = require('metalsmith');
  const mp_collections = require('metalsmith-collections');
  const mp_excerpts = require('metalsmith-excerpts');
  const mp_feed = require('metalsmith-feed');
  const mp_layouts = require('metalsmith-layouts');
  const mp_markdown = require('metalsmith-markdown');
  const mp_metallic = require('metalsmith-metallic');
  const mp_open_graph = require('metalsmith-open-graph');
  const mp_permalinks = require('metalsmith-permalinks');


  Metalsmith(__dirname)
    .metadata(websiteOptions.metadata)
    .source(sourcePath)
    .destination(buildDistPath)
    .clean(true)
    .use(mp_collections({
      'articles': {
        pattern: 'posts/*.md',
        sortBy: 'date',
        reverse: true
      },
      'unwritten': {
        pattern: 'unwritten/*.md',
        sortBy: 'date',
        reverse: true
      }
    }))
    .use(mp_metallic())
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
    .use(mp_open_graph({
      siteurl: websiteOptions.metadata.site.url,
      title: 'title',
      description: 'description',
      image: 'image-preview'
    }))
    .build((err, files) => {
      if (err) { throw err; }
      compileSass(stylesSource, stylesDestination)
        .then(() => {
          return copyFiles(buildDistPath, buildFinalPath)
        })
        .then(() => {
          console.log(`Build done. Check ${require('path').resolve(buildDistPath, 'index.html')}`);
        })
        .catch((err) => {
          console.log(err);
          console.log('Build done. CSS failure.');
        });
    });
  return Promise.resolve();
})();
