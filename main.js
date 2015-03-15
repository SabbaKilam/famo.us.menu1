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
var menuWidth = window.innerWidth/6;
menu.setAttribute("width",menuWidth);
menu.style.userSelect = "none";
//'<img id="menu" src="images/menu.png" width="80" alt="menu">',

addSurface1();
addSurface2();
//===========================================
 function addSurface1(){
     var surface1 = new Surface({
         content:'Hi there!',
         size: [xy,xy],
         properties: {
             backgroundColor: 'orange',
             color: 'black',
             fontFamily: 'sans-serif',
             fontSize: '3rem',
             padding: '50px'
         }
     });  
    mainContext.add(surface1);
 }
 //=========================================== 
function addSurface2(){
    var surface2 = new Surface({
        content: menu,
        size: [xy,xy],
        properties: {
            backgroundColor: 'blue',
            color: 'white',
            padding: '30px',
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
window.onresize = function(){
    menuSize = window.innerWidth/6;
    menu.setAttribute("width",menuSize);
}

 
 