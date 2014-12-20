$(document).ready(function(){
	var url = document.URL;
	if (url.indexOf('#') == -1){
		visitUrl.call($('#nav a[href="#home"]')[0]);
	} else {
		var splitedUrl = url.split('#');
		if (splitedUrl[1] == ""){
			visitUrl.call($('#nav a[href="#home"]')[0]);
		} else {
			visitUrl.call($('#nav a[href="#'+splitedUrl[1]+'"]')[0]);
		}
	}
	
	$('#nav .url').click(function(){
		visitUrl.call(this);
	});
});

function visitUrl(){
        console.log(this);
		var href = this.href.replace('#', '');
		$('#nav li').removeClass('current');
		var currentNode = this;
		while((currentNode.parentNode).id != "nav"){
			currentNode = currentNode.parentNode;
		}
		$(currentNode).addClass('current');
		$.get(href,function(data,status){
			$('#container').html(data);
		});
}