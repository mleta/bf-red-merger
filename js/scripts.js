function handleSticky() {
	var scroll = $(this).scrollTop();
	if (scroll < 400){
    	$("#beaconfireredengine_hype_container").css("display","inline-block");
    	$("#logo-medium").css("display","none");		
    	$("#logo-small").css("display","none");
    	$("#mobile-nav-trigger").css("display","none");    	
    	$("header .email-signup").css("display","none");	    	
    	$('header').removeClass("sticky");
    	$(".page-wrap").css("margin-top","465px");  		  
  	}
  	else {
    	$("header").addClass("sticky");
    	$(".page-wrap").css("margin-top","465px");
    	$("#beaconfireredengine_hype_container").css("display","none");
    	$("#logo-small").css("display","none");
    	$("#mobile-nav-trigger").css("display","none");     	    	
    	$("#logo-medium").css("display","inline-block").fadeIn(400);
    	$("header .email-signup").fadeIn(400);		    		    	
  	}
}


function checkWidth() {
	var windowsize = $(window).width();
	if (windowsize >= 751) { //activate sticky header if big... 751=768 pg width
		handleSticky();
	} else {
    	$('header').removeClass("sticky");
    	$("#beaconfireredengine_hype_container").css("display","none");
    	$("#logo-medium").css("display","none");    	
    	$("#logo-small").css("display","inline-block");
    	$("#mobile-nav-trigger").css("display","inline-block");     	
    	$("header .email-signup").css("display","none");
    	$("#mobile-nav .email-signup").css("display","inline-block");    	  		
    	$(".page-wrap").css("margin-top","0");		
	}
}

function emailSignUps(){
	var BF = window.BF || {};

	BF.signup = function(e){
		e.preventDefault();

		var $form = $(this),
				$formContainer = $form.parent(),
				$input = $form.find('#mce-EMAIL'),
				$button = $form.find('button');

		if (!checkEmail($form)) {
			return false;
		}		

		$input.prop('disabled',true);

		$button.attr('data-html',$button.html())
			.prop('disabled',true)
			.addClass('disabled')
			.html('Sending...');

		$.ajax({
			url : $form.attr('action'),
			type : "get",
			dataType : "json",
			data : "EMAIL="+$input.val()
		});
		$formContainer
			.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
				($formContainer).replaceWith("<h4>Thanks for signing up! To complete the process,<br />please follow the link in the email we sent to this address.</h4>").addClass('animated fadeIn confirmation');	

			})
			.addClass('animated zoomOutDown');

	};

	window.BF = BF;	
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function checkEmail(form) {
    if( !IsEmail($(form).find(".email").val())) {
        $(form).find("label[for = email]").css("color","#D32329");
        $(form).find(".error-response").css("display","inline-block");            
        $(form).find(".error-response").html("Email address is invalid.");
        console.log("invalid email");
        return false;
    } else {
        $(form).find("label[for = email]").css("color","#A9A31A");
        $(form).find(".error-response").css("display","none");
		console.log("valid email");        
        return true;  
    }	
}

$( document ).ready(function() {

	$( "#mobile-nav-trigger" ).click(function() {	  
		$( "#mobile-nav" ).toggle( "slow" );
	});

	$("#mc-embedded-subscribe-form1 .email").blur(function() {
		if ( $(this).val().length !== 0 ) {
			checkEmail( $(this).parent() );
    	}
    });

	$("#mc-embedded-subscribe-form2 .email").blur(function() {
		if ( $(this).val().length !== 0 ) {
			checkEmail( $(this).parent() );
    	}
    });	

	$("#mc-embedded-subscribe-form3 .email").blur(function() {
		if ( $(this).val().length !== 0 ) {
			checkEmail( $(this).parent() );
    	}
    });	    

	$("#mc-embedded-subscribe-form1 .email-submit" ).on("click", function() {
		console.log("firing");
    });

	$("#mc-embedded-subscribe-form2 .email-submit" ).on("click", function() {
	   	console.log("firing");    
    });


	emailSignUps();

	if ($( "header" ).hasClass( "homepage" )) {
		checkWidth();	
	}


	// Bindings
	$(function(){
		$("#mc-embedded-subscribe-form1").on('submit',BF.signup);
		$("#mc-embedded-subscribe-form2").on('submit',BF.signup);
		$("#mc-embedded-subscribe-form3").on('submit',BF.signup);				
	});

});

$(window).resize( function (){
	if ($( "header" ).hasClass( "homepage" )) {
		checkWidth();	
	}
});

//$(window).scroll(checkWidth);
$(window).scroll( function (){
	if ($( "header" ).hasClass( "homepage" )) {
		checkWidth();	
	}
});
