//Vars
var video = document.getElementById("video")
var animtxt = document.getElementById("desc")
var maintxt = document.getElementById("maindesc")
var bait = document.getElementById("bait")
var pbtn = document.getElementById("pbtn")
var txtbait = document.getElementById("txtbait")
var body = document.getElementById("body")
var maintaince = document.getElementById("maintaince")
var spans = animtxt.children
let first = true

//Setup
maintaince.style.visibility="hidden"
pbtn.style.visibility="hidden"
video.pause()
window.onbeforeunload = function () {
    window.scrollTo(0, 0)
}
//Events
video.addEventListener("play", StartAnim)
video.addEventListener("pause", stopAnim)
video.addEventListener("ended", stopAnim)
bait.addEventListener("click", ()=>{
    if(first){
        bait.remove()
        txtbait.remove()
        body.style.background = "#000"
        scrollToElement(maintxt)
        video.play()
        video.volume=0.5
        video.muted = !video.muted
        animtxt.style.visibility="hidden" //for now..
        //animtxt.style.opacity=1
        //MAKE BACKGROUND REALLY DARK WHEN YOU PRESS AND THEN LIGHT IT UP AFTER 2 SECONDS WITH THE REST OF THE STUFF 
        sleep(2000).then(()=>{
            body.style.background = "rgb(25, 0, 37)"
            body.style.animationPlayState='running'
            maintxt.style.opacity=1
            video.style.opacity=1
            pbtn.style.visibility="visible"
            pbtn.style.opacity=1
            first=false
            //LIGHT IT UP HERE OR MAYBE IN STARTANIMATION()
         })
    }
})

pbtn.addEventListener("click", ()=>{
    var vol = video.volume
    var interval = 150 // 150ms interval

    var fadeout = setInterval(
        function() {
            // Reduce volume by 0.05 as long as it is above 0
            // This works as long as you start with a multiple of 0.05!
            if (vol > 0.05) {
            vol -= 0.05
            video.volume = vol
            }
            else {
            // Stop the setInterval when 0 is reached
            clearInterval(fadeout)
            }
        }, interval)
    video.style.opacity=0
    pbtn.style.opacity=0
    maintxt.style.opacity=0
    body.style.animation="None"
    body.style.background="rgb(25, 0, 37)"
    sleep(2000).then(()=>{
        video.style.visibility="hidden"
        pbtn.style.visibility="hidden"
        maintaince.style.visibility="visible"
    })
    //then start game in here.
})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function StartAnim(){
    for (let i=0; i<spans.length; i++){
        spans[i].style.animationPlayState = 'running'
    }
    maintxt.style.animationPlayState = 'running'
    video.style.animationPlayState='running'
    pbtn.style.animationPlayState='running'
    if(!first){
        body.style.animationPlayState='running'
    }
    //handle the nevergonna glowing delay in the middle of the choir
}

function stopAnim(){
    for (let i=0; i<spans.length; i++){
        spans[i].style.animationPlayState = 'paused'
    }
    maintxt.style.animationPlayState = 'paused'
    video.style.animationPlayState='paused'
    pbtn.style.animationPlayState='paused'
    body.style.animationPlayState='paused'
}

function scrollToElement(pageElement) {    
    var positionX = 0,         
        positionY = 0

    while(pageElement != null){        
        positionX += pageElement.offsetLeft       
        positionY += pageElement.offsetTop       
        pageElement = pageElement.offsetParent       
        window.scrollTo(positionX, positionY)   
    }
}