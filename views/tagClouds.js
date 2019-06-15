function RotatingCloud(){
    
	let listElement = $('#list a');
	let offset = 0; 
	let stepping = 0.03;
	let list = $('#list');
	let $list = $(list)

$list.mousemove(function(e){
    var topOfList = $list.eq(0).offset().top
    var listHeight = $list.height()
    stepping = (e.clientY - topOfList) /  listHeight * 0.2 - 0.1;
    
});


for (var i = listElement.length - 1; i >= 0; i--)
{
    listElement[i].elemAngle = i * Math.PI * 2 / listElement.length;
}


setInterval(render, 50);


function render(){
    for (let i = listElement.length - 1; i >= 0; i--){  
		addProperCss(listElement[i]);   
    }
    offset += stepping;
}

function addProperCss(currentElement){
	let angle = currentElement.elemAngle + offset;
        
	x = 120 + Math.sin(angle) * 30;
	y = 45 + Math.cos(angle) * 40;
	size = Math.round(40 - Math.sin(angle) * 40);
	
	let elementCenter = $(currentElement).width() / 2;

	let leftValue = (($list.width()/2) * x / 100 - elementCenter) + "px"
	$(currentElement).css("fontSize", size + "pt");
	$(currentElement).css("opacity",size/100);
	$(currentElement).css("zIndex" ,size);
	$(currentElement).css("left" ,leftValue);
	$(currentElement).css("top", y + "%");
}
	
    
};


$(document).ready(RotatingCloud());





/*jQuery( document ).ready( function() {
            var entries = [ 
                { label: 'Back to top', url: 'https://www.jqueryscript.net/tags.php?/Back%20to%20top/', target: '_top' },
                { label: 'Bootstrap', url: 'https://www.jqueryscript.net/tags.php?/Bootstrap/', target: '_top' },
                { label: 'Carousel', url: 'https://www.jqueryscript.net/tags.php?/carousel/', target: '_top' },
                { label: 'Countdown', url: 'https://www.jqueryscript.net/tags.php?/countdown/', target: '_top' },
                { label: 'Dropdown Menu', url: 'https://www.jqueryscript.net/tags.php?/Drop%20Down%20Menu/', target: '_top' },
                { label: 'CodePen', url: 'https://codepen.io/', target: '_top' },
                { label: 'three.js', url: 'https://threejs.org/', target: '_top' },
                { label: 'Form Validation', url: 'https://www.jqueryscript.net/tags.php?/form%20validation/', target: '_top' },
                { label: 'JS Compress', url: 'http://jscompress.com/', target: '_top' },
                { label: 'TinyPNG', url: 'https://tinypng.com/', target: '_top' },
                { label: 'Can I Use', url: 'http://caniuse.com/', target: '_top' },
                { label: 'URL shortener', url: 'https://goo.gl/', target: '_top' },
                { label: 'Grid Layout', url: 'https://www.jqueryscript.net/tags.php?/grid%20layout/', target: '_top' },
                { label: 'Twitter', url: 'https://twitter.com/niklaswebdev', target: '_top' },
                { label: 'deviantART', url: 'http://nkunited.deviantart.com/', target: '_top' },
                { label: 'Gulp', url: 'http://gulpjs.com/', target: '_top' },
                { label: 'Browsersync', url: 'https://www.browsersync.io/', target: '_top' },
                { label: 'GitHub', url: 'https://github.com/', target: '_top' },
                { label: 'Shadertoy', url: 'https://www.shadertoy.com/', target: '_top' },
                { label: 'Tree View', url: 'https://www.jqueryscript.net/tags.php?/tree%20view/', target: '_top' },
                { label: 'jsPerf', url: 'http://jsperf.com/', target: '_top' },
                { label: 'Foundation', url: 'https://foundation.zurb.com/', target: '_top' },
                { label: 'CreateJS', url: 'https://createjs.com/', target: '_top' },
                { label: 'Velocity.js', url: 'http://julian.com/research/velocity/', target: '_top' },
                { label: 'TweenLite', url: 'https://greensock.com/docs/#/HTML5/GSAP/TweenLite/', target: '_top' },
                { label: 'jQuery', url: 'https://jquery.com/', target: '_top' },
                { label: 'Notification', url: 'https://www.jqueryscript.net/tags.php?/Notification/', target: '_top' },
                { label: 'Parallax', url: 'https://www.jqueryscript.net/tags.php?/parallax/', target: '_top' }
            ];
            var settings = {
                entries: entries,
                width: 640,
                height: 480,
                radius: '65%',
                radiusMin: 75,
                bgDraw: true,
                bgColor: '#111',
                opacityOver: 1.00,
                opacityOut: 0.05,
                opacitySpeed: 6,
                fov: 800,
                speed: 2,
                fontFamily: 'Oswald, Arial, sans-serif',
                fontSize: '15',
                fontColor: '#fff',
                fontWeight: 'normal',//bold
                fontStyle: 'normal',//italic 
                fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                fontToUpperCase: true
            };
            //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
            jQuery( '#tag-cloud' ).svg3DTagCloud( settings );
} );*/
        