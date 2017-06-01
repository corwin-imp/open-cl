var arrow_enabled = 1; // 0 выключить стрелочку вверх
var container = ''; //определяется в функции getContainer
var page = 1;
var wh = 0;
var load = false;
var ct = 0;
var pages = [];
var filter_ajax = false;
var tmp_data_container = '';
var container_first_div = '';
function getNextPage() {
	
    if (load) return;
    if (!filter_ajax) {
        if (page>pages.length) return;
        page++;
    } else {
        if ($('.pagination b').next().length==0) return;
    }
    load = true;
  
   
    if (filter_ajax) {
		
       var h = parseFloat($(container).css('height'));
	    console.info('h =' + h);
        $(container).css('height',h+'px');
        tmp_data_container = $(container).html();
        container_first_div = $(container + ' > div ').eq(0).html();
    } 
    w = parseFloat($(container).css('width'));
    $(container).append('<div id="ajaxblock" style="width:'+w+'px;height:30px;margin-top:20px;text-align:center;border:none !important;"><img src="/image/loader.gif" /></div>');
    
    var product_block = $(container + ' > div');
    if (!filter_ajax) {
        $.ajax({
        url:pages[page-2], 
        type:"GET", 
        data:'',
        success:function (data) {
            console.log('heheheh');
            $data =$(data);
            $('#ajaxblock').remove();
      		if ($data) {         
				if ($data.find(container + ' > div').length > 0)    {
					$(product_block).parent().append($data.find(container + ' > div').parent().html());
					if (product_block == '.product-grid') {$('#grid-view').trigger('click')};
				} else {
					$(product_block).parent().append($data.find(container + ' > div').parent().html());
					if (product_block == 'container + " > div"') {$('#list-view').trigger('click')};
				}
				
			}
            if (typeof display=='function') {
                
                if ((typeof $.totalStorage == 'function')) {
                    view = $.totalStorage('display');
                } else {
                    view = $.cookie('display');
                }
             
                if (view) {
                    display(view);
                } else {
                    display('list');
                }
            }
            load = false;
        }});
    } else {
		console.log('hello');
		var next = $('.pagination b').next();
		$('.pagination b').removeClass('active');
		next.addClass('active');
		
		var a =  next.attr("href");
        var b = a.match(/page=(\d+)/);
        $("#filterpro_page").val(b[1]);
        doFilter(false);
   //     var cont = getCont();
    //    $('html, body').animate({ scrollTop: $(cont).offset().top }, 'slow');
    //    return false;
		
		
    //  $('.pagination li.active').next().find('a').click();
      setTimeout('checkData()',100);
      
    }

}
function checkData() {
    if (container_first_div == $(container + ' > div ' ).eq(0).html()) {
        setTimeout('checkData()',100);    
    } else {
       $(container).prepend(tmp_data_container);
	   
       $('#ajaxblock').remove();
       $(container).css('height','auto');
       load = false; 
    }
}
/*
function scroll_top_page() {
    $('html, body').animate({
                     scrollTop: 0
                 }, 400, function() {
                     $('.arrow-scroll-top').remove();
                 });
   
}
*/
function getContainer() {

    if ($('.product-list').length>0) {
        container = '.product-list';
    } else  if ($('.product-grid').length>0) {
        container = '.product-grid';
    } else {
        
    }

    return container;
}

$(document).ready(function(){ 
  
    wh = $(window).height();
    container = getContainer();
   
    if ($(container).length>0) {
        ct = parseFloat($(container).offset().top);
        filter_ajax = (typeof doFiltergs == 'function') || (typeof doFilter == 'function');
        
                       
        $('.pagination a').each(function(){
            href = $(this).attr('href');
            if (jQuery.inArray(href,pages)==-1) {
              pages.push(href);
            }
        });
        $('.pagination').hide();
        $(window).scroll(function(){
            container = getContainer();
            ch = $(container).height();
			
            scroll_t = $(this).scrollTop();
			/*
			if (arrow_enabled)  {
				if (scroll_t>100) {
					if ($('.arrow-scroll-top').length==0) {
						$('body').append('<a class="arrow-scroll-top" onclick="scroll_top_page();"></a>')
					}
				} else {
					$('.arrow-scroll-top').remove();
				} 
			}
			*/
            if(ct+ch-wh<(scroll_t+50)){
				console.log(ch);
				console.log('go');
                getNextPage();
            }
        });
    }    
    
});