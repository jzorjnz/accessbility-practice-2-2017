// JavaScript Document

var loading = "<div class=\"loading\">&nbsp;</div>";

$(function(){
	
	//print recipe
	$('.recipe_function.print').click(function(){
		$('.print_options').show();
	});
	
	
	//favorites
	
	//add handler
	$('.add_to_favorites').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		recipe.add_to_favorites(recipe_id);
		$(this).html("My Favorite!");
		
		$(this).removeClass('add_to_favorites');
		$(this).addClass('delete_from_favorites');
		
		$(this).removeClass('favorite_me');
		$(this).addClass('my_favorite');
	});
	
	//remove handler
	$('.delete_from_favorites').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		recipe.delete_from_favorites(recipe_id);
		$(this).html("Favorite Me!");
		
		$(this).addClass('add_to_favorites');
		$(this).removeClass('delete_from_favorites');
		
		$(this).addClass('favorite_me');
		$(this).removeClass('my_favorite');
	});
	
	//clips
	$('.add_to_clips').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		recipe.add_to_clips(recipe_id);
		$(this).html("Clipped!");
		
		$(this).removeClass('add_to_clips');
		$(this).addClass('delete_from_clips');
		
		$(this).removeClass('clip_me');
		$(this).addClass('my_clip');
		
		recipe.update_clips();
		
	});
	
	//remove handler
	$('.delete_from_clips').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		recipe.delete_from_clips(recipe_id);
		$(this).html("Clip Me!");
		
		$(this).addClass('add_to_clips');
		$(this).removeClass('delete_from_clips');
		
		$(this).addClass('clip_me');
		$(this).removeClass('my_clip');
		
		recipe.update_clips();
	});
	
	
	
	// all you need to do to use the prep functions is add 'prep' to the class 
	//and set a default="something" attribute, everything else it taken care of
	
	$("body").delegate(".prep", "focus", function(){
		if($(this).attr('default') != '') {
			var value = $(this).attr('default');
			if($(this).val() == value) {
				$(this).val('');
			}
		}
	}); 
	
	$("body").delegate(".prep", "blur", function(){
		if($(this).attr('default') != '') {
			var value = $(this).attr('default');
			if($(this).val() == '') {
				$(this).val(value);	
			}
		}
	});
	
	ingredients.load_ingredient_manager();
	reviews.init();
	
	//promo slider
	$(".promo-scrollable").scrollable({circular: true}).autoscroll({ autoplay: false });
	
	
	$('.categories h3').click(function() {
		toggle_this($(this).next());
	});
	
	
	
	$('.sort.selected').mouseenter(function(){
		$(this).hide();
		$(this).siblings('.sort.options').show();
	});
	
	$('.sort.options').mouseleave(function(){
		$(this).hide();
		$(this).siblings('.sort.selected').show();
	});
	
	
	$('.recipe .show_my_recipe_lists').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		
		my_recipe_lists.load_lists(recipe_id);
		
		
		$("#overlay").modal({
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('slow', function () {
					dialog.data.hide();
					dialog.container.fadeIn('fast', function () {
						dialog.data.slideDown('fast');
					});
				});
			},
			opacity: 40,
			overlayClose: true,
			minHeight: 200,
			minWidth: 300,
			overlayCss: {backgroundColor:"#000"}
		});
		
	});
	
	
	$('.members .show_my_recipe_lists').live('click', function(){
		
		my_recipe_lists.load_create_lists();
		
		
		$("#overlay").modal({
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('slow', function () {
					dialog.data.hide();
					dialog.container.fadeIn('fast', function () {
						dialog.data.slideDown('fast');
					});
				});
			},
			opacity: 40,
			overlayClose: true,
			minHeight: 200,
			minWidth: 300,
			overlayCss: {backgroundColor:"#000"}
		});
		
		return false;
	});
	
	
	$('.my_recipe_lists #create_list').live('click', function(){
		var recipe_id = $(this).attr('data-recipe-id');
		var recipe_list_name = $('#new_list_name').val();
		if(recipe_list_name != $('#new_list_name').attr('default')){
			my_recipe_lists.create_list(recipe_id, recipe_list_name);
			if(recipe_id != 0) { my_recipe_lists.load_lists(recipe_id); }
			else {
				window.location.reload();
			}
		}
	});
	
	$('.my_recipe_lists .lists input[type="checkbox"]').live('click', function(){
		var recipe_id = $('#create_list').attr('data-recipe-id');
		var list_id = $(this).val();
		//console.log(recipe_id + " " + list_id);
		my_recipe_lists.toggle_recipe_list(recipe_id, list_id);
	});
	
	
	
	
	
	
	$('.login.fly').live({
		click: function() {
			var message = $(this).attr('data-message');
			modal_page(site_url + "auth/f_login/", {width: 300, height: 400, message: message});
			FB.XFBML.parse()
			return false;	
		}
	});
	
	
	$('.register.fly').live({
		click: function() {
			var message = $(this).attr('data-message');
			modal_page(site_url + "auth/f_register/", {width: 300, height: 400, message: message});
			return false;
		}
	});
	
	$('.forgot-pass.fly').live({
		click: function() {
			var message = $(this).attr('data-message');
			modal_page(site_url + "auth/f_forgot_password/", {width: 300, height: 400, message: message});
			return false;
		}
	});
	
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		theme: 'facebook', // light_rounded / dark_rounded / light_square / dark_square / facebook
		social_tools: false
	});

	$('.recipe .ingredient').live({
		click: function() {
			var ingredient_id = $(this).attr('data-ingredient-id');
			//console.log(ingredient_id);
			if($(this).hasClass('check')){
				//delete ingredient
				ingredients.delete_search_ingredient(ingredient_id);
			}
			else {
				//add class
				ingredients.add_search_ingredient(ingredient_id);
			}
			//toggle 'checked' class on all ingredients with this id
			$('.recipe .ingredient[data-ingredient-id="'+ ingredient_id + '"]').toggleClass('check');
			ingredients.recalculate_recipe_percentages();
		}
	});


});

	
	var my_recipe_lists = {
		
		load_lists: function(recipe_id){
		
			$.ajax({
				type: "GET",
				async: false,
				url: site_url + "recipe/f_load_recipe_lists_manager/" + recipe_id,
				success: function(response){
					
					$('#overlay').html(response);
				}
			});
		},
		load_create_lists: function(){
		
			$.ajax({
				type: "GET",
				async: false,
				url: site_url + "recipe/f_load_create_recipe_lists_manager/",
				success: function(response){
					
					$('#overlay').html(response);
				}
			});
		},
		create_list: function(recipe_id, recipe_list_name){
			$.ajax({
				type: "POST",
				async: false,
				data: "name=" + recipe_list_name,
				url: site_url + "recipe/f_create_new_list/" + recipe_id,
				success: function(response){
					//console.log(response);
				}
			});
		},
		toggle_recipe_list: function(recipe_id, list_id){
		
			$.ajax({
				async: false,
				url: site_url + "recipe/f_toggle_recipe_list/" + recipe_id + "/" + list_id,
				success: function(response){
					//console.log(response);
				}
			});
		}
	};
	
	function print_recipe(recipe_id, method){
		window.open(site_url + 'recipe/f_print/' + recipe_id + '/' + method,'','width=950,height=700');
	}
	
	function modal_page(page_url, options){
	
		$.ajax({
			type: "GET",
			url: page_url,
			async: false,
			success: function(msg){
				
				$('#overlay').html(msg);
				if(options.message != undefined){ 
					$('#overlay .message').html(options.message);
					$('#overlay .message').show(); 
				}
				
				
				//FB.XFBML.parse(); used to render fb button since this happens post dom
				$("#overlay").modal({
					
					onOpen: function (dialog) {
						dialog.overlay.fadeIn('slow', function () {
							dialog.data.hide();
							dialog.container.fadeIn('fast', function () {
								dialog.data.slideDown('fast');
							});
						});
					},
					
					opacity: 40,
					overlayClose: true,
					minHeight: options.height,
					minWidth: options.width,
					overlayCss: {backgroundColor:"#000"}
				});
			}
		});
	}
	
	

var ingredients = {
	
	load_search_ingredients: function() {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: site_url + "search/f_load_search_ingredients/",
			success: function(msg){
				//$('.ingredients.items').html(msg);
				$('#my-ingredients .ingredients .items').html('');
				var api = $("#my-ingredients .ingredients").data("scrollable");
				api.addItem(msg.ingredients).begin();
				ingredients.load_required_ingredients();
				var current_category = $('.category.selected').attr('data-val');
				//this function was calling itself so i killed it, not sure why it ws being called
				//ingredients.set_ingredient_category(current_category);
			}
		});
	},
	set_pantry_method: function(matcher_method) {
		$.ajax({
			type: "POST",
			url: site_url + "search/f_set_pantry_method/",
			data: "matcher_method=" + matcher_method,
			success: function(msg){
				//alert(msg);
				ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_functions();
				ingredients.load_search_ingredient_categories();
			}
		});
	},
	add_search_ingredient: function(id) {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: site_url + "search/f_add_search_ingredient/",
			data: "id=" + id,
			success: function(msg){
				$("#ingredient-search-field").val('');
				//$("#ingredient-search-field").focus();
				//ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_categories();
				ingredients.load_required_ingredients();
				ingredients.set_message(msg.message);
			}
		});	
	},
	delete_search_ingredient: function(id) {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: site_url + "search/f_delete_search_ingredient/",
			data: "id=" + id,
			success: function(msg){
				$("#ingredient-search-field").val('');
				//$("#ingredient-search-field").focus();
				//ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_categories();
				ingredients.load_required_ingredients();
				ingredients.set_message(msg.message);
			}
		});	
	},
	add_primary_ingredient: function(id) {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: site_url + "search/f_add_primary_ingredient/",
			data: "id=" + id,
			success: function(msg){
				$("#ingredient-search-field").val('');
				$("#ingredient-search-field").focus();
				//ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_categories();
				ingredients.load_required_ingredients();
				ingredients.set_message(msg.message);
			}
		});	
	},
	delete_primary_ingredient: function(id) {
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: site_url + "search/f_delete_primary_ingredient/",
			data: "id=" + id,
			success: function(msg){
				$("#ingredient-search-field").val('');
				$("#ingredient-search-field").focus();
				//ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_categories();
				ingredients.load_required_ingredients();
				ingredients.set_message(msg.message);
			}
		});	
	},
	set_message: function(message){
		$('#my-ingredients .message').html(message);	
	},
	set_ingredient_display_method: function(ingredient_method) {
		
		//show all ingredient / show my ingredients	
		if(ingredient_method == 'mine') {
			$('.ingredients-f.all').removeClass('selected');
			$('.ingredients-f.mine').addClass('selected');
		}
		else if(ingredient_method == 'all') {
			$('.ingredients-f.mine').removeClass('selected');
			$('.ingredients-f.all').addClass('selected');
		}
		else {
			ingredient_method = 'all';	
		}
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_set_ingredient_display_method/",
			data: "ingredient_method=" + ingredient_method,
			success: function(msg){
				ingredients.set_message(msg.message);
				ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_functions();
			}
		});
	},
	set_ingredient_category: function(category_id) {
		
		//show all ingredient / show my ingredients	
		$('.ingredient-categories .category').removeClass('selected');
		$('.ingredient-categories #category-' + category_id).addClass('selected');
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_set_ingredient_category/",
			data: "category_id=" + category_id,
			success: function(msg){
				ingredients.set_message(msg.message);
				ingredients.load_search_ingredients();
			}
		});
	},
	load_search_ingredient_categories: function(){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_load_search_ingredient_categories/",
			success: function(msg){
				$('.ingredient-categories').html(msg.categories);
			}
		});
	},
	load_search_ingredient_functions: function(){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_load_search_ingredient_functions/",
			success: function(msg){
				$('.ingredient-functions').html(msg.functions);
			}
		});
	},
	load_required_ingredients: function(){
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_load_required_ingredients/",
			success: function(msg){
				//alert(msg.ingredients);
				$('.required-ingredients').html(msg.ingredients);
			}
		});
	},
	clear_ingredients: function() {
			$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_delete_search_ingredients/",
			success: function(msg){
				ingredients.set_message(msg.message);
				ingredients.load_search_ingredients();
				ingredients.load_search_ingredient_categories();
			}
		});
	},
	sort_results: function(sort_method, page, search_method) {
		
		if(search_method == undefined){
			search_method = 'matcher';
		}
		
		$.ajax({
			type: "POST",
			url: site_url + "search/f_set_search_sort/",
			data: "search_sort=" + sort_method + "&search_method=" + search_method,
			success: function(msg){
				window.location = site_url + page + '/';
			}
		});
	},
	load_ingredient_manager: function() {
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: site_url + "search/f_load_ingredient_manager/",
			data: "",
			success: function(msg){
				$('#my-ingredients').append(msg.content);
				
				$('.pantry-method.epantry').live({
					click: function() {
						$('.pantry-method').removeClass('selected');
						$(this).addClass('selected');
						ingredients.set_pantry_method('epantry');
					}
				});
	
				$('.pantry-method.quick').live({
					click: function() {
						$('.pantry-method').removeClass('selected');
						$(this).addClass('selected');
						ingredients.set_pantry_method('quick');
					}
				});
				
				$("#my-ingredients .ingredients").scrollable({
					next: '.tab-right',
					prev: '.tab-left'
				});
				
				
				$('.search-ingredients').click(function(){
					
					$(this).toggleClass('selected');
					toggle_this('#my-ingredients');
				});
				
				$('.ingredients-f.mine').live({
					click: function() {
						ingredients.set_ingredient_display_method('mine');
					}
				});
				$('.ingredients-f.all').live({
					click: function() {
						ingredients.set_ingredient_display_method('all');
					}
				});
				$('.ingredients-f.clear').live({
					click: function() {
						ingredients.clear_ingredients();
					}
				});
				
				$('.ingredient-categories .category').live({
					click: function() {
						var cat = $(this).attr('data-val');
						//alert(cat);
						ingredients.set_ingredient_category(cat);
					}
				});
				
				//sets the sort method for matcher and category results
				$('.set-sort').live({
					click: function() {
						var sort_method = $(this).attr('data-sort');
						var search_page = $(this).attr('data-page');
						ingredients.sort_results(sort_method, search_page, 'matcher');
						
					}
				});
				
				//sets the sort method title search results
				$('.set-sort.results').live({
					click: function() {
						var sort_method = $(this).attr('data-sort');
						var search_page = $(this).attr('data-page');
						ingredients.sort_results(sort_method, search_page, 'results');
						
					}
				});
				
				$('#my-ingredients .ingredients span.ingredient').live({
					click: function() {
						
						if($(this).hasClass('selected')) {
							ingredients.delete_search_ingredient($(this).parent().attr('data-id'));
							$(this).siblings().removeClass('selected');
						}
						else {
							ingredients.add_search_ingredient($(this).parent().attr('data-id'));
						}
						$(this).toggleClass('selected');
						return false;
					}
					
				});
				
				$('#my-ingredients .ingredients span.primary').live({
					click: function() {
						if($(this).hasClass('selected')) {
							ingredients.delete_primary_ingredient($(this).parent().attr('data-id'));
						}
						else {
							ingredients.add_primary_ingredient($(this).parent().attr('data-id'));
						}
						$(this).toggleClass('selected');
						$(this).siblings().addClass('selected');
						return false;
					}
				});
				
				$('.required-ingredients .remove').live({
					click: function() {
						ingredients.delete_primary_ingredient($(this).attr('data-id'));
						//ingredients.load_search_ingredients();
					}
				});
				
				$("#ingredient-search-field").autocomplete({
					source: site_url + "search/f_ingredient_search/",
					minLength: 2,
					select: function( event, msg ) {
						//alert("yo!");
						ingredients.add_search_ingredient(msg.item.id);
						ingredients.load_search_ingredients();
						$("#ingredient-search-field").focus();
				
					}
				});
			}
		});	
	},
	recalculate_recipe_percentages: function(){
		var recipes = $('.recipe');
		$.each(recipes, function(index){
			var have = $('.ingredients .ingredient.check', recipes[index]).length;
			var total = $('.ingredients .ingredient', recipes[index]).length;
			var percentage = Math.floor((have / total) * 100);
			
			
			
			if(percentage < 20){ color = 'percentage-0-20'; }
			else if((percentage > 19) && (percentage < 40)){ color = 'percentage-19-40'; }
			else if((percentage > 39) && (percentage < 60)){ color = 'percentage-39-60'; }
			else if((percentage > 59) && (percentage < 80)){ color = 'percentage-59-80'; }
			else if((percentage > 79) && (percentage < 100)){ color = 'percentage-79-100'; }
			else if(percentage == 100){ color = 'percentage-100'; }
			
			$('.percentage div', recipes[index]).removeClass('percentage-0-20');
			$('.percentage div', recipes[index]).removeClass('percentage-19-40');
			$('.percentage div', recipes[index]).removeClass('percentage-39-60');
			$('.percentage div', recipes[index]).removeClass('percentage-59-80');
			$('.percentage div', recipes[index]).removeClass('percentage-79-100');
			$('.percentage div', recipes[index]).removeClass('percentage-100');
			$('.percentage div', recipes[index]).addClass(color);
			$('.percentage .percentage_fill', recipes[index]).css('width', percentage + "%");
			$('.percentage .percentage_number', recipes[index]).html(percentage + "%");
			
			//$('.percentage', recipes[index]).html();
		});
	}
	
	
	
	
	
};

var reviews = {

	submit_review: function() {
		
		var recipe_id = $('input.recipe_id').val();
		var score = $('#stars_new-score').val();
		var review = $('#review_comment').val();
		
		if(score != ''){
			$.ajax({
				type: "POST",
				data: "recipe_id=" + recipe_id + "&score=" + score + "&review=" + review,
				dataType: "json",
				url: site_url + "recipe/f_submit_recipe_review/",
				success: function(data){
					$('.review_process').html(data.page);
				}
			});
		}
		else {
			$('.review_process .notice').html("Please rate this recipe!").addClass('rate_recipe').slideDown();
			$('#stars_new').effect('shake', {}, 200);
		}
	},
	init: function(){
		$('.submit_recipe_review').click(function() {
			reviews.submit_review();
		});
	}
};

var recipe = {

	add_to_favorites: function(recipe_id) {
		$.ajax({
			type: "POST",
			data: "recipe_id=" + recipe_id,
			dataType: "json",
			url: site_url + "recipe/f_add_to_favorites/",
			success: function(data){
				
			}
		});
	},
	delete_from_favorites: function(recipe_id) {
		$.ajax({
			type: "POST",
			data: "recipe_id=" + recipe_id,
			dataType: "json",
			url: site_url + "recipe/f_delete_from_favorites/",
			success: function(data){
				
			}
		});
	},
	add_to_clips: function(recipe_id) {
		$.ajax({
			type: "POST",
			data: "recipe_id=" + recipe_id,
			dataType: "json",
			url: site_url + "recipe/f_add_to_clips/",
			success: function(data){
				
			}
		});
	},
	delete_from_clips: function(recipe_id) {
		$.ajax({
			type: "POST",
			data: "recipe_id=" + recipe_id,
			dataType: "json",
			url: site_url + "recipe/f_delete_from_clips/",
			success: function(data){
				
			}
		});
	},
	update_clips: function(){
		$.ajax({
			type: "GET",
			dataType: "json",
			url: site_url + "recipe/f_get_clips/",
			success: function(data){
				$('.recipe_clips').html(data.html);
			}
		});
	}
}



function hide_this(handle) {
	$(handle).animate(
		{
			opacity: 'hide',
			height: 'hide'
		}, 
		1000, 
		'easeOutExpo'
	);
}
function show_this(handle) {
	$(handle).animate(
		{
			opacity: 'show',
			height: 'show'
		}, 
		1000, 
		'easeOutExpo'
	);
}
function toggle_this(handle) {
	$(handle).animate(
		{
			opacity: 'toggle',
			height: 'toggle'
		}, 
		1000, 
		'easeOutExpo'
	);
}