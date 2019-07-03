class CRUD{
	
	getAsync(url, handleFunction, additionalJsonHandler){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			
			let json = JSON.parse(xmlHttp.responseText);
			json.forEach(singleTag => handleFunction(singleTag))
			if(additionalJsonHandler){
				additionalJsonHandler();
			}
		}  
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
	}
	addAsync(url, json, callbackFunction){

		let asyncAddRequest = new XMLHttpRequest();   // new HttpRequest instance 
		asyncAddRequest.open("POST", url, true);
		asyncAddRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		asyncAddRequest.onreadystatechange = function() { 
			if (asyncAddRequest.readyState == 4 && (asyncAddRequest.status == 201 || asyncAddRequest.status == 200)){
				callbackFunction() 
			}
		}
		asyncAddRequest.send(json);
	}
	updateAsync(theUrl, json, callbackFunction){
		let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("PUT", theUrl, true);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.onreadystatechange = function() { 
			if (xmlhttp.readyState == 4 &&(xmlhttp.status == 201 || xmlhttp.status == 200)){
				callbackFunction() 
			}
		}
		xmlhttp.send(json);
	}
	deleteAsync(theUrl, callbackFunction){
		console.log('Shte se trie');
		let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("DELETE", theUrl, true);
		//xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.onreadystatechange = function() { 
			if (xmlhttp.readyState == 4 && xmlhttp.status == 201){
				callbackFunction() 
			}
		}
		xmlhttp.send(null);
	}
}

//module.exports = CRUD