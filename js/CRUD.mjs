class CRUD{
	
	getAsync(url, handleFunction){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			
			let json = JSON.parse(xmlHttp.responseText);
			json.forEach(singleTag => handleFunction(singleTag))
		}  
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
	}
	addAsync(theUrl, json){
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("POST", theUrl, true);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(json);
	}
	updateAsync(theUrl, json, callbackFunction){
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("PUT", theUrl, true);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.send(json);
	}
	deleteAsync(theUrl, callbackFunction){
		console.log('Shte se trie');
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("DELETE", theUrl, true);
		//xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.onreadystatechange = function() { 
			//if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				callbackFunction() 
		}
		xmlhttp.send(null);
	}
}

//module.exports = CRUD