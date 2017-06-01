
	var pagination_exist = true; // оставить пагинацию и добавить кнопку
	var button_more = true; // наличие кнопки "загрузить ещё"
	var top_offset = 100; // высота отступа от верха окна, запускающего arrow_top
	var window_height = 0; // высота окна
	var product_block_offset = 0; // отступ от верха окна блока, содержащего контейнеры
	var filter_ajax ='';
	var container_first_div = '';
	var tmp_data_container = '';
	var product_block = ''; // определяет div, содержащий товары
	var pages_count = 0; // счетчик массива ссылок пагинации
	var pages = []; // массив для ссылок пагинации
	var waiting = false;
	var page_to = '';
	var container = '.product-list';
	var bet = 1;
	window.cachedw = 0;
	function getNextProductPage(pages, pages_count) {
		console.log('getNextProductPage');
		if (waiting){
			console.log('waiting - ' + waiting);
			return;
		} 
		if (pages_count > pages.length){
			console.log( 'pages_count' + pages_count);
			console.log( 'pages.length' + pages.length);
			return;
		} 
		waiting = true;
		$(product_block).parent().after('<div class="text-center" id="ajax_loader"><img src="/image/ajax-loader-horizontal.gif" /></div>');
		if(filter_ajax){
			tmp_data_container = $('.product-list').html();
			container_first_div = $('.product-list > div').eq(0).html();
	
			var next = $('.pagination b').next();
		//	$('.pagination li.active').removeClass('active');
		//	next.addClass('active');
			
			var a =  next.attr("href");
			var b = a.match(/page=(\d+)/);
			$("#filterpro_page").val(b[1]);
			doFilter(false);

			$('#content #ajax_loader').remove();
			setTimeout('checkData()',100);

		  waiting = false;
		
			
		}else{
			$.ajax({
				url:pages[pages_count], 
				type:"GET", 
				data:'',
				success:function (data) {
					$data = $(data);
					$('#ajax_loader').remove();
					console.info(data);
					if ($data) {         
						if ($data.find('.product-list > div').length > 0)    {
							$(product_block).parent().append($data.find('.product-list > div').parent().html());
							if (product_block == '.product-grid > div') {$('.product-filter .display a').trigger('click')};
						} else {
							$(product_block).parent().append($data.find('.product-grid').parent().html());
							if (product_block == '.product-list > div') {$('.product-filter .display a').trigger('click')};
						}
						if (pagination_exist) {
							$('.pagination').html($data.find('.pagination'));
						}
					}
					waiting = false;
				}
			});
		}
		
		if (pages_count+1 >= pages.length) {$('.load_more').hide();};

	}

	function checkData() {
		if (container_first_div == $('.product-list > div').eq(0).html()) {
			setTimeout('checkData()',100);    
		} else {
		   $('.product-list').prepend(tmp_data_container);
		}
		waiting = false;
	}
	/*
	function scroll_to_top() {
		$('html, body').animate({
			scrollTop: 0
		}, 300, function() {
			$('.arrow_top').remove();
		});  
	}
	*/
	function getProductBlock() {
		if ($('.product-list > div').length > 0) {
			product_block = '.product-list > div';
		} else {
			product_block = '.product-grid > div';
		}
		return product_block;
	}



	/*
$( document ).ajaxComplete(function() {
	
	
		console.info(window.ajax_good);
		
		
var href = $('.pagination').find('a:last').attr('href');
	
		
	});
	
	*/

 
$.when( window.ajax_good ).done(function ( ) {
	function changeBtn(){
		window.ajax_good = $.Deferred();
	
			$.when( window.ajax_good ).done(function (  ) {
					pages = [];
					pages_count = 0;
					$('#content .load_more').off( "click");
				
					
					var href = $('.pagination  .links *:last').attr('href');
					$('.pagination').each(function(){
						if (href && href != undefined) {
								TotalPages = href.substring(href.indexOf("page=")+5);
								First_index = $(this).find('.links > b').html();
								i = parseInt(First_index) + 1;
								while (i <= TotalPages) {
									pages.push(href.substring(0,href.indexOf("page=")+5) + i);
									i++;
								}
							}		
					});
					
					if(href && !$('#content .load_more').is(".load_more")){
					
						$('.pagination').before(button_more_block);
					}
					if(!href){
						if($('#content .load_more').is(':visible')){
							$('#content .load_more').hide();
						}
					}else{
						if($('#content .load_more').is(':hidden')){
							$('#content .load_more').show();
						}
						
						$('#content .load_more').on('click', function(event) {
							event.preventDefault();
							getNextProductPage(pages, pages_count);
							pages_count++;
						});
					}	

				console.log(pages);	
			});
			if(window.cachedw){
				
					pages = [];
				
					pages_count = 0;
					$('#content .load_more').off( "click");
				
					
					var href = $('.pagination  .links *:last').attr('href');
					$('.pagination').each(function(){
						if (href && href != undefined) {
								TotalPages = href.substring(href.indexOf("page=")+5);
								First_index = $(this).find('.links > b').html();
								i = parseInt(First_index) + 1;
								while (i <= TotalPages) {
									pages.push(href.substring(0,href.indexOf("page=")+5) + i);
									i++;
								}
							}		
					});
					
					if(href && !$('#content .load_more').is(".load_more")){
					
						$('.pagination').before(button_more_block);
					}
					if(!href){
						if($('#content .load_more').is(':visible')){
							$('#content .load_more').hide();
						}
					}else{
						if($('#content .load_more').is(':hidden')){
							$('#content .load_more').show();
						}
						
						$('#content .load_more').on('click', function(event) {
							event.preventDefault();
							getNextProductPage(pages, pages_count);
							pages_count++;
						});
					}	
				
			
				window.cachedw = 0;
			}
	}
	$( "#slider-range" ).on( "slidechange", function( event, ui ) {
		
			changeBtn();
	});
	$(document).on('click', ".pagination a, #filterpro_box input,#filterpro_box #slider-range a", function(e) {	
			changeBtn();	
	});
		/*
			
			var current_page = parseFloat($('#filterpro #filterpro_page').val()); 
			var lim = $("#filterpro_limit").val();

			page_to = current_page * lim - window.product_total;
			if(current_page <= window.product_total / $("#filterpro_limit").val()){ 

				if(!($('#content .load_more'))){

					$('.pagination').parent().parent().before(button_more_block);
				}else if($('#content .load_more').is(':hidden')){

					$('#content a.load_more').css('display','inline-block');
					
				}{
					if(page_to == 0){
							$('#content .text-center .load_more').hide();
					}
				}
				
			}else if(page_to >= 0){
				if($('#content .load_more')){
					
					$('#content .text-center .load_more').hide();
				}	
			}
				*/
  	filter_ajax = (typeof doFiltergs == 'function') || (typeof doFilter == 'function');
	window_height = $(window).height();
	product_block = getProductBlock();
	var button_more_block = $('#load_more').html(); 
	
	if ($(product_block).length > 0) {
		product_block_offset = $(product_block).offset().top;
		var href = $('.pagination  .links *:last').attr('href');
		$('.pagination').each(function(){
			
			if (href && href != undefined) {
				TotalPages = href.substring(href.indexOf("page=")+5);
				First_index = $(this).find('.links > b').html();

				i = parseInt(First_index) + 1;
				while (i <= TotalPages) {
					pages.push(href.substring(0,href.indexOf("page=")+5) + i);
					i++;
				}
			}		
		});	
		
		if (button_more && (href && href != undefined)) {
			$('.pagination').before(button_more_block);
			
			if (!pagination_exist) {
				$('.pagination').parent().parent().remove();
			} else {
				$('.pagination').parent().parent().find('.col-sm-6.text-right').remove();
			}
			$('#content .load_more').on('click', function(event) {
				event.preventDefault();
				getNextProductPage(pages, pages_count);
				pages_count++;
			});
		} else if (href && href != undefined) { 
		console.log('not_to');
			$('.pagination').parent().parent().hide();
			$(window).scroll(function(){
				product_block = getProductBlock();
				product_block_height = $(product_block).parent().height();
				if (pages.length > 0) {
					if((product_block_offset+product_block_height-window_height)<($(this).scrollTop())){
						getNextProductPage(pages, pages_count);
						pages_count++;
					}
				}
			});
		}
	}
  
    
});
 
 

	



	
