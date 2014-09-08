## Setting up "Progress Bars" project for local dev environment and to build production ready code  ##

### Software Requirements ###
To be able to build the project code for "ProgressBars", following applications need to be installed on the system: 

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [SASS](http://sass-lang.com/)
* [Compass](http://compass-style.org/)

## Install Bower & NPM Packages ##

You need to download a range of Bower packages and Grunt plugins (Node.js packages) before running Grunt. 
Via command line, execute the following commands making sure you are currently in the project root folder.

	$ bower install
	$ npm install

### Building the project ###

To build the project simply run the following command in the project build folder.

	$ grunt
	
This will execute the `default` Grunt task which will build, minify and copy the various assets (CSS, JS etc) to their respective folders.

### Watching the project ###

Running the `watch` Grunt task, will monitor changes to all assets in the project 
and execute various relevant Grunt tasks based on the file type. e.g. changes to a SASS file will trigger the SASS complier.

The `watch` task will minify any files, will still concatenate where appropriate and will copy the assets to their respective project folders. 
This aides development because you do not need to run any additional scripts to deploy front end changes to your local installation.

To run the `watch` Grunt task simply run the following command in the root level of the project build folder where the Gruntfile.js and package.json files are located.

	$ grunt watch