/*	........................................................................................................
		author: 		Aleem Latif
 		description: 	Progress Bars jQuery Plugins  	
......................................................................................................... */

// start : ALProgressBar object
var ALProgressBars = {
	//	Set the default values
    options	 : { 	
		startVal: 0,
        finishVal: 100		
	},
	
	init : function (start, finish)	{
		
		// 	Facilitate overriding of default values of the object    
         ALProgressBars.options.startVal = (start)? start : ALProgressBars.options.startVal;		
		 ALProgressBars.options.finishVal = (finish)? finish : ALProgressBars.options.finishVal;
		 
		 // Initialize progress bars	 
		 ALProgressBars.initProgressBars();	
	},
	
	/**
	 	initialize progress bars
	*/
	initProgressBars: function ()	{
			var o = ALProgressBars.options;				            
			var objs = $('.progress-bar');  
			
			//Initialize each progress bar
			objs.each(function(i, ele) {
			 
			  obj =  $( this );			
								
				obj.progressbar({
				  value: o.startVal,
				  max: o.finishVal,
				  
				  create : function( event, ui )	{
					  
					var i=0;
					
					var val = obj.progressbar( "option", "value" );
					
					$('.ui-slider-range').removeClass('success');
									
					obj.progressbar("value", obj.data('init-val'));			
							
				  },
				  
				  complete : function( event, ui )	{
					  
					$('.unqualified').addClass('hidden');
					$('.qualified').removeClass('hidden');
					 $('.ui-slider-range').addClass('success');
				  
				  },
				  
				  change : function( event, ui )	{
					
					var progressLabel =obj.find( ".progress-label" );
					
					progressLabel.text( obj.progressbar( "value" ) + "%" ); 
					 
				  }
				});
			});	
			
			
	}, 
	/**
	 	update progress bars
	*/
	updateProgressBar : function(selectedBarId, changeVal)	{
		
			var progressbar = $( "#"+selectedBarId );
			var progressLabel = $( progressbar + " > .progress-label" );
		 	  
			progressbar.progressbar({
			  value: progressbar.progressbar( "value" ) + changeVal,
			  
			  change: function() {
				progressLabel.text( progressbar.progressbar( "value" ) + "%" );
			  },
			  
			  complete: function() {
				$('.ui-slider-range').addClass('success');
			  }
		   });
	}
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
		  create: function( event, ui ) {
			// Set maxWidth
			$(this).css("maxWidth", "500px");
		  }  
		});
				
		ALProgressBars.init();	
	}
	
	initProgressBar();
	 	
	// Reset Porgress Bar
	$('.control-panel button').on('click', function(e)	{
		 var selectedBarId = $('#bars-selector').val;		 
		 ALProgressBars.updateProgressBar({selectedBarId: selectedBarId, changeVal : $(this).data('change-val')});	
	});
});