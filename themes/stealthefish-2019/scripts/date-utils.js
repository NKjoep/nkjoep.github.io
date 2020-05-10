hexo.extend.helper.register('sf_post_date', function(dateObj){
  return dateObj.format(`${hexo.config.date_format} ${hexo.config.time_format}`);
});
