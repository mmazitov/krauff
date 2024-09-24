function searchShow() {
	var btnSearch = $('.btn.search'),
		inputSearch = $('.search-holder .input-wrap'),
		holderSearch = $('.search-holder');

	btnSearch.on('mouseover', function (e) {
		// setTimeout(function() {
		//    btnSearch.addClass('active')
		// }, 1000);
		inputSearch.stop(true, true);
		inputSearch.show('slide', { direction: 'right' }, 500);
		e.stopPropagation();
	});
	inputSearch.on('mouseover', function (e) {
		btnSearch.addClass('active');
	});
	inputSearch.on('mouseleave', function (e) {
		btnSearch.removeClass('active');
	});
	holderSearch.on('mouseleave', function (e) {
		var curVal = $('.input.search').val();
		// btnSearch.removeClass('active')
		// console.log(curVal)
		if (curVal.length === 0) {
			btnSearch.removeClass('active');
			inputSearch.stop(true, true);
			inputSearch
				.hide('slide', { direction: 'right' }, 1000)
				.removeClass('active');
		} else {
			btnSearch.addClass('active');
			inputSearch.stop(true, true);
			inputSearch.show('slide', { direction: 'right' }, 500).addClass('active');
		}
		e.stopPropagation();
	});
}

function openMenu() {
	var menuBtn = $('.menu-btn-holder'),
		menuList = $('.nav'),
		navHolder = $('.nav-holder');

	menuBtn.on('click', function (e) {
		$(this).toggleClass('active');
		menuList.stop();
		menuList.toggleClass('visible');
		e.stopPropagation();
	});

	$(document).on('touchstart click', function (e) {
		if (!$(e.target).closest('.nav').length) {
			menuBtn.removeClass('active');
			menuList.removeClass('visible');
		}
	});
}

function countryChose() {
	var countryLink = $('.country-select'),
		countryHolder = $('.country-holder.country'),
		countryItem = $('.country-list li'),
		countryItemLink = $('.country-list li a'),
		countryClose = $('.country-holder .close'),
		langLink = $('.lang-select'),
		langHolder = $('.country-holder.lang'),
		langItem = $('.country-holder.lang .country-list li'),
		langItemLink = $('.country-holder.lang .country-list li a'),
		langClose = $('.country-holder .close'),
		closeWnd;

	closeWnd = function () {
		countryLink.removeClass('active');
		langLink.removeClass('active');
		countryHolder.removeClass('visible');
		langHolder.removeClass('visible');
		e.preventDefault();
	};

	countryLink.removeAttr('href');
	countryItemLink.removeAttr('href');
	langLink.removeAttr('href');
	langItemLink.removeAttr('href');
	countryClose.removeAttr('href');

	countryLink.on('click', function (e) {
		$(this).toggleClass('active');
		langLink.removeClass('active');
		countryHolder.toggleClass('visible');
		langHolder.removeClass('visible');
		e.stopPropagation();
	});
	countryClose.on('click', function (e) {
		// countryLink.removeClass('active');
		// langLink.removeClass('active')
		// countryHolder.removeClass('visible');
		// langHolder.removeClass('visible')
		// e.preventDefault();
		closeWnd();
	});
	countryItem.on('click', function () {
		countryLink.removeClass('active');
		countryHolder.removeClass('visible');
	});
	countryItemLink.on('click', function () {
		var curContent, parItem, sibItem;
		// countryLink.addClass('selected');
		parItem = $(this).closest('.country-holder');
		sibItem = parItem.siblings('.country-select, .lang-select');
		curContent = $(this).children().clone();

		sibItem.html(curContent);
		sibItem.addClass('selected');
	});

	langLink.on('click', function (e) {
		$(this).toggleClass('active');
		countryLink.removeClass('active');
		countryHolder.removeClass('visible');
		langHolder.toggleClass('visible');
		e.stopPropagation();
	});
	langClose.on('click', function (e) {
		langLink.removeClass('active');
		langHolder.slideUp();
		e.stopPropagation();
	});
	langItem.on('click', function () {
		langLink.removeClass('active');
		langHolder.removeClass('visible');
	});

	$(document).on('touchstart click', function (event) {
		if ($(event.target).closest($('.chose-holder')).length) return;
		countryLink.removeClass('active');
		countryHolder.removeClass('visible');
		event.stopPropagation();

		if ($(event.target).closest($('.chose-holder')).length) return;
		langLink.removeClass('active');
		langHolder.removeClass('visible');
		event.stopPropagation();
	});
}

/* Spinner */
function spinner() {
	var spin = $('.input.sm.count');

	if (spin.length) {
		spin.each(function () {
			var spinner = $(this);
			spinner.spinner({
				spin: function (event, ui) {
					if (ui.value > 9999) {
						$(this).spinner('value', 9999);
						return false;
					} else if (ui.value < 1) {
						$(this).spinner('value', 1);
						return false;
					}
					var spin_val = $(this).spinner('value');
				},
				create: function (ui, event) {
					var widget = $(this).spinner('widget');
					widget.find('.ui-icon-triangle-1-n').html('+');
					widget.find('.ui-icon-triangle-1-s').html('-');
				},
				stop: function (event, ui) {
					basketTotal();
				},
			});
			// Функция реакции на событие event, проверяет введёный символ на "число это или нет", "дополнительные кнопки или нет" и "значение в интервале 1 - 9999 "
			function checkSpinInput(event) {
				// Если Ctrl+A, home, end, стрелки
				if (
					event.keyCode == 46 ||
					event.keyCode == 9 ||
					event.keyCode == 27 ||
					(event.keyCode == 65 && event.ctrlKey === true) ||
					(event.keyCode >= 35 && event.keyCode <= 39)
				) {
				} else {
					// Если не число - отменить действие
					if (
						(event.keyCode < 48 || event.keyCode > 57) &&
						(event.keyCode < 96 || event.keyCode > 105)
					) {
						if (event.keyCode != 8) event.preventDefault();
					}
				}
			}
			spinner.keydown(function (event) {
				checkSpinInput(event);
			});
			spinner.keyup(function (event) {
				checkSpinInput(event);
			});
			spinner.blur(function (event) {
				if (!spinner.val() || spinner.val() == 0) spinner.val(1);
				basketTotal();
			});
			// spinner.change(function() {
			//   if (curVal.length == 1) {
			//     $('.ui-spinner-down ').addClass('disable')
			//   } else {
			//     $('.ui-spinner-down ').removeClass('disable')
			//   }
			// })
		});
	}
}

function setSpinner() {
	$('.ui-spinner-down ').addClass('disable');
}
/* Spinner End */

function basketTotal() {
	cart = $('.basket.table tbody');
	total = $('.total');

	total_value = 0;

	cart.find('tr').each(function () {
		var cur = $(this),
			curVal = $('.input.sm.count').val(),
			price = parseFloat(cur.attr('data-price')), // цена
			count = cur.find('.input.sm.count').val(), // количество
			packing = $('.packing'),
			packege = count * 5 + ' уп.',
			sum = cur.find('.summory'), // стоимость
			sum_value = price * count;
		sum.text(sum_value);
		total_value += sum_value;
		packing.html(packege);
		// if (curVal.length >= 1) {
		//   $('.ui-spinner-down ').removeClass('disable')
		// }

		// $(".ui-spinner-button").on("click", function() {
		// 	var value = $(".ui-spinner-input").val();
		// 	console.log(value);

		// 	if (value > 1) {
		// 	  $(this).siblings().removeClass('disable');
		// 	} else if (value === "1") {
		// 		$(this).addClass('disable');
		// 	}
		// });
	});
	total.html(total_value);

	$('.ui-spinner-button').on('click', function () {
		var parent, input, value, buttonDown;

		parent = $(this).closest('.ui-spinner');
		input = parent.find('.ui-spinner-input');
		value = input.val();
		buttonDown = parent.find('.ui-spinner-down');

		if (value > 1) {
			buttonDown.removeClass('disable');
		} else if (value === '1') {
			buttonDown.addClass('disable');
		}
	});
}

function deleteRow(e) {
	cart = $('.basket.table tbody');
	del = $('.basket.table tbody .icon-del');
	// удаляем строку в корзине
	del.on('click', function (e) {
		e.preventDefault();
		var cur = $(this);
		// var cart = $('.table_cart');
		cur.parents('tr').fadeOut();
		setTimeout(function () {
			cur.parents('tr').remove();
			basketTotal();
		}, 400);
	});
}

function BasketMenu() {
	var basketBtn = $('.btn.basket'),
		basketHolder = $('.popup-basket'),
		btnContinue = $('.btn.continue'),
		fancyWrap = $('.fancybox-wrap');

	basketBtn.on('click', function () {
		$(this).addClass('active');
	});

	$('.popup-close').on('click', function () {
		basketBtn.removeClass('active');
	});
	$('.btn.continue').on('click', function () {
		basketBtn.removeClass('active');
		$.fancybox.close();
	});

	// $(document).on('click', function(event) {
	//   if ($(event.target).closest(fancyWrap).length) return;
	//   // basketBtn.removeClass('active')
	//   // countryHolder.slideUp()
	//   event.stopPropagation();

	// })
}

/**PREVIEW***/
function preview() {
	$('.preview-list > li > a').on('click', function (e) {
		var cur_item = $(this);
		var cur_item_href = cur_item.attr('href');
		var cur_item_large = cur_item.attr('data-image-large');

		$('.preview-holder-large').attr('href', cur_item_href);
		$('.preview-holder-large img').attr('src', cur_item_large);
		e.preventDefault();
	});

	$('.preview-list > li').on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});

	// $('.preview-holder-large').on('click', function(e){
	// var cur = $(this);
	// var cur_href = cur.attr('href');
	// $('.preview-list a').addClass('fancybox-group');
	// $('.preview-list a[href="'+cur_href+'"]').trigger('click');
	// e.preventDefault();
	// });

	$('.fancybox-group').fancybox({
		maxWidth: 800,
		maxHeight: 600,
		fitToView: false,
		width: '70%',
		height: '70%',
		autoSize: false,
		closeClick: false,
		openEffect: 'none',
		closeEffect: 'none',
	});
}

function fancybox() {
	$('.preview-holder-large.preview').fancybox({});
	// $('.zoom-holder a').fancybox();
}

/*FANCYBOX*/
//popup options array
popupConfig = {
	closeBtn: false,
	wrapCSS: 'fancybox-popup custom',
	padding: ['0', '0', '0', '0'],
	scrolling: 'visible',
	openEffect: 'none',
	closeEffect: 'none',
	showCloseButton: 'false',
	closeBtn: 'false',
	helpers: {
		overlay: {
			css: {
				background: 'url(img/overlay.png) repeat',
			},
		},
	},
	onComplete: function () {
		console.log('123');
	},
	beforeShow: function () {
		var self = $(this.outer),
			el = $(this.element),
			inner = self.find('.popup-inner');

		//scroll-pane part
		var scrollWrap = inner.find('.wrap-scrollpane'),
			scroll = inner.find('.scrollpane');
		if (scrollWrap.length && scroll.length) {
			scrollWrap.css({
				'min-height': 600,
			});
			if (scroll.data('jsp')) {
				scroll.data('jsp').destroy();
			}
			scrollbarVertical(inner.find('.scrollpane'));
			scrollWrap.css({
				'min-height': 0,
			});
		}
		//scroll-pane part end

		//multiselect part
		var select = inner.find('select[data-multiselectcustom]');
		if (select.length) {
			select.multiselectcustom('refresh');
			mergeObj([$('html, body, .fancybox-overlay'), $(window)]).scroll(
				function () {
					select.multiselectcustom('close');
				}
			);
		}
		// $('.phone').phoneMask('refresh')
		// $('select').multiselect('refresh')
		//   //multiselect part end

		//iframe part
		var iframeSrc = el.attr('data-iframe-src');
		if (iframeSrc) {
			inner.find('.wrap-iframe > iframe').prop('src', iframeSrc);
		}
		//iframe part end
	},
};
//popup options array end
//fancybox popup open
function fancyboxPopup(obj, arrConfig) {
	if (obj.length) {
		obj.fancybox(arrConfig);
	}
}
//fancybox popup close
function fancyboxPopupClose(obj) {
	if (obj.length) {
		obj.on('click', function (e) {
			$.fancybox.close(true);
			e.preventDefault();
		});
	}
}
//fancybox gallery open
function fancyboxGallery(obj) {
	if (obj.length) {
		obj.fancybox({
			wrapCSS: 'fancybox-gallery',
			nextEffect: 'fade',
			prevEffect: 'fade',
		});
	}
}
/*FANCYBOX END*/

//MERGE OBJECTS
function mergeObj(array) {
	var length = array.length,
		arr = array[0];
	for (var i = 1; i < length; i++) {
		arr = $.merge(arr, array[i]);
	}
	return arr;
}
//MERGE OBJECTS END

/*CUSTOM INPUTS*/
function customInputs(wrapInput) {
	if (wrapInput.length) {
		var inp =
			':text, :password, textarea, input[type="date"], input[type="datetime"], input[type="email"], input[type="number"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"]';
		wrapInput.on('click', function () {
			var self = $(this),
				curInp = self.find(inp).not('[disabled]');
			if (curInp.length) {
				self.addClass('focus');
				if (!curInp.is(':focus')) {
					curInp.trigger('focus');
				}
			}
		});
		wrapInput.on(
			{
				change: function (e) {
					var curWrap = $(e.delegateTarget);
					$(this).is(':disabled')
						? curWrap.addClass('disabled')
						: curWrap.removeClass('disabled');
				},
				blur: function (e) {
					$(e.delegateTarget).removeClass('focus');
				},
			},
			inp
		);
	}
}
/*CUSTOM INPUTS END*/

/*PLACEHOLDER*/
function placeholder(objInputs) {
	var browserIE = window.navigator.userAgent.match(/MSIE *\d+\.\w+/i);
	browserIE = browserIE != null ? browserIE.toString().charAt(5) : 10;
	if (browserIE <= 9 && objInputs.length) {
		// objInputs.placeholder();
	}
}
/*PLACEHOLDER END*/

function sliders() {
	var mainSlider;
	mainSilder = $('.main-slider').bxSlider({
		mode: 'fade',
		pager: true,
		controls: false,
		captions: true,
		minSlides: 1,
		maxSlides: 1,
		useCSS: false,
		auto: true,
		pause: 4000,
		// autoHover: true,
		onSlideAfter: function (
			currentSlideNumber,
			totalSlideQty,
			currentSlideHtmlObject
		) {
			$('.active-slide').removeClass('active-slide');
			$('.main-slider > li').eq(currentSlideHtmlObject).addClass('active-slide');

			mainSilder.stopAuto();
			mainSilder.startAuto();
		},
		onSliderLoad: function () {
			$('.main-slider > li').eq(0).addClass('active-slide');
		},
	});

	// $('.main-slider-wrap .bx-pager-item a').click(function(e){
	//   var i = $(this).attr("data-slide-index");
	//   mainSilder.goToSlide(i);
	//   mainSilder.stopAuto();
	//   restart=setTimeout(function(){
	//     	mainSilder.startAuto();
	//     }, 500);

	//   return false;
	// });

	$('.catalog-slider').bxSlider({
		mode: 'fade',
		pager: true,
		controls: false,
		captions: true,
		minSlides: 1,
		maxSlides: 1,
		useCSS: false,
		auto: true,
		pause: 4000,
		autoHover: true,
	});
}

function customGallery() {
	var el, imgItems, imgItemsLength, pagesCur, pagesTotal, counter;
	el = $('.js-custom-gallery');

	if (el.length) {
		imgItems = $('.js-custom-gallery .images-item');
		imgItemsLength = imgItems.length;
		pagesCur = $('.js-custom-gallery .pages-cur');
		pagesTotal = $('.js-custom-gallery .pages-total');

		counter = 1;

		pagesTotal.html(imgItemsLength);

		$('.js-custom-gallery .pages-next').on('click', function () {
			if (counter !== imgItemsLength) {
				imgItems.filter('.active').removeClass('active').next().addClass('active');
				counter++;
			} else {
				counter = 1;
				imgItems.filter('.active').removeClass('active');
				imgItems.filter(':first').addClass('active');
			}

			pagesCur.html(counter);
		});

		$('.js-custom-gallery .pages-prev').on('click', function () {
			if (counter !== 1) {
				imgItems.filter('.active').removeClass('active').prev().addClass('active');
				counter--;
			} else {
				counter = imgItemsLength;
				imgItems.filter('.active').removeClass('active');
				imgItems.filter(':last').addClass('active');
			}

			pagesCur.html(counter);
		});
	}
}

function filters() {
	var filterBtn = $('.btn.filter'),
		catalogFilters = $('.catalog-filter-items'),
		catalogFiltersHolder = $('.catalog-filter-holder');

	filterBtn.click(false);

	filterBtn.on('click', function () {
		$(this).toggleClass('active');
		catalogFilters.slideToggle();

		catalogFiltersHolder.toggleClass('visible');
		// catalogFilters.stop();
	});
}

function calculateHeight($collection, container) {
	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}
	if ($collection.length) {
		var heightArray = [],
			height,
			maxHeight,
			lineHeightCss,
			lineHeightNum;
		$collection.each(function (i, el) {
			// $(el).css({'min-height': '0'});
			height = $(el).outerHeight();
			heightArray.push(height);
		});
		maxHeight = getMaxOfArray(heightArray);

		lineHeightCss = $($collection[0]).css('line-height');
		lineHeightNum = parseInt(lineHeightCss);
		maxStrs = lineHeightNum * 2;

		$collection.each(function (i, el) {
			$(el).css({ 'min-height': maxHeight + 'px' });

			if (container !== undefined && maxHeight > maxStrs) {
				var closestCont, h, newH;
				closestCont = $(el).closest(container);
				h = +closestCont.outerHeight();
				newH = maxHeight - 40;

				closestCont.css({
					height: h + newH + 'px',
				});
			}
		});
	}
}
// / calculateHeight end /

// / calculateHeightNumEl /
function setElementsHeight($collection, elNum, container) {
	var $subcollection;
	if ($collection.length) {
		for (var i = 0; i < $collection.length; i = i + elNum) {
			$subcollection = $collection.eq(i);
			for (var ii = 1; ii < elNum; ii++) {
				$subcollection = $subcollection.add($collection.eq(i + ii));
			}
			calculateHeight($subcollection, container);
		}
	}
}

function setSorting() {
	var sortingItem = $('.filters-list li');

	if (sortingItem.length) {
		sortingItem.on('click', function () {
			$(this).toggleClass('active');
		});
	}
}

function zoomImg() {
	var imgPrev = $('.img-preview');

	imgPrev.elevateZoom({
		zoomType: 'lens',
		lensShape: 'round',
		lensSize: 200,
	});
}

/*MASKED INPUT*/
function phoneInput() {
	$('#phone').mask('38 (999) 999 99 99');
}

/*CUSTOM CHECKBOX(RADIOBOX)*/
//init
function initCheckbox(obj, stringInitClass) {
	if (obj.length) {
		obj.each(function () {
			$(this).checkbox({
				cls: stringInitClass,
			});
		});
	}
}
//checkbox list
function checkList(objList) {
	if (objList.length) {
		objList.on(
			{
				check: function () {
					$(this).parents('li').eq(0).addClass('checked');
				},
				uncheck: function () {
					$(this).parents('li').eq(0).removeClass('checked');
				},
				disable: function () {
					$(this).parents('li').eq(0).addClass('disabled');
				},
				enable: function () {
					$(this).parents('li').eq(0).removeClass('disabled');
				},
			},
			':checkbox'
		);
	}
}
//radiobox list
function radioList(objList) {
	if (objList.length) {
		objList.on(
			{
				check: function () {
					$(this)
						.parents('li')
						.eq(0)
						.addClass('checked')
						.siblings()
						.removeClass('checked');
				},
				disable: function () {
					$(this).parents('li').eq(0).addClass('disabled');
				},
				enable: function () {
					$(this).parents('li').eq(0).removeClass('disabled');
				},
			},
			':radio'
		);
	}
}
//colorization
function colorizationCheckbox(obj) {
	if (obj.length) {
		var re = new RegExp('#', 'g');
		obj.each(function () {
			var self = $(this),
				col = self.attr('data-color'),
				cur = self.next().find('img');
			if (col) {
				col.match(re) == null
					? cur.css('background-image', 'url(' + col + ')')
					: cur.css('background-color', col);
			}
		});
	}
}
/*CUSTOM CHECKBOX(RADIOBOX) END*/

// addPositionClass
function addPositionClass(position, feedback, obj) {
	removePositionClass(obj);
	obj.css(position).addClass(feedback.vertical).addClass(feedback.horizontal);
}

// removePositionClass
function removePositionClass(obj) {
	obj.removeClass('top bottom center left right');
}

/* UI MULTISELECT */
/* type 1 default */
selectConfig = {
	header: false,
	height: 'auto',
	minWidth: 'auto',
	classes: 'select',
	noneSelectedText: 'select options',
	selectedList: 1,
	multiple: false,
	position: {
		my: 'right top',
		at: 'right bottom',
		collision: 'flip flip',
		using: function (position, feedback) {
			addPositionClass(position, feedback, $(this));
		},
	},
	arrow: true,
	divider: false,
	corner: false,
	icon: false,
	jscrollpane: true,
	filter: false,
	filterOptions: {},
	dataImg: false /*<option value="1" data-img="pic/lang/ua.png">value 1</option>*/,
};

/* customSelect */
function customSelect(objSelName, arrConfig) {
	if (objSelName.length) {
		objSelName.each(function () {
			var self = $(this);
			var curClass = '';
			if (self.is('[class]')) curClass = self.attr('class');
			var placeholderFlag, noneSelectedText;
			if (self.is('[data-placeholder]'))
				noneSelectedText = self.attr('data-placeholder');
			else noneSelectedText = arrConfig.noneSelectedText;
			if (self.find('option').is('[selected]')) placeholderFlag = false;
			else placeholderFlag = true;
			self.multiselect({
				header: arrConfig.header,
				height: arrConfig.height,
				minWidth: arrConfig.minWidth,
				classes: arrConfig.classes + ' ' + curClass,
				checkAllText: arrConfig.checkAllText,
				uncheckAllText: arrConfig.uncheckAllText,
				noneSelectedText: noneSelectedText,
				selectedText: arrConfig.selectedText,
				selectedList: arrConfig.selectedList,
				show: arrConfig.show,
				hide: arrConfig.hide,
				autoOpen: arrConfig.autoOpen,
				multiple: arrConfig.multiple,
				position: arrConfig.position,
				appendTo: arrConfig.appendTo,
				create: function (event, ui) {
					var btn = $(this).multiselect('getButton'),
						btnIcon = btn.find('.ui-icon'),
						widg = $(this).multiselect('widget');
					if (placeholderFlag) {
						$(this).multiselect('uncheckAll');
						btn.addClass('ui-state-placeholder');
					}
					btn.find('span').not('[class]').addClass('ui-multiselect-value');

					// button divider
					if (arrConfig.divider === true)
						btn.append('<span class="ui-multiselect-divider"></span>');

					// button arrow
					if (arrConfig.arrow === true)
						btn.append('<span class="ui-multiselect-arrow"></span>');

					// button icon
					if (arrConfig.icon !== true) btnIcon.remove();
					else
						btnIcon
							.removeClass('ui-icon ui-icon-triangle-2-n-s')
							.addClass('ui-multiselect-icon');
					btn.children().wrapAll('<span class="ui-multiselect-inner"></span>');
					widg.children().wrapAll('<div class="ui-multiselect-menu-inner"></div>');

					// widget scrollpane
					if (arrConfig.jscrollpane === true)
						widg
							.find('.ui-multiselect-checkboxes')
							.wrap(
								'<div class="ui-multiselect-wrap-scrollpane"><div class="ui-multiselect-scrollpane"></div></div>'
							);

					// widget corner
					if (arrConfig.corner === true)
						widg.append('<div class="ui-multiselect-corner"></div>');

					// button image
					if (arrConfig.dataImg === true) {
						var listOptions = $(this).find('option'),
							list = widg.find('.ui-multiselect-checkboxes li span');
						list.each(function (i) {
							$(this).html('<img src="' + listOptions.eq(i).attr('data-img') + '" />');
							if (listOptions.eq(i).is(':selected')) {
								btn
									.find('.ui-multiselect-value')
									.html('<img src="' + listOptions.eq(i).attr('data-img') + '" />');
							}
						});
						/*ie7-8 image click bug*/
						list.on('click', function () {
							$(this).parents('li').find('input').trigger('click');
						});
					}

					// check all
					widg.on('click', '.ui-multiselect-all', function () {
						btn.removeClass('ui-state-placeholder');
					});

					// uncheck all
					widg.on('click', '.ui-multiselect-none', function () {
						btn.addClass('ui-state-placeholder');
					});
				},
				open: function (event, ui) {
					var widg = $(this).multiselect('widget');

					// adding to the last item class 'first'
					widg
						.find('.ui-multiselect-checkboxes li:eq(1)')
						.addClass('first')
						.siblings()
						.removeClass('first');

					// adding to the last item class 'last'
					widg
						.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings()
						.removeClass('last');

					// fix scroll drop list
					var list = widg.find('.ui-multiselect-checkboxes');
					var maxH = parseInt(list.css('max-height'));
					if (maxH > parseInt(list.height())) list.removeClass('list-fix-scroll');
					else list.addClass('list-fix-scroll');

					// jscrollpane run handler
					if (arrConfig.jscrollpane === true) {
						scrollbarVertical(widg.find('.ui-multiselect-scrollpane'));
						//scrollpaneFix(widg.find('.jspScrollable'));
					}
				},
				click: function (event, ui) {
					var btn = $(this).multiselect('getButton'),
						widg = $(this).multiselect('widget'),
						flagCheck = false;
					// placeholder
					if (ui.checked) btn.removeClass('ui-state-placeholder');
					else {
						if ($(this).multiselect('option').multiple)
							widg.find(':checkbox').each(function () {
								if ($(this).is(':checked')) flagCheck = true;
							});
						if (flagCheck) {
							btn.removeClass('ui-state-placeholder');
						} else {
							btn.addClass('ui-state-placeholder');
						}
					}
				},
				beforeclose: function (event, ui) {
					var widg = $(this).multiselect('widget');
					removePositionClass(widg);
					/* jscrollpane destroy handler */
					if (arrConfig.jscrollpane === true) {
						var jscrollpane = widg.find('.ui-multiselect-scrollpane').data('jsp');
						if (jscrollpane) {
							jscrollpane.destroy();
						}
						$(document).unbind('mousewheel.false');
					}
				},
			});
			/* filter options */
			if (arrConfig.filter === true) {
				self.multiselectfilter(arrConfig.filterOptions);
			}
			/* filter options end */
		});
	}
}
/* customSelect end */

// customSelectClose
function customSelectClose(objSelect) {
	if (objSelect.length) {
		objSelect.each(function () {
			var self = $(this);
			if (self.next('button.ui-multiselect').length) self.multiselect('close');
		});
	}
}

// customSelectRefreshPlaceholder
function customSelectRefreshPlaceholder(objSelect) {
	if (objSelect.length) {
		objSelect.each(function () {
			var self = $(this);
			if (self.next('button.ui-multiselect').length) {
				var btn = self.multiselect('getButton');
				if (!self.find('option').is('[selected]')) {
					self.multiselect('uncheckAll');
					btn.addClass('ui-state-placeholder');
				} else {
					btn.removeClass('ui-state-placeholder');
				}
			}
		});
	}
}

// customSelectRefresh
function customSelectRefresh(objSelect) {
	if (objSelect.length) {
		objSelect.each(function () {
			var self = $(this);
			if (self.next('button.ui-multiselect').length) self.multiselect('refresh');
		});
	}
}

/* UI MULTISELECT END */

/* SCROLLPANE */
/* scrollbarVertical */
function scrollbarVertical(objScroll) {
	if (objScroll.length) {
		objScroll.each(function () {
			$(this).jScrollPane({
				mouseWheelSpeed: 85,
				verticalDragMinHeight: 100,
				verticalDragMaxHeight: 100,
				horizontalDragMinWidth: 0,
				horizontalDragMaxWidth: 0,
				autoReinitialise: true,
			});
		});
	}
}
/* scrollbarVertical end */

/* scrollbarHorizontal */
function scrollbarHorizontal(objScroll) {
	if (objScroll.length) {
		objScroll.each(function () {
			$(this).jScrollPane({
				verticalDragMaxHeight: 0,
				verticalDragMinHeight: 0,
				horizontalDragMinWidth: 43,
				horizontalDragMaxWidth: 43,
			});
		});
	}
}
/* scrollbarHorizontal end */
/* SCROLLPANE END */

$(document).ready(function () {
	searchShow();
	openMenu();
	countryChose();

	// sliderRange()
	spinner();
	basketTotal();
	// keyPress()
	deleteRow();
	// spinnerSecond()
	// basketTotalSecond()
	//   // keyPress()
	// deleteRowSecond()
	// fancybox()
	/*FANCYBOX*/
	fancyboxPopup($('.popup-open'), popupConfig);
	fancyboxPopupClose($('.popup-close'));
	fancyboxGallery($('[data-fancybox-group]'));
	/*FANCYBOX END*/
	BasketMenu();
	sliders();
	customGallery();
	filters();
	setSorting();
	zoomImg();
	initCheckbox($('.radio.def'), 'radiobox'); //default radiobox
	customSelect($('.form-row select'), selectConfig);
	phoneInput();
	setSpinner();
	setElementsHeight($('.js-4-items .descr'), 4, '.catalog-item');
	setElementsHeight($('.js-3-items .descr'), 3, '.catalog-item');
});
