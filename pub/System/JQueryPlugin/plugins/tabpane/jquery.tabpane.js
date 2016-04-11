var bottomBarHeight=-1;(function($){$.tabpane={build:function(options){var opts=$.extend({},$.tabpane.defaults,options),prevHash;return this.each(function(){var $thisPane=$(this),thisOpts=$.extend({},opts,$thisPane.metadata()),$tabContainer,$tabGroup,index;function initCurrentTab(){var currentHash=window.location.hash.replace(/^.*#/,"");if(typeof prevHash!==undefined&&prevHash==currentHash){return}prevHash=currentHash;$thisPane.find("> .jqTab").filter(function(index){if(currentHash==""){return index+1==thisOpts.select||$(this).hasClass(thisOpts.select)}else{return"!"+this.id==currentHash}}).each(function(){$.tabpane.switchTab($thisPane,thisOpts,this.id)})}if(!$thisPane.is(".jqTabPaneInitialized")){$thisPane.addClass("jqTabPaneInitialized");$tabContainer=$thisPane;$('<span class="foswikiClear"></span>').prependTo($thisPane);$tabGroup=$('<ul class="jqTabGroup"></ul>').prependTo($thisPane);index=1;$thisPane.find("> .jqTab").each(function(){var $this=$(this),title=$this.find("h2:first").remove().html();$tabGroup.append('<li><a href="#" data="'+this.id+'">'+title+"</a></li>");$this.data("hash","!"+this.id);if(index==thisOpts.select||$(this).hasClass(thisOpts.select)){$.tabpane.switchTab($thisPane,thisOpts,this.id)}index++});if(thisOpts.autoMaxExpand){$.tabpane.autoMaxExpand($thisPane,thisOpts)}$thisPane.find(".jqTabGroup > li > a").click(function(){var newTabId=$(this).attr("data");$(this).blur();if(newTabId!=thisOpts.currentTabId){$.tabpane.switchTab($thisPane,thisOpts,newTabId)}return false});initCurrentTab();$(window).bind("hashchange",function(){initCurrentTab()})}})},switchTab:function($thisPane,thisOpts,newTabId){var oldTabId=thisOpts.currentTabId,$newTab=$("#"+newTabId),$oldTab=$("#"+oldTabId),$newContainer=$newTab.find(".jqTabContents:first"),$oldContainer=$oldTab.find(".jqTabContents:first"),oldHeight=$oldContainer.height(),data,$innerContainer,isInnerContainer;if(oldTabId==newTabId){return}$oldTab.removeClass("current");$newTab.addClass("current");$thisPane.find("li a[data="+oldTabId+"]").parent().removeClass("current");$thisPane.find("li a[data="+newTabId+"]").parent().addClass("current");if(!thisOpts[newTabId]){thisOpts[newTabId]=$newTab.metadata()}data=thisOpts[newTabId];if(typeof data.beforeHandler=="function"){data.beforeHandler.call(this,oldTabId,newTabId)}if((thisOpts.animate||thisOpts.autoMaxExpand)&&oldHeight>0){$newContainer.height(oldHeight)}$innerContainer=$newContainer;isInnerContainer=false;if(typeof data.container!="undefined"){$innerContainer=$newContainer.find(data.container);if($innerContainer.length){isInnerContainer=true}else{$innerContainer=$newContainer}}function _finally(){var effect="none",newHeight;if(oldHeight>0){effect="easeInOutQuad"}if(thisOpts.autoMaxExpand){if(thisOpts.animate&&effect!="none"){$innerContainer.css({opacity:0}).animate({opacity:1},300)}}else{if(thisOpts.animate){if(effect!="none"){$newContainer.height("auto");newHeight=$newContainer.height();if(isInnerContainer){$newContainer.height(oldHeight).animate({height:newHeight},300,effect,function(){$newContainer.height("auto")});$innerContainer.css({opacity:0}).animate({opacity:1},300,effect)}else{$newContainer.height(oldHeight).css({opacity:0}).animate({opacity:1,height:newHeight},300,effect,function(){$newContainer.height("auto")})}}}}$(window).trigger("resize");if(typeof data.afterHandler=="function"){data.afterHandler.call(this,oldTabId,newTabId)}thisOpts.currentTabId=newTabId}if(typeof data.url!="undefined"){$innerContainer.load(data.url,undefined,function(){if(typeof data.afterLoadHandler=="function"){data.afterLoadHandler.call(this,oldTabId,newTabId)}_finally()});delete thisOpts[newTabId].url}else{_finally()}},autoMaxExpand:function($thisPane,opts){window.setTimeout(function(){$.tabpane.fixHeight($thisPane,opts);$(window).one("resize.tabpane",function(){$.tabpane.autoMaxExpand($thisPane,opts)})},100)},fixHeight:function($thisPane,opts){var $container=$thisPane.find("> .jqTab.current .jqTabContents:first"),paneOffset=$container.offset(),paneTop,windowHeight,height,$debug;if(typeof paneOffset=="undefined"){return}paneTop=paneOffset.top;if(bottomBarHeight<=0){bottomBarHeight=$(".natEditBottomBar").outerHeight(true)+parseInt($container.css("padding-bottom"),10)*2.5}windowHeight=$(window).height();if(!windowHeight){windowHeight=window.innerHeight}height=windowHeight-paneTop-bottomBarHeight;$debug=$("#DEBUG");if($debug.length){height-=$debug.outerHeight(true)}if(opts&&opts.minHeight&&height<opts.minHeight){height=opts.minHeight}if(height<0){return}$.log("TABPANE: fixHeight height=",height);$container.height(height)},defaults:{select:1,animate:false,autoMaxExpand:false,minHeight:230}};$.fn.tabpane=$.tabpane.build;$(function(){$(".jqTabPane:not(.jqInitedTabpane)").livequery(function(){var $this=$(this);$this.addClass("jqInitedTabpane");$this.tabpane()})})})(jQuery);