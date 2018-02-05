;(function ($) {
	var $window = $(window),
		$pagingArea = $(".area_paging"),
		$pagingInnerArea = $(".area_paging .inner_paging"),
		$contentArea = $(".content_wrap");
	var loadLock = false,
		bodyId = $(document.body).attr("id"),
		path = location.pathname,
		qs = location.search;

	function nextPageQueryString(qs) {
		var result = '';

		if (qs.indexOf("?") < 0) {
			result = "?page=2";
		} else {
			var pattern = /page=([\d]+)/,
				matchResult = qs.match(pattern);
			if (matchResult) {
				var nextPage = parseInt(matchResult[1]) + 1
				result = qs.replace(pattern, "page=" + nextPage)
			} else {
				result = qs + "&page=2"
			}
		}
		return result;
	}

	function isList() {
		return path.indexOf("/manage/") < 0 && path.indexOf("/admin/") < 0 && bodyId.search(/tt-body-(index|category|archive|tags)/) >= 0
	}

	function startLoadList() {
		loadLock = true;
		$pagingInnerArea.addClass('scroll_spinner');
	}

	function endLoadList() {
		loadLock = false;
		$pagingInnerArea.removeClass('scroll_spinner');
		$window.scroll();
	}

	function finishLoadList() {
		loadLock = true;
		$pagingArea.hide();
	}

	function stopLoadList() {
		loadLock = true;
		$pagingInnerArea.removeClass('scroll_spinner');
	}

	function loadList() {
		startLoadList();
		var nextQueryString = nextPageQueryString(qs);
		$.ajax({
			url: path + nextQueryString
		}).done(function (res) {
			var $res = $(res),
				$nextList = $res.find(".list_content"),
				$nextPagingInner = $res.find(".area_paging .inner_paging");

			if ($nextList.length > 0) {
				$contentArea.append($nextList);
				$pagingInnerArea.html($nextPagingInner.html())
				qs = nextQueryString;
				endLoadList();
			} else {
				finishLoadList();
			}

		}).fail(function (e) {
			stopLoadList();
		})
	}

	if (isList()) {
		$window.on("scroll resize", function (e) {
			if (loadLock) {
				return;
			}

			var top = $pagingArea.offset().top,
				appearTop = $window.scrollTop() + $window.height();

			if (appearTop + 200 > top) {
				loadList();
			}
		}).scroll()
	}

})(jQuery);