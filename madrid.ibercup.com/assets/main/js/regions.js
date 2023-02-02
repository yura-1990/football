// var locale 		= 'en'; // FIXME

$(function() {

	function loadRegions(country_code){

		if (country_code){

			const defaultValue = '--';
			const defaultLabel = 'n/a';

			// $('.region-field').prop('required', false);
			var url = Routing.generate('ibercup_admin_page_load_regions',{country_code:country_code, _locale:locale });

			$.get(url, function(data){

				$('.region-field option:gt(0)').remove();

				if (data.result == 'SUCCESS'){
					
					const regions = data.regions;
					const keys = Object.keys(regions);
					if (keys && keys.length > 0) {
						for (let i = 0; i < keys.length; i++) {
							let key = keys[i];
							let label = "" + key;
							let value = regions[key];
							$('.region-field').append($("<option></option>")
								.attr("value", value).text(label));
						}
					} else {
						$('.region-field').append($("<option></option>")
						.attr("value", defaultValue).text(defaultLabel));
					}

				}else{
					$('.region-field').append($("<option></option>")
					.attr("value", defaultValue).text(defaultLabel));
				}

			},'json');

		}

	}

	$(".country-field").change(function(){

		loadRegions($(this).val());

	});

	//loadRegions($(".country-field").val());

});
