const fetchUrl = require('./fetch-url');
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
    .filter((repo) => (!repo.fork))
    .filter((repo) => (repo.name !== `${user}.github.com`) && (repo.name !== `${user}.github.io`))
    .filter((repo) => (!repo.private))
    .filter((repo) => { return repo.watchers_count > 0 || repo.stargazers_count > 0})
    .sort(sortRepos).reverse().map((repo) => {
      return {
        name: repo.name,
        private: repo.private,
        html_url: repo.html_url,
        description: repo.description,
        fork: repo.fork,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        forks_count: repo.forks_count,
        archived: repo.archived,
        watchers: repo.watchers,
        pushed_at: repo.pushed_at
      }
    })
}

module.exports = async (githubUser) => {
  const user = githubUser;
  let data;
  try {
    data = require('../repo.json');
    console.log('- read repo.json')
  } catch (e) {
    const url = `https://api.github.com/users/${user}/repos?sort=pushed&_=${Math.random()}${new Date()}`;
    data = await fetchUrl(url);
    data = filterRepo(data, user);
    require('fs').writeFileSync('repo.json', JSON.stringify(data, null, 2));
    console.log('- saved repo.json')
  }
  return data;
}
