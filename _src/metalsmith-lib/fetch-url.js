const httpsClient = require('https');
const httpClient = require('http');
const urlLib = require('url')
const rp = require('request-promise');

/**
  * @param {String} url
  */
module.exports = (urlString) => {
  const URL = urlLib.URL;
  return new Promise((resolveFetch, rejectFetch) => {
    resolveFetch(
      downloaAll(urlString)
    );
  });
}

async function downloaAll(url) {
  var loopContinue = true;
  var n = 0;
  let data = [];
  let currentUrl = url;
  while (loopContinue) {
    if (!currentUrl) {
      loopContinue = false;
    }
    await (fetchRp(currentUrl)
      .then((downloaded) => {
        data = [...data, ...downloaded.data];
        const nextUrl = extractUrl(downloaded.headers);
        if (!nextUrl || currentUrl === nextUrl) {
          loopContinue = false;
        }
        currentUrl = nextUrl;
      }).catch((error) => {
        loopContinue = false;
      }));
    n++;
  }
  return data;
}

function extractUrl(headers) {
  const link = headers['link'];
  if (!link) { return null; }
  if (link.indexOf('rel="next"') === -1) {
    return null;
  }
  return link.split('rel="next"')[0].trim().slice(1, -2);
}

function fetchRp(urlString) {
  return rp({
    url: urlString,
    headers: {
      'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36`,
      'Accept-Language': '*'
    },
    resolveWithFullResponse: true
  }).then((response) => {
    // console.log('rp', urlString, response);
    if (/json/.test(response.headers['content-type'])) {
      try {
        response.body = JSON.parse(response.body);
      } catch(e) {  }
    }
    return {
      data: response.body,
      headers: response.headers
    };
  })
}
