/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

	/**********************************************
	 build share bar
	 **********************************************/

	lastShareBar = null;

	function updateShareCounts(skip_id) {

		// http://api.facebook.com/restserver.php?method=links.getStats&urls=http://facebook.com&format=json


		$(".share-buttons").each(function(){

			var $this = $(this);
			var id    = $this.data('id');
			if (id == skip_id) return;

			updateMyShareCounts($this);

		});

	}

	function updateMyShareCountsText($elm, count) {

		var label_singular = $elm.data('label-singular');
		var label_plural   = $elm.data('label-plural');
		var curr_count 	   = parseInt($elm.html());

		curr_count += count;
		var str   = " " + ((count == 1) ? label_singular:label_plural);
		$elm.html( count + str);

	}

	function updateMyShareCounts($elm) {

		return;

		// see https://gist.github.com/jonathanmoore/2640302
		var url     = $elm.data('url');

		// facebook
		var fb_api_url = "http://api.facebook.com/restserver.php";
		var fb_params = {method:'links.getStats', urls:url, format:'json'}

		$.get(fb_api_url, fb_params, function(data){

			var count = data.length ? data[0].total_count:0;
			updateMyShareCountsText($elm, count);

		});


		if (false){

			// twitter
			// FIXME api not public, won't work
			var twitter_api_url = 'http://urls.api.twitter.com/1/urls/count.json';
			var twitter_params = {url:url}

			$.get(twitter_api_url, twitter_params, function(data){

				var count = data.shares;
				updateMyShareCountsText($elm, count);

			});

			// pinterest
			var pinterest_api_url = "http://api.pinterest.com/v1/urls/count.json";
			var pinterest_params = {callback:'', url:url}

			$.get(pinterest_api_url, pinterest_params, function(data){

				var count = data.count;
				updateMyShareCountsText($elm, count);

			});

			// google_plus FIXME CHECK
			var google_plus_api_url = "https://clients6.google.com/rpc?key=AIzaSyCfZgXzwcv3rq7LQ8oUphXBj317pqklkfA";
			var google_plus_params = {
			    "method":"pos.plusones.get",
			    "id":"p",
			    "params":{
			        "nolog":true,
			        "id":url,
			        "source":"widget",
			        "userId":"@viewer",
			        "groupId":"@self"
			        },
			    "jsonrpc":"2.0",
			    "key":"p",
			    "apiVersion":"v1"
			}

			$.post(google_plus_api_url, google_plus_params, function(data){

				// [{
				//     "result": {
				//         "kind": "pos#plusones",
				//         "id": "http://stylehatch.co/",
				//         "isSetByViewer": false,
				//         "metadata": {
				//             "type": "URL",
				//             "globalCounts": {
				//                 "count": 3097.0
				//             }
				//         }
				//     } ,
				//     "id": "p"
				// }]

				var count = data.result.metadata.globalCounts.count;
				updateMyShareCountsText($elm, count);

			});
		}
	}

	if ($(".share-buttons").length)
		updateShareCounts(null);

	function showSharebar($elm) {

		var url  = $elm.data('url');
		var id   = $elm.data('id');
		var show_counts = 0;

		if (lastShareBar)
			updateMyShareCounts(lastShareBar);

		$fb_button = '<div id="fb-share-button-' + id + '" class="share-button fb-share-button" data-href="' + url + '" data-layout="' + (show_counts ? 'button_count':'button') + '"></div>';
		$twitter_button = '<div class="share-button" id="twitter-wjs"><a class="twitter-share-button" href="https://twitter.com/intent/tweet" ' + (show_counts ? '':'data-count="none"') + '>Tweet</a></div>';
		$google_plus_button = '<div class="share-button"><div class="g-plus" data-action="share" data-href="' + url + '" data-annotation="none"></div></div>';
		$linkedin_button = '<div class="share-button"><script type="IN/Share" data-url="' + url + '" ' + (show_counts ? 'data-counter="right"':'') + '></script></div>';
		$whatsapp_button = '<div class="share-button"><a class="whatsapp-share-button" href="whatsapp://send?text=' + url + '" data-action="share/whatsapp/share">WhatsApp</a></div>';

		$buttons = $fb_button + $twitter_button + $whatsapp_button;

		if (false && show_counts)
			$buttons += $linkedin_button;

		$elm.html($buttons);

		FB.XFBML.parse();

		twttr.widgets.load();

		// gapi.plus.go(); // Render all the buttons

		// IN.parse(); Linked in disabled

		lastShareBar = $elm;

	}

	$("#page-module-list").on("click", ".share-toggle", function(){

		var $elm = $(this).siblings('.share-buttons');
		showSharebar($elm);

	});

	$(".share-bar.auto-show").each(function(){

		showSharebar($(this).find('.share-buttons'));

	});

});
