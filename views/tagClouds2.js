/*let leftPaddingArray = [];
window.onload = function(){
	console.log(screen.width);
	let list = document.getElementById('myList');
	console.log(list);
	let elementCollection = list.getElementsByTagName('div');
	console.log(elementCollection);
	for (let i=0; i<elementCollection.length; i++) {
		console.log(elementCollection[i]);
		let randomNum = randomIntFromInterval(screen.width/4,screen.width/3)
		elementCollection[i].style.left = randomNum  + 'px';
		console.log(elementCollection[i].style.left);
		leftPaddingArray[i] = randomNum;	
	}
	
	for (let m=0; m<elementCollection.length; m++) {
		animate(elementCollection[m], leftPaddingArray[m]);
	}
	
	
}


function animate(box, position) {
	console.log(box);
 // const now = getTime();
 // const delta = (now - lastUpdate) / FRAME_DURATION;
  position += 1;

  //
   box.style.transform = `translateX(${ position }px)`;
  if(position > 3*(screen.width/4)){
	  return;
  }
	setTimeout(animate(box, position), 100);

  
  //lastUpdate = now;

  
  
}
function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
