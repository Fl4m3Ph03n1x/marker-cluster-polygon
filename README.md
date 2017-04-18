    $$$$$$$\            $$\                                                                                                              
    $$  __$$\           $$ |                                                           $$\                                               
    $$ |  $$ | $$$$$$\  $$ |$$\   $$\  $$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$$\          $$ |                                              
    $$$$$$$  |$$  __$$\ $$ |$$ |  $$ |$$  __$$\ $$  __$$\ $$  __$$\ $$  _____|      $$$$$$$$\                                            
    $$  ____/ $$ /  $$ |$$ |$$ |  $$ |$$ /  $$ |$$ /  $$ |$$ |  $$ |\$$$$$$\        \__$$  __|                                           
    $$ |      $$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ | \____$$\          $$ |                                              
    $$ |      \$$$$$$  |$$ |\$$$$$$$ |\$$$$$$$ |\$$$$$$  |$$ |  $$ |$$$$$$$  |         \__|                                              
    \__|       \______/ \__| \____$$ | \____$$ | \______/ \__|  \__|\_______/                                                            
                            $$\   $$ |$$\   $$ |                                                                                         
                            \$$$$$$  |\$$$$$$  |                                                                                         
                             \______/  \______/                                                                                          
    $$\      $$\                     $$\                                  $$$$$$\  $$\                       $$\                         
    $$$\    $$$ |                    $$ |                                $$  __$$\ $$ |                      $$ |                        
    $$$$\  $$$$ | $$$$$$\   $$$$$$\  $$ |  $$\  $$$$$$\   $$$$$$\        $$ /  \__|$$ |$$\   $$\  $$$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\  
    $$\$$\$$ $$ | \____$$\ $$  __$$\ $$ | $$  |$$  __$$\ $$  __$$\       $$ |      $$ |$$ |  $$ |$$  _____|\_$$  _|  $$  __$$\ $$  __$$\ 
    $$ \$$$  $$ | $$$$$$$ |$$ |  \__|$$$$$$  / $$$$$$$$ |$$ |  \__|      $$ |      $$ |$$ |  $$ |\$$$$$$\    $$ |    $$$$$$$$ |$$ |  \__|
    $$ |\$  /$$ |$$  __$$ |$$ |      $$  _$$<  $$   ____|$$ |            $$ |  $$\ $$ |$$ |  $$ | \____$$\   $$ |$$\ $$   ____|$$ |      
    $$ | \_/ $$ |\$$$$$$$ |$$ |      $$ | \$$\ \$$$$$$$\ $$ |            \$$$$$$  |$$ |\$$$$$$  |$$$$$$$  |  \$$$$  |\$$$$$$$\ $$ |      
    \__|     \__| \_______|\__|      \__|  \__| \_______|\__|             \______/ \__| \______/ \_______/    \____/  \_______|\__|      
                                                                                                                                         
                                                                                                                                         

# Description

This project is a demo of how you can attach polygons for regions in Google Maps, 
and how you can have clusters of Markers. 

In this sample, you can see Portugal divided by its districts, as well as some
points of interested marked.

When zommed out, the markers are clustered.

![zomm_out](/docs/zoom_out.png?raw=true "Makers Clustered")

When zoomed in, the cluster dissipates so you can see each marker individually.

![zoom_in](/docs/zoom_in.png?raw=true "Cluster dissipated")

# Usage

To use it, simply download all the files and open `index.html`. When doing so, 
**make sure you are using your API key**. This key is located in the `<head>` 
section of `index.html`:

    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>

# JavaScript Code

The following files are under the directory `js` and they represent the logic of 
this demo:

 - `data/poiData.js` is the file containing the data for the points of interest. To find the coordinates of a point of interest you can use https://google-developers.appspot.com/maps/documentation/utils/geocoder/
 - `data/districtData.js` constains the coordinates that define the district's polygon shape.
 - `geometry/coordinate.js` representes a coordinate object.
 - `geometry/polygon.js` represents a polygon object. Contains mathematical calculations for polygons.
 - `utils/randomColor.js` contains a function to help generete random strings of colors.
 - `libs/markermanager.js` is my library for managing marker objects from the Google Maps API.  
 - `myscript.js` is responsible for creating the polygons and clustering the marks. Depends on `markermanager.js`.