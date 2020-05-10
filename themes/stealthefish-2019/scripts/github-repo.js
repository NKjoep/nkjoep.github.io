// Required deps:
// http-link-header isomorphic-unfetch

const fetchUrl = require('isomorphic-unfetch');
const repopath = require('path').resolve(__dirname, '../repo.json');

let hx = null;
try {
  hx = hexo;
} catch(e) {
  // do nothing
}

if (hx) {
  hexo.extend.helper.register('github', () => {
    return require(repopath);
  });
}

const sortRepos = (a, b) => {
  // if (a is less than b by some ordering criterion) {
  if (a.pushed_at < b.pushed_at) {
    return -1;
  }
  if (a.pushed_at > b.pushed_at) {
    return 1;
  }
  // a must be equal to b
  return 0;
};

const filterRepo = (repoArray, user) => {
  return repoArray
    .filter((repo, index, list) => list.findIndex((temp) => (temp.id === repo.id)) === index)
    .filter((repo) => (!repo.fork))
    .filter((repo) => (repo.name !== `${user}.github.com`) && (repo.name !== `${user}.github.io`))
    .filter((repo) => (!repo.private))
    .filter((repo) => {
      return repo.watchers_count > 0 || repo.stargazers_count > 0
    })
    .sort(sortRepos).reverse().map((repo) => {
      return {
        name: repo.name,
        private: repo.private,
        html_url: repo.html_url && (repo.html_url.startsWith('http') ? repo.html_url : `https://${repo.html_url}`),
        description: repo.description,
        fork: repo.fork,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        homepage: repo.homepage && (repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`),
        language: repo.language,
        forks_count: repo.forks_count,
        archived: repo.archived,
        watchers: repo.watchers,
        pushed_at: repo.pushed_at
      }
    })
}




async function getRepos(githubUser) {
  const user = githubUser;
  let data;
  try {
    data = require(repopath);
    console.log(`- read ${repopath}`);
  } catch (e) {
    const url = `https://api.github.com/users/${githubUser}/repos?sort=pushed&_=${Math.random()}${new Date()}`;
    data = await getData(url, []);
    data = filterRepo(data, user);
    require('fs').writeFileSync(repopath, JSON.stringify(data, null, 2));
    console.log(`- saved ${repopath}`);
    // console.log(data);
  }
  return data;
}

async function getData(url, values = []) {
  const LinkHeader = require('http-link-header');
  const fetched = await fetchUrl(url);
  values = values.concat(await fetched.json());
  const headerValue = fetched.headers.get('link');
  if (headerValue) {
    const links = LinkHeader.parse(headerValue);
    if (links && links.refs && links.refs.length && links.refs.find(l => l.rel === 'next')) {
      const nextUrl = links.refs.find(l => l.rel === 'next').uri
      values = values.concat(await getData(nextUrl, values));
    }
  }
  return values;
}

module.exports = getRepos;
