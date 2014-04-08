var github = (function(){
  function escapeHtml(str) {
    return $('<div/>').text(str).html();
  }
  function render(target, repos, options){
  		var exA = options.user + '.github.com';
  		var exB = options.user + '.github.io';
	    var i = 0, fragment = '', t = $(target);
	    for(i = 0; i < repos.length; i++) {
  			if (repos[i].name != exA, repos[i].name != exB) {
	      	fragment += '<li class="'+options.itemClass+'"><a '
	      	+' title="'+escapeHtml(repos[i].description||'')+'"'
	      	+'href="'+repos[i].html_url+'">'+repos[i].name+'</a>';
	      	if (options.descriptions!==false) {
	      		fragment +='<p>'+escapeHtml(repos[i].description||'')+'</p></li>';
	      	}
	   		}
  		}
	    t.innerHTML=fragment;
  }
  return {
    showRepos: function(options){
      $.ajax({
          url: "https://api.github.com/users/"+options.user+"/repos?sort=pushed&callback=?"
        , dataType: 'jsonp'
        , error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); }
        , success: function(data) {
          var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < data.data.length; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
          if (options.count) { repos.splice(options.count); }
          render(options.target, repos, options);
        }
      });
    }
  };
})();
