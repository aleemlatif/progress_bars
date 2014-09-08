/*	........................................................................................................
		author: 		Aleem Latif
 		description: 	Progress Bars  	
......................................................................................................... */

// start : ALProgressBars object
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
										
					var val = obj.progressbar( "option", "value" );
					
					obj.find('.ui-progressbar-value').removeClass('success');									
					obj.progressbar("value", obj.data('init-val'));			
							
				  },
				  
				  complete : function( event, ui )	{
					 obj.find('.ui-progressbar-value').addClass('success');				  
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
			var operator = changeVal.slice(0,1);
			var changeVal = parseInt(changeVal.slice(1));
			var progressBar = $( "#"+selectedBarId );
			var progressLabel = progressBar.find( ".progress-label" );
		 	var val = progressBar.progressbar( "value" ) || 0;
			
			switch (operator)	{
				case "-":	{
					 progressBar.progressbar( "value", val - changeVal );
					 break;
				}
				case "+":	{
					 progressBar.progressbar( "value", val + changeVal );
					 break;
				}
			}
			
			  
			progressBar.progressbar({
				  				  
				  change: function() {
						progressLabel.text( progressBar.progressbar( "value" ) + "%" );
				  },
				  
				  complete: function() {
						progressBar.find('.ui-progressbar-value').addClass('success');
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
			$(this).css("maxWidth", "600px");
		  }  
		});
				
		ALProgressBars.init();	
	}
	
	initProgressBar();
	 	
	// Reset Porgress Bar
	$('.control-panel button').on('click', function(e)	{
		 var selectedBarId = $('#bars-selector').val();	
		 var changeVal = $(this).data('change-val'); 
		 ALProgressBars.updateProgressBar(selectedBarId, changeVal);	
	});
});