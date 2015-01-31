
$(document).ready(function(){  
	var url = document.URL;
	if (url.indexOf('#') == -1){
		visitUrl("home");
	} else {
		var splitedUrl = url.split('#');
		if (splitedUrl[1] == ""){
			visitUrl("home");
		} else {
			visitUrl(splitedUrl[splitedUrl.length-1]);
		}
	}
});

window.onhashchange = function() {
	var href = location.href;
	href = href.substr(href.lastIndexOf('#') + 1);
	visitUrl(href);
}

function visitUrl(href){
		$('#nav li').removeClass('current');
		var currentNode = $('a[href="#'+href+'"]')[0];
		while((currentNode.parentNode).id != "nav"){
			currentNode = currentNode.parentNode;
		}
		$(currentNode).addClass('current');
		$('#loading').show();
		$.get(href,function(data,status){
			$('#container').html(data);
			$('#loading').hide()
		});
}