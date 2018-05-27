//

var image_scale = .56;
var index = (localStorage.getItem('index')) ? parseInt(localStorage.getItem('index')) : 0;
var lastIndex = index;
var lang, info, header, data;

//

initLang();
setupViews();
setTimelineDrag();

// DEBUG
// enterStory();

//

$(document).ready(function() {

    $(window).resize(updateViews);

})

function updateViews() {
    setupViews();
    updateTimelineViews();
}

//

function initLang() {

	lang = (localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'ZH_CN';

	localStorage.setItem('lang', lang);
    
    $.getJSON('data/' + lang + '/info.json', function(jsonData) {

        info = jsonData;
        bindEnterAboutData();
        loadJSONHeader();

    });

}

function loadJSONHeader() {
    
    $.getJSON('data/' + lang + '/header.json', function(jsonData) {

        header = jsonData;
        loadJSONData();

    });

}

function loadJSONData() {
    
    $.getJSON('data/' + lang + '/data.json', function(jsonData) {

        data = jsonData;
        initData();

    });

}

function switchLang(selectedLang) {

	if (selectedLang != 'ZH_CN') {
		alert('Coming Sooooooon ...');
		lang = 'ZH_CN';
		return;
	}

	lang = selectedLang;

	localStorage.setItem('lang', lang);
    
    $.getJSON('data/' + lang + '/data.json', function(jsonData) {

        data = jsonData.data;
        header = jsonData.header;

        bindEnterAboutData(jsonData);
        bindDetailData();
        bindTimelineData();

    });

}

function enterStory() {

	$('#enter_frame').slideUp(1000, function() {
		$('#enter_frame').css('display', 'none');
	});
    $('#main_frame').animate({opacity: '1'}, 1500);

    setHotkey();

}

function bindEnterAboutData() {

    $(document).attr('title', info.enter.title);

    $('#about_title').html(info.about.title);
    $('#about_tip').html(info.about.tip);
    $('#about_github').html(info.about.github);
    $('#about_producer').html(info.about.producer);
    $('#about_developer').html(info.about.developer);
    $('#about_dev_helper').html(info.about.dev_helper);
    $('#about_zh_cn').html(info.about.zh_cn);
    $('#about_zh_tw').html(info.about.zh_tw);
    $('#about_kr').html(info.about.kr);
    $('#about_en').html(info.about.en);
    $('#about_jp').html(info.about.jp);
    $('#about_close').html(info.about.close);

    $('#enter_title').html(info.enter.title);
    $('#enter_caution').html(info.enter.caution);
    $('#enter_info').html(info.enter.info);
    $('#enter_about').html(info.enter.about);
    $('#enter_enter').html(info.enter.enter);

    $('#lang').children().css('color', '#FFF');
    $('#lang_' + lang).css('color', '#FBA400');

}

function clickAbout() {
    
    $('#about_frame').css('display', 'flex');
    $('#about_frame').fadeTo(700, 1);

}

function closeAbout() {

    $('#about_frame').fadeTo(700, 0, function() {
        $('#about_frame').css('display', 'none');
    });
    
}

//

function initData() {

    var storageIndex = parseInt(localStorage.getItem('index'));
    if (storageIndex && storageIndex < data.length) {
        index = storageIndex;
    }
    else {
        index = 0;
        localStorage.setItem('index', index);
    }

    bindDetailData();
    initTimelineViews();
    updateTimelineViews();
    bindTimelineData();

}

function setupViews() {

    $('body').css('overflow','hidden');

	var screen_W = $(window).width();
	var screen_H = $(window).height();

    var frame = $('#main_frame');
    frame.width(screen_W);
    frame.height(screen_H);

    var detail = $('#detail');
    detail.width(frame.width());
    detail.height(frame.height() * .75);

    var detail_btnleft = $('#detail_btnleft');
    detail_btnleft.height(detail.height());
    var detail_btnright = $('#detail_btnright');
    detail_btnright.height(detail_btnleft.height());

    var detail_frame = $('#detail_frame');
    detail_frame.width(detail.width() - detail_btnleft.width() * 2);
    detail_frame.height(detail.height());

    var detail_frame_image = $('#detail_frame_image');
    var detail_frame_text = $('#detail_frame_text');

    if (screen_W >= screen_H) {

        detail_btnleft.width(60);
        detail_btnright.width(detail_btnleft.width());
        
        detail_frame.css('flex-direction', 'row');

        var detail_frame_image_W = detail_frame.width() * .5;
        var detail_frame_image_H = detail_frame_image_W * image_scale;
        detail_frame_image.width(detail_frame_image_W);
        detail_frame_image.height(detail_frame_image_H);
        detail_frame_image.css('margin-top', '0px');
        detail_frame_text.css('margin-bottom', '0px');

        detail_frame_text.css('margin-left', detail_frame.width() * .03 + 'px');
        detail_frame_text.css('margin-top', '0px');
        detail_frame_text.css('margin-bottom', '0px');
        detail_frame_text.width(detail_frame.width() * .37);

    }
    else {

        var btnW = detail.width() * .06;
        if (btnW < 30) btnW = 30;
        detail_btnleft.width(btnW);
        detail_btnright.width(btnW);

        detail_frame.css('flex-direction', 'column');

        var detail_frame_image_W = detail_frame.width() * .6;
        if (screen_H <= 650) detail_frame_image_W = detail_frame.width() * .35;
        if (screen_H <= 600) detail_frame_image_W = 0;

        var detail_frame_image_H = detail_frame_image_W * image_scale;
        detail_frame_image.width(detail_frame_image_W);
        detail_frame_image.height(detail_frame_image_H);
        detail_frame_image.css('margin-top', detail_frame.height() * .1 + 'px');
        detail_frame_text.css('margin-bottom', detail_frame.width() * .05 + 'px');

        detail_frame_image.css('display', 'table-cell');
        detail_frame_image.css('vertical-align', 'middle');

        detail_frame_text.css('margin-left', '10px');
        detail_frame_text.css('margin-right', '10px');
        detail_frame_text.css('margin-top', detail_frame.width() * .05 + 'px');
        detail_frame_text.css('margin-bottom', detail_frame.width() * .1 + 'px');
        detail_frame_text.width(detail_frame.width() - detail_frame.width() * .12);

    }

	var detail_btnskip_left = $('#detail_btnskip_left');
    detail_btnskip_left.height(detail.height() * .15);
    detail_btnskip_left.css({'left': 0});
    detail_btnskip_left.width(detail_btnleft.width());
    var detail_btnskip_right = $('#detail_btnskip_right');
    detail_btnskip_right.height(detail_btnskip_left.height());
    detail_btnskip_right.css({'left': detail.width() - detail_btnright.width()});
    detail_btnskip_right.width(detail_btnright.width());

    var timeline = $('#timeline');
    timeline.css('margin-top', '10px');
    timeline.width(frame.width());
    timeline.height(frame.height() * .25 - 10);

    var timeline_header = $('#timeline_header');
    timeline_header.width(timeline.width());
    timeline_header.height(timeline.height() * .15);

    var timeline_track = $('#timeline_track');
    timeline_track.width(timeline.width());
    timeline_track.height(timeline.height() - timeline.height() * .15);

    // var timeline_footer = $('#timeline_footer');
    // timeline_footer.width(timeline.width());
    // timeline_footer.height(timeline.height() * 0);
    // timeline_footer.css('top', timeline.height() + 'px');

}

function bindDetailData() {

    var detail_frame_image = $("#detail_frame_image");
    if (detail_frame_image.css('display') != 'none') {
        detail_frame_image.animate({opacity: 'toggle'}, 'fast', null, function() {
            detail_frame_image.attr('src', 'image/' + lang + '/'+ data[index].image);
            detail_frame_image.animate({opacity: 'toggle'}, 'fast');
        });
    }

    var detail_frame_text_title = $('#detail_frame_text_title');
    detail_frame_text_title.animate({opacity: 'toggle'}, 'fast', null, function() {
        detail_frame_text_title.html(data[index].title);
        detail_frame_text_title.animate({opacity: 'toggle'}, 'fast');
    });
    
    var detail_frame_text_subtitle = $('#detail_frame_text_subtitle');
    detail_frame_text_subtitle.animate({opacity: 'toggle'}, 'fast', null, function() {
        detail_frame_text_subtitle.html(data[index].subtitle);
        detail_frame_text_subtitle.animate({opacity: 'toggle'}, 'fast');
    });

    var detail_frame_text_content = $('#detail_frame_text_content');
    detail_frame_text_content.animate({opacity: 'toggle'}, 'fast', null, function() {
        detail_frame_text_content.html(data[index].content);
        detail_frame_text_content.animate({opacity: 'toggle'}, 'fast');
    });
    
}

function initTimelineViews() {

    for (item in header) {

        var timeline_header_item_span = $('<span></span>');
        timeline_header_item_span.attr('id', 'timeline_header_item_span_' + item);
        if (item % 2 == 0) timeline_header_item_span.addClass('timeline_header_item_span_even');
        else timeline_header_item_span.addClass('timeline_header_item_span_odd');
        
        var timeline_header_track = $('#timeline_header_track');
        timeline_header_item_span.appendTo(timeline_header_track);

    }
    
    for (item in data) {

        var timeline_track_item_div = $('<div></div>');
        timeline_track_item_div.attr('id', 'timeline_track_item_div_' + item);
        timeline_track_item_div.addClass('timeline_track_item_div');

        var timeline_track_item_subdiv_img = $('<div></div>');
        timeline_track_item_subdiv_img.attr('id', 'timeline_track_item_subdiv_img_' + item);
        timeline_track_item_subdiv_img.css('margin', '5px');
        var timeline_track_item_img = $('<img></img>');
        timeline_track_item_img.attr('id', 'timeline_track_item_img_' + item);
        timeline_track_item_img.addClass('timeline_track_item_img');
        timeline_track_item_img.appendTo(timeline_track_item_subdiv_img);
        
        var timeline_track_item_subdiv_span = $('<div></div>');
        timeline_track_item_subdiv_span.attr('id', 'timeline_track_item_subdiv_span_' + item);
        timeline_track_item_subdiv_span.css('margin', '5px 10px 10px 5px');
        timeline_track_item_subdiv_span.css('overflow', 'hidden');
        var timeline_track_item_span = $('<span></span>');
        timeline_track_item_span.attr('id', 'timeline_track_item_span_' + item);
        timeline_track_item_span.addClass('timeline_track_item_span');
        timeline_track_item_span.appendTo(timeline_track_item_subdiv_span);

        timeline_track_item_subdiv_img.appendTo(timeline_track_item_div);
        timeline_track_item_subdiv_span.appendTo(timeline_track_item_div);

        var timeline_track = $('#timeline_track');
        timeline_track_item_div.appendTo(timeline_track);

    }

}

function updateTimelineViews() {
    
    var timeline_track = $('#timeline_track')
    var timeline_track_height = timeline_track.height();
    var timeline_track_div_height = (timeline_track_height - 20) / 3;

    timeline_track.css('top', $('#timeline_header').position().top + $('#timeline_header').height() + 'px');
    timeline_track.css('left', $('#timeline').width() / 2 + 'px');

    for (item in header) {

        var timeline_header = $('#timeline_header');
        var timeline_header_item_span = $('#timeline_header_item_span_' + item);
        timeline_header_item_span.css('position', 'absolute');
        if (item % 2 == 0) timeline_header_item_span.css('left', header[item].position_x - 5 + 'px');
        else timeline_header_item_span.css('left', header[item].position_x + 'px');
        timeline_header_item_span.css('line-height', timeline_header.height() + 'px');
        timeline_header_item_span.height(timeline_header.height());
        timeline_header_item_span.width(65535);

    }

    var timeline_divider = $('#timeline_divider');
    timeline_divider.css('left', '0px');
    timeline_divider.css('top', timeline_header.position().top - 10 + 'px');
    timeline_divider.css('width', $('#timeline').width() + 'px');

    var timeline_pointer = $('#timeline_pointer');
    timeline_pointer.css('left', $('#timeline').width() / 3 - 3.5 + 'px');
    timeline_pointer.css('top', timeline_header.position().top);
    timeline_pointer.css('height', $('#timeline').height() + 'px');

    for (item in data) {

        var timeline_track_item_subdiv_img = $('#timeline_track_item_subdiv_img_' + item);
        var timeline_track_item_subdiv_span = $('#timeline_track_item_subdiv_span_' + item);

        var timeline_track_item_img = $('#timeline_track_item_img_' + item);
        var timeline_track_item_span = $('#timeline_track_item_span_' + item);

        var position_x = data[item].position_x;
        var position_y = data[item].position_y;
        var position_width = data[item].position_width;

        var item_left_zero = 0;
        var item_top_zero = 0;

        var timeline_track_item_div = $('#timeline_track_item_div_' + item);
        timeline_track_item_div.css('left', position_x + 'px');
        timeline_track_item_div.css('top', item_top_zero + 5 + position_y * (timeline_track_div_height + 5) + 'px');
        timeline_track_item_div.width(position_width - 5);
        timeline_track_item_div.height(timeline_track_div_height);

        timeline_track_item_subdiv_img.width(1 / image_scale * (timeline_track_div_height - 10));
        timeline_track_item_subdiv_img.height(timeline_track_div_height - 10);
        timeline_track_item_subdiv_span.width(timeline_track_item_div.width() - timeline_track_item_subdiv_img.width() - 20);
        
        timeline_track_item_img.width(timeline_track_item_subdiv_img.width());
        timeline_track_item_img.height(timeline_track_item_subdiv_img.height())
        timeline_track_item_span.width(timeline_track_item_subdiv_span.width());

        timeline_track.width(data[item].position_x + data[item].position_width + 10);

    }

    // $('#timeline_footer').css('top', timeline_track.position().top + timeline_track.height() + 'px');
    
    if (data) moveTimelineToIndexWithDuration(0);

}

function bindTimelineData() {

    for (item in header) {

        var timeline_header_item_span = $('#timeline_header_item_span_' + item);
        timeline_header_item_span.html(header[item].title);

    }

    for (item in data) {
        
        var timeline_track_item_div = $('#timeline_track_item_div_' + item);
        timeline_track_item_div.off('click');
        timeline_track_item_div.on('click', parseInt(item), function(e) {
            clickTimelineItem(e);
        });

        var timeline_track_item_img = $('#timeline_track_item_img_' + item);
        var timeline_track_item_span = $('#timeline_track_item_span_' + item);

        var data_image = 'image/' + lang + '/'+ data[item].image;
        var data_title = data[item].title;

        timeline_track_item_img.attr('src', data_image);
        timeline_track_item_span.html(data_title);

    }

}

function clickDetailBtn(operation) {
    
    index += operation;
    if (index < 0) {
        index = 0;
    }
    if (index >= data.length) {
        index = data.length - 1;
    }
    
    localStorage.setItem('index', index);

    // console.log('index = ' + index);

    bindDetailData();
    moveTimelineToIndexWithDuration(300);

}

function clickTimelineItem(e) {

    index = e.data;
    // console.log('index = ' + index);
    localStorage.setItem('index', index);

    bindDetailData();
    moveTimelineToIndexWithDuration(300);

}

function moveTimelineToIndexWithDuration(duration) {
    
    var timeline = $('#timeline');
    var timeline_track = $('#timeline_track');
    var timeline_header_track = $('#timeline_header_track');

    var _x = - data[index].position_x + timeline.width() / 3;

    var limit = - Math.abs(timeline.width() / 3 - timeline_track.width()) + 5;
    if (_x < limit) _x = limit;

    timeline_header_track.animate({left: _x + 'px'}, duration);
    timeline_track.animate({left: _x + 'px'}, duration);

    setTimelineItemColor();

}

function setTimelineItemColor() {
    
    var lastItem = $('#timeline_track_item_subdiv_span_' + lastIndex).children('.timeline_track_item_span');
    var item = $('#timeline_track_item_subdiv_span_' + index).children('.timeline_track_item_span');

    lastItem.css('color', '#FFF');
    item.css('color', '#FBA400');

    lastIndex = index;

}

function setTimelineDrag() {
    
    var timeline_track = $('#timeline_track');
    var timeline_header_track = $('#timeline_header_track');

    var isTouch = window.hasOwnProperty('ontouchstart');
    var dragEvent = isTouch ? {
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend',
        over: 'touchstart',
        out: 'touchend'
    } : {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
        over: 'mouseover',
        out: 'mouseout'
    }

    timeline_track.on(dragEvent.down, function(e) {

        $(this).css('cursor', 'move');

        var offset = timeline_track.offset();
        var x = isTouch ? (e.touches[0].pageX - offset.left) : (e.pageX - offset.left);

        $(document).on(dragEvent.move, function(ev) {

            // timeline_track.stop();

            var _x = isTouch ? (ev.touches[0].pageX - x) : (ev.pageX - x);

            if (_x > $('#timeline').width() / 3) _x = $('#timeline').width() / 3;
            var limit = - Math.abs($('#timeline').width() / 3 - timeline_track.width()) + 5;
            if (_x < limit) _x = limit;

            timeline_track.animate({left: _x + 'px'}, 10);
            timeline_header_track.animate({left: _x + 'px'}, 10);

        });
    });

    $(document).on(dragEvent.up, function() {

        timeline_track.css('cursor', 'default');
        $(this).off(dragEvent.move);

    });

}

var btnFlag = false;
var prevBtn = 0;

function setHotkey() {

    $(document).keydown(function (event) {

    	if(!btnFlag) {

            btnFlag = true;
            prevBtn = event.which;

            setTimeout(function() {
                btnFlag = false;
            }, 250);

    	    switch (event.keyCode) {
                	case 37:
                		clickDetailBtn(-1);
                    	break;
                	case 38:
                    	// clickDetailBtn(-index);
                    	clickDetailBtn(-20);
                    	break;
                	case 39:
                    	clickDetailBtn(1);
                    	break;
                	case 40:
                    	// clickDetailBtn(data.length - 1);
                    	clickDetailBtn(20);
                    	break;
    	    }

        }

    	else if (prevBtn != event.which) {

    		btnFlag = false;

    	}
	    
        return false;
    });

}
