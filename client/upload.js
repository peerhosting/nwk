// controller.js



$(document).ready(function(){
	// console.log('message');

	$('#upload').click(function(){
		// alert('YII');	
		var files = getFiles();
		var formData = new FormData(files);

		if(!formData){
			console.log('error!!'); 
		} else {
			$.ajax({
				url: '/upload',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false, 
				success: function(res){
					console.log(res);
				},
				error: function(err){
					console.log(err);
				}
			})

			// $.post('/upload', formData,function(data, status){
			// 	console.log(data);
			// });
		}
		


	});


var getFiles = function(){
	var fileInput = document.querySelector("#myfiles");
	return fileInput.files;
}
// 	var pullfiles=function(){ 
//     // love the query selector
//     var fileInput = document.querySelector("#myfiles");
//     var files = fileInput.files;
//     // cache files.length 
//     var fl=files.length;
//     var i=0;

//     while ( i < fl) {
//         // localize file var in the loop
//         var file = files[i];
//         alert(file.name);
//         i++;
//     }    
// }

// set the input element onchange to call pullfiles
// document.querySelector("#myfiles").onchange=pullfiles;


});