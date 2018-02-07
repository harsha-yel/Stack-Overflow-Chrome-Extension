console.dir('in content script');
console.dir(document.title);
if (document.addEventListener){
    document.addEventListener("click", function(event){
        var targetElement = event.target || event.srcElement;
 		var from = findParent('a',targetElement);
  		if (from){
  			var field=from.innerHTML.trim();
			if(field=="up vote" || field=="down vote"|| field=="share"||field=="Ask Question" || field=="add a comment" || field=="ask your own question")
       			var text=field+" |"+document.title;
  			else var text="Question clicked|"+field;
    	}
    	else {
        var text=targetElement.textContent || text.innerText;
        text=text.toString().substring(0,30)+"....";
      }
        chrome.runtime.sendMessage({greeting:text}, function(response) {
          console.log("in"+response);
        });
    });
    function findParent(tagname,element){
		  if ((element.nodeName || element.tagName).toLowerCase()===tagname.toLowerCase()){
		    return element;
		  }
		  while (element = element.parentNode){
		    if ((element.nodeName || element.tagName).toLowerCase()===tagname.toLowerCase()){
		      return element;
		    }
		  }
		  return null;
	}

} 
