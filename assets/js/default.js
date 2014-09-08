/*	........................................................................................................
		author: 		Aleem Latif
 		description: 	Progress Bars jQuery Plugins  	
......................................................................................................... */

// start : ALProgressBars jQuery Plugin */

(function($){
 
    //	Attach this new method to jQuery
    $.fn.extend({ 
         
        //	start: ALProgressBars plugin method
        ALProgressBars: function(options) {
 			
			//	Set the default values
            var defaults = {
				initProgressVal: 0,
                currProgressVal: 0, 
				targetProgressVal: 100,
				completionDuration: 2000				
            }
            
			// 	Facilitate overriding of default values of the plugin    
            defaults.currProgressVal = (options.currProgressVal)? options.currProgressVal : defaults.currProgressVal;
			defaults.targetProgressVal = (options.targetProgressVal)? options.targetProgressVal : defaults.targetProgressVal;
			defaults.completionDuration = (options.completionDuration)? options.completionDuration : defaults.completionDuration;
			
			var options =  $.extend(defaults, options);
			
			// Initialize progress-bar state
			$( "#curr-progress, .progress-diff" ).text( defaults.currProgressVal + "%");														  
			$( "#curr-progress" ).css( { "left": 0 } );
			$('.unqualified').removeClass('hidden');
			$('.qualified').addClass('hidden');
			$('.ui-slider-range').removeClass('success');
															
            //	Iterate through the matched objects and return the flow back to jQuery
            return this.each(function() {
				 	
				 	var o = options;                
					var obj = $(this);       
										
					obj.slider({
							
							// initialize slider values
							orientation: "horizontal",
							range: "min",
							step: 1,
							animate: 'slow',							
							value: o.currProgressVal,
							min: o.initProgressVal,
							max: o.targetProgressVal,
							
							// Initialize Progress values - at slider creation time
							create: function (event, ui)	{
															
								$( "#curr-progress" ).text( obj.slider( "value" ) + "%");
																
								// find the progressDiff 															
								var currentVal = obj.slider( "value" );	
								var progressDiff = o.targetProgressVal - currentVal;								
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (progressDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;	
								$('.ui-slider-handle').css( { "left": leftPos - 7} );
																						
								var leftPos = (leftPos - leftPosAdj ) + "px";																 
								$( "#curr-progress" ).css( { "left": leftPos} );
								
								// show appropriate message and update the progressDiff value
								if (progressDiff > 0)	{
									$('.unqualified').removeClass('hidden');
									$('.qualified').addClass('hidden');
									$('.ui-slider-range').removeClass('success');
									$('span.progress-diff').text(currentVal + "%");
								} else	{
									$('.unqualified').addClass('hidden');
									$('.qualified').removeClass('hidden');	
									$('.ui-slider-range').addClass('success');
																	}																
						 
							},
							
							// Adjust values when the slider-pointer moves
							slide: function( event, ui ) {
								
								$( "#curr-progress" ).html( ui.value + "%");								
								
								// find the progressDiff 			
								var currentVal = ui.value;	
								var progressDiff = o.targetProgressVal - currentVal;	
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (progressDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;	
								
								$('.ui-slider-handle').css( { "left": leftPos - 7} );
																							
								var leftPos = (leftPos - leftPosAdj ) + "px";																 
								$( "#curr-progress" ).css( { "left": leftPos} );							
								
								if (progressDiff > 0)	{
									$('.unqualified').removeClass('hidden');
									$('.qualified').addClass('hidden');
									$('.ui-slider-range').removeClass('success');
									$('span.progress-diff').text(currentVal + "%");
								} else	{
									$('.unqualified').addClass('hidden');
									$('.qualified').removeClass('hidden');
									$('.ui-slider-range').addClass('success');
								}																	
							},
							stop: function(event, ui)	{
								// find the progressDiff 			
								var currentVal = ui.value;	
								var progressDiff = o.targetProgressVal - currentVal;	
								
								// adjust poistion of CurrentValue w.r.t slider-arrow	
								var leftPosAdj = (progressDiff > 5)? 10 : 15;							
								var leftPos = $('.ui-slider-handle').position().left;	
								$('.ui-slider-handle').css( { "left": leftPos - 7 } );															
								var leftPos = (leftPos - leftPosAdj ) + "px";																 
								$( "#curr-progress" ).css( { "left": leftPos} );
							}
							
					});	// end slider					
					
            }); //	end: ALProgressBars plugin
        }
    });
     
      
})(jQuery);

// end : ALProgressBars plugin


// start : ALProgressBar object
var ALProgressBar = {
	//	Set the default values
    options	 : {        
		startVal: 0,
        currVal: 0, 
		finishVal: 100,
		durationVal: 2000
	},
	
	init : function (start, finish, duration)	{
		
		// 	Facilitate overriding of default values of the object    
         ALProgressBar.options.startVal = (start)? start : ALProgressBar.options.startVal;
		 ALProgressBar.options.currVal =  (start)? start : ALProgressBar.options.startVal;
		 ALProgressBar.options.finishVal = (finish)? finish : ALProgressBar.options.finishVal;
		 ALProgressBar.options.durationVal = (duration)? duration : ALProgressBar.options.duration;
		 
		 ALProgressBar.progress();	
	},
	
	progress: function ()	{
			var o = ALProgressBar.options;				            
			var obj = $('#progressbar');  
					
			if ($('.percentage-left').length <= 0)	{
				obj.before( '<span class="percentage-left">'+ o.startVal +'%</span>' );
				obj.after( '<span class="percentage-right">'+ o.finishVal +'%</span>' );
			}
			
			obj.progressbar({
			  value: o.startVal,
			  max: o.finishVal,
			  
			  create : function( event, ui )	{
				  
				var i=0;
				var interval = o.durationVal / 100;
				var val = obj.progressbar( "option", "value" );
				
				$('.unqualified').removeClass('hidden');
				$('.qualified').addClass('hidden');
				$('.ui-slider-range').removeClass('success');
				$('span.progress-diff').text(val + "%");
				
				var int = self.setInterval(
					function(){
						if (i == 100) window.clearInterval(int);
						obj.progressbar("value", i);
						i++;
					}, 
					interval);  
						
			  },
			  
			  complete : function( event, ui )	{
				  
				$('.unqualified').addClass('hidden');
				$('.qualified').removeClass('hidden');
				 $('.ui-slider-range').addClass('success');
			  
			  },
			  
			  change : function( event, ui )	{
				var val = obj.progressbar( "option", "value" );
				 
			  	$('span.progress-diff').text(val + "%");
			  }
			});
			
			
			
	} // end : progress method
}
// end : ALProgressBar object

//==================================
jQuery(function($) { 
	var paramsArr = [];
	
	function initProgressBar()	{
		
		$( "#lightbox" ).dialog({
		  modal: true,
		  minWidth: 400,
		  minHeight: 210,		  
		});
				
		// Fetch progress-bar parameters from the external JSON data file
		$.ajax({				
				type: "GET",
				url : 'assets/js/data.json',
				dataType: "json",
				
				success: function(jData) {										
					$.each( jData, function( key, val ) {						
						if (key == 'data')	{
							 paramsArr.start = val.lightbox.start;	
							 paramsArr.finish = val.lightbox.finish;
							 paramsArr.duration = val.lightbox.duration;							
						}						
					});			
					
					 //console.log(  paramsArr  );
					
					// Call ALProgressBar Object with the over-riding default parameters					
					ALProgressBar.init(paramsArr.start, paramsArr.finish, paramsArr.duration);
					
					// Call ALProgressBars plugin with the over-riding default parameters
					$('#progress-meter').ALProgressBars({currProgressVal: paramsArr.start, targetProgressVal : paramsArr.finish, completionDuration : paramsArr.duration});	
				},
				error: function(){
					alert("Error: could not load data.json file");
				}
								
		});	//	end $.ajax  
	}
	
	initProgressBar();
	 	
	// Reset Porgress Bar
	$('#reset-button').on('click', function(e)	{
		 e.preventDefault();
		 
		 // reset progressbar
		 $('#progressbar').progressbar( "destroy" );								
		 ALProgressBar.init({start: paramsArr['start'], finish : paramsArr['finish'], duration : paramsArr['duration']});
		 
		 // reset progressSlider
		 $('#progress-meter').ALProgressBars("destroy");	
		 $('#progress-meter').ALProgressBars({currProgressVal: 0, targetProgressVal : 100});	
	});
});