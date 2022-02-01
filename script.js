const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');


let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

//Unsplash API
let imageCount=30;
const apiKey='UqazJPRDaX9Ee6WkBMXMGsqRpSC8oyxWyFSQ20QDw8g';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// Check whenther all images have been loaded
function imageLoaded(){
    // console.log("Image has been loaded");
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {
        ready=true;
        // console.log("The page is ready");
        loader.hidden=true;
        imageCount=20;
    }
}

//Helper function to set attribute on DOM Elements

function setAttributes(element,attributes)
{
    for(const key in attributes)
    {
    element.setAttribute(key,attributes[key]);
    }
}


function displayPhotos()
{
    imagesLoaded=0;
    totalImages=photosArray.length;
    // console.log("Total Images ",totalImages);



//Run function for each object in photosArry 
 photosArray.forEach((photo)=>
 {

//Create <a> to link to unsplash

const item=document.createElement('a');
setAttributes(item,{
                href:photo.links.html,
                target:'_blank',
            });

// Create <img>  for photo

const img=document.createElement('img');
setAttributes(img ,{
                    src:photo.urls.regular,
                    alt:photo.alt_description,
                    title:photo.alt_description,
});

// Event listener check when each is finished loading
img.addEventListener('load',imageLoaded);

item.appendChild(img);
imageContainer.appendChild(item);

    });
}




/*
function displayPhotos(){ 
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
    
// Create <a> to link to Unspash 
    const item=document.createElement('a');
    item.setAttribute('href',photo.links.html);
    item.setAttribute('target','_balnk');

// Create <img> for photo
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.description);
        img.setAttribute('title',photo.description);

// Put <img> inside <a>, then put both inside image container

item.appendChild(img);
imageContainer.appendChild(item);


});
}

*/ 




// Get potos from Unsplash API

async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray =await response.json();
    //    console.log(photosArray);
      displayPhotos();
    }catch(error){
        // catch error here
        console.log("We have got an error",error);
       
    }
}


// Check to see if scrolling near bottom of page and load more

window.addEventListener('scroll',()=>{
if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
{   
    ready=false;
    getPhotos();
}
});

// Get photos
getPhotos();