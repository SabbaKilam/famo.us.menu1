/**
*
*   Author: Abbas Abdulmalik
*   Creation Date: 
*   Purpose:
*   Modified: N/A
*   Notes:
*
*
*/
//=============== basic famous core entities =====================
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface
var StateModifier = famous.modifiers.StateModifier;
//=================================================================
var mainContext = new Engine.createContext();
var xy = undefined;
var menuOpen = false;
var menu = document.createElement('img');
menu.setAttribute("src","images/menu.png");
var menuSize = window.innerWidth/8;
menu.setAttribute("width",menuSize);
menu.style.userSelect = "none";
//'<img id="menu" src="images/menu.png" width="80" alt="menu">',

addSurface1();
addSurface2();
//===========================================
 function addSurface1(){
     var surface1 = new Surface({
         content:'Tap<br>a ball',
         size: [xy,xy],
         properties: {
             backgroundColor: 'orange',
             color: 'black',
             fontFamily: 'sans-serif',
             fontSize: '3rem',
             padding: '50px',
             zIndex: '0'
         }
     });  
    mainContext.add(surface1);
 }
//==========================================

function addSurface2(){
    var surface2 = new Surface({
        content: menu,
        size: [xy,xy],
        properties: {
            backgroundColor: 'blue',
            color: 'white',
            padding: '30px',
             zIndex: '2',            
            boxShadow: '-5px 5px 20px black'         
        }
    });
    //------------------------------------------
    var surface2Modifier = new Modifier({
        transform: function(){
            return  getSurfaceWidth();
        }
    });
   mainContext.add(surface2Modifier).add(surface2);
   //-------------------------------------------
   surface2.on("click",function(){
       if(menuOpen){
           menuOpen = false;
       }
       else if(!menuOpen){
           menuOpen = true;           
       }
   }); 
 }
 //===========================================
 function getSurfaceWidth(){
     var x = 0;
     if(menuOpen){
        x = window.innerWidth / 2;
     }
     else if(!menuOpen){
         x = 0;
     }
     return Transform.translate(x,0,0); 
 }
 //===========================================
menu.style.cursor="pointer";

//////////////////////////////////////////////////////////
var appWidth = 0;
var appHeight = 0;
var imageWidth = 80;
var speed1 =1.75;
var speed2 =1.75001;
var ball1Stopped = true;
var ball1Snapshot = innerHeight/2;
var ball2Stopped = true;
var ball2Snapshot = innerHeight/4;

//////////////////////////////////////////////////////////////
window.onresize = function(){
    menuSize = window.innerWidth/8;
    menu.setAttribute("width",menuSize);
    //////////////////////////////
    appWidth = innerWidth;
    appHeight = innerHeight;
}
//////////////////////////////////////////////////////
var ball1 = new ImageSurface({
    size: [0.9*imageWidth, 0.9*imageWidth],
    content: 'images/blackball.png',
    properties: {
        visibility : 'visible',
        zIndex: '1'
    }
});

var ball2 = new ImageSurface({
    size: [imageWidth, imageWidth],
    content: 'images/blueball.png',
    properties: {
        visibility : 'visible',
        zIndex: '1'
    }
});

var bouncer1 = new Modifier({
    origin: [0, 0],
    align: [0, 0],
    transform : function () {
        var ticks = Date.now()/1000;
        var yPosition = (appHeight-imageWidth)*( 1 - Math.abs(Math.sin(speed1*ticks))) + imageWidth/9 ;       
        var xPosition = appWidth/4 - imageWidth/4;
        if(ball1Stopped){
            return Transform.translate( xPosition, ball1Snapshot ,0);            
        }
        else if(!ball1Stopped){
            ball1Snapshot = yPosition;
            return Transform.translate( xPosition, yPosition ,0);
        }
    }
});

var bouncer2 = new Modifier({
    origin: [0, 0],
    align: [0, 0],
    transform : function () {
        var ticks = Date.now()/999.999;
        var yPosition = (appHeight-imageWidth)*( 1 - Math.abs(Math.sin(speed2*ticks))) + imageWidth/9 ;       
        var xPosition = appWidth/3 - imageWidth/3;
        if(ball2Stopped){
            return Transform.translate( xPosition, ball2Snapshot ,0);            
        }
        else if(!ball2Stopped){
            return Transform.translate( xPosition, yPosition ,0);
            ball2Snapshot = yPosition;            
        }
    }
});


window.onload = function(){
    appWidth = innerWidth;
    appHeight = innerHeight;
}


ball1.on("mouseover", function(){
    if(ball1Stopped){
        ball1Stopped = false;        
    }
    else if(!ball1Stopped){
        ball1Stopped = true;        
    }    
});

ball2.on("mouseover", function(){
    if(ball2Stopped){
        ball2Stopped = false;        
    }
    else if(!ball2Stopped){
        ball2Stopped = true;        
    }    
});

//////////////////////////////////////////////////////////
mainContext.add(bouncer1).add(ball1);
mainContext.add(bouncer2).add(ball2);
 
 