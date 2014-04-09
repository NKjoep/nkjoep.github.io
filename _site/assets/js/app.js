jQuery(function() {

	/* Sidebar height set */
		var setHeight = function() {
			$( '.sidebar' ).css( 'min-height',$( document ).height() );
		};

		setHeight();
		$( window ).on( 'resize', setHeight );

	/* Secondary contact links */
	var scontacts = $( '#contact-list-secondary' );
	var contact_list = $( '#contact-list' );

	//scontacts.hide();
	//contact_list.mouseenter( function() { scontacts.slideDown(); } );
	//contact_list.mouseleave( function() { scontacts.slideUp(); } );


	if (!window.jXHR){
			var jxhr = document.createElement('script');
			jxhr.type = 'text/javascript';
			jxhr.src = window.BASE_PATH+'/assets/resources/jxhr.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(jxhr, s);
	}

	github.showRepos({
	        user: 'nkjoep',
	       count: 0,
  	skip_forks: true,
	      target: '#gh-repos',
	   itemClass: '',
	descriptions: false
	});

}); //domready
