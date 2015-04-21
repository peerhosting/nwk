$( document ).ready(function() {
	
	// $( "#plus" ).click(function() {
	// 	$( this ).preventdefault();
 //  		$( this ).slideUp();
	// });

	$('#versing').click(function() {
		var textSize = $('#versing').css('font-size');

		// console.log(pxPeeler(textSize));
		textSize = pxPeeler(textSize);
		console.log(textSize);	
		$('#versing').css('font-size', textSize);
		$('#versing').append('<br>Versing');
		}
	);

	function pxPeeler(val){
		var i = 0;
		var toRet = '';
		while(val.charAt(i) != 'p'){
			toRet += val.charAt(i);
			i++;
		}
		console.log(toRet + ' in px peel');
		toRet *= (parseFloat(".96"));
		return toRet + 'px';
	}


			
});