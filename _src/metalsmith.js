(async function () {
  const sourcePath = './src';
  const buildDistPath = '../';

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

  const websiteOptions = require('./package.json').metalsmith;
  websiteOptions.metadata.site.lastBuildDate = new Date();
  websiteOptions.metadata.site.copyrightYear = new Date().getFullYear();
  websiteOptions.metadata.site.lastBuild = new Date().toISOString();

  websiteOptions.metadata.author.githubRepos = await (async () => {
    let data;
    try {
      data = require('./repo.json');
      console.log('- read repo.json')
    } catch (e) {
      const user = websiteOptions.metadata.author.github;
      const url = `https://api.github.com/users/${user}/repos?sort=pushed&_=${Math.random()}${new Date()}`;
      data = await fetchUrl(url);
      require('fs').writeFileSync('repo.json', JSON.stringify(data, null, 2));
      console.log('- saved repo.json')
    }
    const user = websiteOptions.metadata.author.github;
    return data
      .filter((repo) => (!repo.fork))
      .filter((repo) => (repo.name !== `${user}.github.com`) && (repo.name !== `${user}.github.io`))
      .filter((repo) => (!repo.private))
      // .filter((repo) => repo.watchers_count > 0)
      .sort((a, b) => {
        // if (a is less than b by some ordering criterion) {
        if (a.pushed_at < b.pushed_at) {
          return -1;
        }
        if (a.pushed_at > b.pushed_at) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }).reverse();
  })();

  websiteOptions.metadata.site.revision = (() => {
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
    return `${REVISION}-${new Date().toISOString()}`;
  })();

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
    .clean(false)
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
      compileCss()
        .then(() => {
          console.log(`Build done. Check ${require('path').resolve(buildDistPath, 'index.html')}`);
        })
        .catch((err) => {
          console.log(err);
          console.log('Build done. CSS failure.');
        });
    });

  return Promise.resolve();

  function compileCss() {
    const sass = require('node-sass');
    const fs = require('fs');
    const src = 'src/style.scss';
    const dest = '../assets/css/style.css';
    return new Promise((resolve, reject) => {
      sass.render({
        file: src,
      }, (err, result) => {
        if (!err) {
          fs.writeFileSync(dest, result.css);
          return resolve();
        }
        if (err) {
          console.error(err);
          reject();
        }
      });
    });
  }

  /**
   * @param {String} url
   */
  function fetchUrl(urlString) {
    const httpsClient = require('https');
    const httpClient = require('http');
    const urlLib = require('url')
    const URL = urlLib.URL;
    return new Promise((resolveFetch, rejectFetch) => {

      const isHttps = urlString.substring(0, 5) === 'https';
      // const url = new URL(urlString);
      const url = urlLib.parse(urlString);
      const client = isHttps ? httpsClient : httpClient;

      const options = {
        hostname: url.hostname,
        path: url.pathname || '/',
        method: 'GET',
        headers: {
          'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36`,
          'Accept-Language': '*'
        }
      };
      // console.log('fetching', url.href);
      client.get(options, (res) => {
        const bodyResponse = [];
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];

        if (statusCode > 299 && statusCode < 400 && res.headers && res.headers.location) {
          // follow redirect
          return fetchUrl(res.headers.location).then(resolveFetch).catch(rejectFetch);
        }

        if (statusCode !== 200) {
          // rejectFetch(new Error('invalid response'));
          res.resume();
          resolveFetch('');
          // return;
        }
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          bodyResponse.push(chunk);
        });
        res.on('end', () => {
          let fullResp = bodyResponse.join('');
          if (/json/.test(contentType)) {
            try {
              fullResp = JSON.parse(fullResp);
            } catch (e) { }
          }
          resolveFetch(fullResp);
        });
      }).on('error', (e) => {
        // rejectFetch(e);
        resolveFetch('');
      });
    });
  }

})();
