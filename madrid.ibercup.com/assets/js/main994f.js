window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

$(document).ready(function(){

	/**********************************************
	 collapsable header
	 **********************************************/
	var $main		 = $("#main");
	var $header      = $('header');
	var $navbar      = $('#navbar');
    var $topbar      = $('#world-menu'); // $('#topbar');
	var $logobig     = $('#logo-big');
	var $logosmall   = $('#logo-small');
	var $titlebanner = $(".title-banner");
	var $titlebannerheight = $titlebanner.height();
	var $titlebannerminheight = 85; // parseInt($(".title-banner.collapsed").css('height'));
	var $titlebanneroverlay = $(".title-banner-overlay");
	var $sidebar 	 = $("#sidebar");
	var $sidebarcnts = $("#sidebar .sidebar-cnts");

	var $infobanner = $(".info-banner");
	var $infobannerheight = $infobanner.height();
	var $infobannerminheight = 200; // parseInt($(".playerinfo-banner.collapsed").css('height'));
	// var $infobanneroverlay = $(".info-banner-overlay");

	$(function(){
		$header.data('size','big');
	});

	function adjustTournamentOverlay(force_hide) {

		if (force_hide || $("#tournament-selector").hasClass("open")){

			$("#tournament-overlay").fadeOut();
			$("#tournament-selector li").removeClass("open");
			$topbar.removeClass("overlay");

		}else{

			$("#tournament-overlay").fadeIn();
			$("#tournament-selector li").addClass("open");
			$topbar.addClass("overlay");

		}

	}

	function adjustTitleBanner() {

		if ($titlebanner.length){

			var adjusted_height = $titlebannerheight - $(window).scrollTop();

			if (adjusted_height > $titlebannerminheight ){
				$titlebanner.height( adjusted_height );
				unpinSidebar();
			}else{
				$titlebanner.height( $titlebannerminheight );
				pinSidebar();
			}

			// adjust title when it stops / starts fitting
			if (adjusted_height < 120){
				$titlebanner.addClass('collapsed').removeClass('expanded');
				$titlebanneroverlay.addClass('collapsed').removeClass('expanded');
			}else{
				$titlebanner.addClass('expanded').removeClass('collapsed');
				$titlebanneroverlay.addClass('expanded').removeClass('collapsed');
			}

		}

	}

	function adjustInfoBanner() {

		if ($infobanner.length){

			var adjusted_height = $infobannerheight - $(window).scrollTop();

			if (adjusted_height > 100) {  // $infobannerminheight ){
				// $infobanner.height( adjusted_height );
				unpinSidebar();
			}else{
				// $infobanner.height( $infobannerminheight );
				pinSidebar();
			}

			// adjust title when it stops / starts fitting
			if (adjusted_height < 100){
				$infobanner.addClass('collapsed').removeClass('expanded');
				$main.addClass('main-info-collapsed').removeClass('main-info');
				// $infobanneroverlay.addClass('collapsed').removeClass('expanded');
			}else{
				$infobanner.addClass('expanded').removeClass('collapsed');
				$main.addClass('main-info').removeClass('main-info-collapsed');
				// $infobanneroverlay.addClass('expanded').removeClass('collapsed');
			}

		}

	}

	function collapseMenu() {

		if (typeof $header == 'undefined') return;

		if ($header.data('size') == 'big') {

			$logobig.stop().fadeOut('fast', function(){

				$logosmall.stop().fadeIn('fast');

			});

			$header.data('size','small').stop().animate({

				top: (adminbar ? '0px':'-45px'),
				height: '85px'


			}, 100, function(){


			}).addClass('collapsed').removeClass('expanded');

			// $titlebanner.addClass('collapsed').removeClass('expanded');
			// $titlebanneroverlay.addClass('collapsed').removeClass('expanded');

		}

		$("#footer-widgets").fadeIn();

	 }

	function expandMenu() {


		if ($header.data('size') == 'small') {

			$header.data('size','big').stop().animate({

				height: '150px'

			}, 100, function(){

				$header.animate({
					top: (adminbar ? '40px':'0px'),
				},100, function(){

					$logosmall.stop().fadeOut('fast', function(){
						$logobig.stop().fadeIn('fast');
					});

				}).addClass('expanded').removeClass('collapsed');

			});

			// $titlebanner.addClass('expanded').removeClass('collapsed');
			// $titlebanneroverlay.addClass('expanded').removeClass('collapsed');

		}

		$("#footer-widgets").fadeOut();

	}

	function pinSidebar() {
        if (typeof preventSidebarPin !== 'undefined' && preventSidebarPin) return;
		$sidebarcnts.addClass('fixed').width($sidebar.width());
	}

	function unpinSidebar() {
		$sidebarcnts.removeClass('fixed');
	}

	function adjustMenu() {

		if ($(window).scrollTop() > threshold) { // threshold defined in block head_js
			collapseMenu();
		}else{
			expandMenu();
		}

		adjustTitleBanner();
		adjustInfoBanner();

	}

	var $sidebar = $("#sidebar"),
		$sidebar_bottom = $(".sidebar-bottom"),
		$social = $("#social_networks"),
		sidebar_bottom_hidden = false,
		sidebar_bottom_threshold = 0;

	function adjustSidebar() {

		if (!$sidebar.length) return;

		var scrollTop = $(window).scrollTop();

		var social_top = $social.offset().top;
		var sidebar_bottom = $sidebar_bottom.offset().top + $sidebar_bottom.height();

		if (sidebar_bottom_hidden && scrollTop < sidebar_bottom_threshold){
			$sidebar_bottom.show();
			sidebar_bottom_hidden = false;
			sidebar_bottom_threshold = 0;
		}else{

			if (social_top < sidebar_bottom){
				sidebar_bottom_threshold = scrollTop;
				$sidebar_bottom.hide();
				sidebar_bottom_hidden = true;
			}
		}

		// unpin visible sidebar if overlapping footers (social, footer, copyright)
		var margin = 20;
		var visible_sidebar_bottom = $sidebar.offset().top + $sidebar.height();
		if ((margin + visible_sidebar_bottom + scrollTop) > social_top) {
			unpinSidebar();
		}

	}

	is_mobile = mobilecheck();

	$(window).scroll(function(){
		if (is_mobile || editor) return;
		adjustTournamentOverlay(true);
		adjustMenu();
		adjustSidebar();
        hideSubmenuOverlay();
	});

	$("#footer-widgets").click(function(e){

		console.log("scroll top");
		e.preventDefault();
		$('html, body').animate({scrollTop:0});
		return false;

	});

    /**********************************************
	 Turn dropdown menus into banners
	 **********************************************/
     function showSubmenuOverlay($content, classes) {
         $("#submenu-overlay-content > .container").html('').append($content);
         $("#submenu-bg").removeClass().addClass(classes);
         $("#submenu-overlay").stop().show();

         // check for overflow
         $("#submenu-overlay-content").removeClass('overflowed');
         $("#submenu-overlay").removeClass('overflowed');
         var container_height = $("#submenu-overlay-content  > .container ").outerHeight(true);
         var content_height = $("#submenu-overlay-content  > .container  > .content").outerHeight(true);
         console.log("container_height: ", container_height);
         console.log("content_height: ", content_height);
         if (content_height > container_height){
             $("#submenu-overlay-content").addClass( 'overflowed' );
             $("#submenu-overlay").addClass( 'overflowed' );
         }

         $("#world-menu").addClass('smenu-open');
         $("#main_menu").addClass('smenu-open');
         $("#logo").addClass('smenu-open');
         $("#logo-image").prop('src', $("#logo-image").data('dark'));
     }

     function hideSubmenuOverlay() {
         $("#submenu-overlay").stop().hide();
         $("#world-menu").removeClass('smenu-open');
         $("#main_menu").removeClass('smenu-open');
         $("#logo").removeClass('smenu-open');
         $("#logo-image").prop('src', $("#logo-image").data('light'));
     }

     $("#main_menu > li").on("mouseover", function(e) {
         console.log("menumouseover");
         if (is_mobile) return true;
         $("#main_menu > li").removeClass('selected');
         $(this).addClass('selected');
         var $submenu = $(this).find('ul');
         console.log("submenu: ", $submenu);
         if ($submenu.length){
             // for(i=0; i < 5; i++){ $submenu.append("<li><a href='#'>1</a></li>"); };
             var $submenuClone = $submenu.clone();
             var classes = $(this).attr('class');
             var title = $('a:first',this).text(); console.log("title: ", title);
             var $title = $("<h3>").text(title);
             var $content = $("<div>").addClass('content').append($title).append($submenuClone);
             showSubmenuOverlay($content, classes);
        }

     });

     $("#main_menu > li a").on("click", function(e) {
         if (is_mobile) return true;
         e.preventDefault();
         return false;
     });

     $("#submenu-overlay").on("mouseleave", function(e) {
         hideSubmenuOverlay();
     });

     $("#world-menu").on("mouseenter", function(e) {
         hideSubmenuOverlay();
     });

     $("#main_menu > li").on("mouseleave", function(e) {
         return false;
         console.log("mouseleave");
         $("#submenu-overlay").stop().hide();
     });

     $("#main_menu .dropdown").on('show.bs.dropdown', function (e) {
         // do something…
         console.log('### showing menu');
         console.log(e);
         $("#submenu-overlay").stop().show();
     });

     $("#main_menu .dropdown").on('hide.bs.dropdown', function (e) {
         // do something…
         console.log('### hiding menu');
         console.log(e);
         $("#submenu-overlay").stop().hide();
     });

	/**********************************************
	 Tournament Overlay
	 **********************************************/
	var openTournamentDefer  = null;
	var closeTournamentDefer = null;

	$("#tournament-selector").click(function(e){
		e.preventDefault();
		return false;
	});

	$("#tournament-selector").mouseover(function(){
		if (!openTournamentDefer){
			console.log("open overlay in 1 sec: ", openTournamentDefer);
			openTournamentDefer = setTimeout(function(){
				console.log("open overlay NOW: ", openTournamentDefer);
				adjustTournamentOverlay(false);
			}, 500);
		}
	});

	$("#tournament-overlay").mouseover(function(){
		clearTimeout(closeTournamentDefer);
		closeTournamentDefer = null;
	});

	$("#tournament-selector").mouseleave(function(){
		clearTimeout(openTournamentDefer);
		openTournamentDefer = null;
		console.log("CANCEL open overlay: ", openTournamentDefer);
		if (!closeTournamentDefer){
			closeTournamentDefer = setTimeout(function(){
				adjustTournamentOverlay(true);
			}, 100);
		}
	});

	$("#tournament-overlay").mouseleave(function(){
		adjustTournamentOverlay(true);
	});

    // FIXME
	// $(".dropdown-toggle").mouseover(function(){
	// 	adjustTournamentOverlay(true);
	// });

	/**********************************************
	 Pictograms
	 **********************************************/
	$(document).on('mouseenter',".pictogram", function(){

		$(".pictogram-label").fadeOut();
		$(".pictogram-label", this).fadeIn('fast');

	});

	$(document).on('mouseleave',".pictogram", function(){

		$(".pictogram-label", this).fadeOut();

	});

	// enable bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip();

	/**********************************************
	 Player Info (on team page and live match)
	 **********************************************/
	var showPlayerInfoDefer  = null;
	var showingPlayerInfo   = false;
	var $playerInfo = $("#player-info");
	var playerContent = "";

	function fillPlayerInfo() {
		$playerInfo.html( playerContent ).show();
	}

	$(".player-item").mouseover(function(){

		var team = $(this).data("team");
		console.log("team: " + team);

		if (team){
			$playerInfo = $("#player-info-" + team);
			console.log("$playerInfo: ", $playerInfo);
		}else{
			$playerInfo = $("#player-info");
		}

		playerContent = $(".player-description", $(this)).html();

		$(".player-item").removeClass("active");
		$(this).addClass("active");

		if (showingPlayerInfo) {
			fillPlayerInfo();
			return;
		}

		// if (!showPlayerInfoDefer){
		// 	showPlayerInfoDefer = setTimeout(function(){

				console.log("showing player info");
				showingPlayerInfo = true;
				fillPlayerInfo();

		// 	}, 100);
		// }

	})

	$(".player-item").mouseout(function(){
		console.log("hiding player info");
		clearTimeout(showPlayerInfoDefer);
		showPlayerInfoDefer = null;
		showingPlayerInfo = false;
		$playerInfo.hide();
		$(this).removeClass("active");

	})

});
