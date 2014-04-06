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

	scontacts.hide();

	contact_list.mouseenter( function() { scontacts.slideDown(); } );

	contact_list.mouseleave( function() { scontacts.slideUp(); } );

});
