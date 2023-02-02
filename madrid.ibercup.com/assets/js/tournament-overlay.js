$(document).ready(function(){

	currTarget = null;

	$('#splash .nav-tabs > li > a').hover(function(e) {
		e.preventDefault();
	  	$(this).tab('show');
	  	$(".nav-tabs > li").removeClass('active');
	  	$(this).parent().addClass('active');
	});

	$('#splash a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

		var current   = e.target;
		var currentId = $(e.target).prop("href").split("#")[1];

		// force hiding of inactive panes
		// due to some race condition in bootstrap
		$("#splash").find(".tab-pane").each(function(){

			if ($(this).prop("id") != currentId){
				$(this).removeClass("active").removeClass("in");
			}

		});

		$(".splash-row").stop().hide();

		var id = $(this).attr('href').substr(1);


		nextId = "#splash-" + id;

		if (currTarget){

			oldId = "#splash-" + currTarget;

		}else{

			oldId = "#splash-default"

		}

		$(nextId).stop().fadeIn();

		currTarget = id;

	})

})