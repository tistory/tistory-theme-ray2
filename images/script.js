;(function($) {


    var Area = {};

    Area.Menu = (function() {

        var $wrap = $(".wrap_skin"),
            $btnCategory = $(".area_head .btn_cate");
            $btnCloseCategory =  $(".wrap_sub .btn_close")

        $btnCategory.on("click", function() {
            $wrap.addClass("navi_on");
        });

        $btnCloseCategory.on("click", function() {
            $wrap.removeClass("navi_on");
        })

    })();

    Area.Search = (function() {
        var ON_CLASS = "search_on";

        var $btnCategory = $(".area_head .btn_cate"),
            $btnSearch = $(".area_head .btn_search"),
            $areaSearch = $(".area_head .area_search"),
            $inputSearch = $(".area_head .area_search .tf_search"),
            $title = $(".tit_skin");

        $btnSearch.on("click", function() {
            $btnCategory.hide();
            $title.hide();
            $areaSearch.addClass(ON_CLASS);
            $inputSearch.focus();
        });

        $inputSearch.on("blur", function(e) {
            $btnCategory.css("display", "");
            $title.show();
            $areaSearch.removeClass(ON_CLASS);
        });

    })();

    Area.SocialShare = (function() {

		var SOCIAL_SHARE = {
			kakaostory: {
				url: "https://story.kakao.com/share",
				width: 640,
				height: 400,
				makeShareUrl: function(url) {
					return this.url + "?url=" + encodeURIComponent(url);
				}
			},
			facebook: {
				url: "https://www.facebook.com/sharer/sharer.php",
				width: 640,
				height: 400,
				makeShareUrl: function(url) {
					return this.url + "?display=popup&u=" + encodeURIComponent(url);
				}
			},
			twitter: {
				url: "https://twitter.com/intent/tweet",
				width: 640,
				height: 400,
				makeShareUrl: function(url) {
					return this.url + "?url=" + encodeURIComponent(url);
				}
			}
		};


		var onClick = function(e) {
			var $this = $(this),
				service = SOCIAL_SHARE[$this.data("service")],
				url = location.href;

			if (service) {
				e.preventDefault();
				window.open(service.makeShareUrl(url), "", "width=" + service.width + ", height=" + service.height);
			}
		};


		$(".list_share").on("click", "a", onClick);

	})();

    $.Area = Area;

})(jQuery);
