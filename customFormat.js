(function (){
   if(!window?.TC_YAAS){
       window.TC_YAAS = {}
   }

    if(!window?.TC_YAAS?.customFormat){
        window.TC_YAAS.customFormat = {}
    }

   window.TC_YAAS.customFormat.setup = (config, slot)=>{
       // let data = {
       //     baseurl : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
       //     expandable : [
       //         {
       //             url : "https://via.placeholder.com/200x400/32a852",
       //             pos : [10,30]
       //         },
       //         {
       //             url : "https://via.placeholder.com/200x400/9e3426",
       //             pos : [40,50]
       //         },
       //         {
       //             url : "https://via.placeholder.com/200x400/87503e",
       //             pos : [20,30]
       //         },
       //         {
       //             url : "https://via.placeholder.com/200x400/9e4426",
       //             pos : [10,30]
       //         },
       //         {
       //             url : "https://via.placeholder.com/200x400/32a852",
       //             pos : [40,90]
       //         }
       //     ]
       // }
       createAdArea(config, slot)
       loadJavaScript("https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js", afterScriptLoad)
   }
}())

function afterScriptLoad(){
    gsap.to(".plus", {
        duration: 1, // Duration of each breath cycle (in seconds)
        scale: 1.2, // Scale up by 20% (1.0 is normal size)
        opacity: 0.7, // Slightly reduce opacity during expansion
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Play the animation in reverse after each cycle
        ease: "power1.inOut" // Easing function for smooth animation
    });
}

function createAdArea(config, slot){
    const slotDiv = document.getElementById(slot)
    if(!slotDiv){
        console.log("SLOT NOT FOUND")
        return
    }
    const {expandable = []} = config
    const container = document.createElement("div")
    const closeButton = createCloseButton()

    container.style.width = "100%"
    container.style.height = "100%"
    container.style.position = "relative"
    container.style.overflow = "hidden"
    const imgDiv = createBaseImg(config.baseurl)
    container.appendChild(imgDiv)
    container.appendChild(closeButton)

    expandable.forEach((item, index)=>{
        const imgDiv = createImageDiv(item.url)
        imgDiv.setAttribute("data-imgid", `expImg${index + 1}`)
        const plus = createPlusIcon(`expImg${index + 1}`, item.pos)

        container.appendChild(imgDiv)
        container.appendChild(plus)
    })
    slotDiv.appendChild(container)
}

function createCloseButton(){
    const imgDiv = document.createElement("div");
    imgDiv.id = "tcCloseButton"
    imgDiv.addEventListener("click", ()=>closeClickHandler())
    imgDiv.style.cssText = "height: 40px; width: 40px; cursor : pointer";
    imgDiv.style.position = "absolute"
    imgDiv.style.left = `90%`
    imgDiv.style.top = `10%`
    imgDiv.style.zIndex = "999999"
    imgDiv.style.transform = "scale(0) translate(-50%, -50%)"

    const img = new Image();
    img.src = "https://media-b.performoo.com/assets/af/img/icons/custom/close-btn.png";
    img.style.cssText = "height: 100%; width: 100%;";

    imgDiv.appendChild(img);
    return imgDiv;
}

function closeClickHandler(){
    let closeButton = document.getElementById("tcCloseButton")
    console.log("closeClicking,")
    const closeAnimation = gsap.to(closeButton, {
        duration: 0.5, // Duration of each breath cycle (in seconds)
        scale: 0,
        ease: "back.out(1.7)" // Easing function for smooth animation
    });

    gsap.to(".box", {
        duration: 0.5, // Duration of each breath cycle (in seconds)
        left: "100%", // Scale up by 20% (1.0 is normal size)
        ease: "power1.inOut" // Easing function for smooth animation
    });

    closeAnimation.play()
}

function createPlusIcon(id, pos){
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("plus")
    imgDiv.setAttribute("data-plusId", id)
    imgDiv.addEventListener("click", ()=>plusClickHandler(id))
    imgDiv.style.cssText = "height: 40px; width: 40px; cursor : pointer";
    imgDiv.style.position = "absolute"
    imgDiv.style.left = `${pos[0]}%`
    imgDiv.style.top = `${pos[1]}%`
    imgDiv.style.zIndex = "100"
    imgDiv.style.transform = "translate(-50%, -50%)"

    const img = new Image();
    img.src = "https://media-b.performoo.com/assets/af/img/icons/custom/plus-btn.png";
    img.style.cssText = "height: 100%; width: 100%;";

    imgDiv.appendChild(img);
    return imgDiv;
}

function createBaseImg(url){
    const imgDiv = document.createElement("div");
    imgDiv.style.cssText = "height: 100%; width: 100%; pointer-events : none;"
    imgDiv.classList.add("baseImg")

    const img = new Image();
    img.src = url;
    img.style.cssText = "height: 100%; width: 100%; pointer-events : none;"
    img.style.objectFit = "cover"


    imgDiv.appendChild(img);
    return imgDiv;
}

function plusClickHandler(id){
    const img = document.querySelector(`[data-imgid=${id}]`);
    let closeButton = document.getElementById("tcCloseButton")

    gsap.to(img, {
        duration: 0.3, // Duration of each breath cycle (in seconds)
        left: "0%", // Scale up by 20% (1.0 is normal size)
        ease: "power1.inOut" // Easing function for smooth animation
    });

    const closeAnimation = gsap.to(closeButton, {
        duration: 1, // Duration of each breath cycle (in seconds)
        scale: 1,
        ease: "elastic.out(1, 0.3)" // Easing function for smooth animation
    });

    closeAnimation.play()
}

function createImageDiv(url) {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("box")
    imgDiv.style.cssText = "height: 100%; width: 100%; pointer-events : none";
    imgDiv.style.position = "absolute"
    imgDiv.style.left = "100%"
    imgDiv.style.top = "0px"
    imgDiv.style.zIndex = "999"
    imgDiv.style.objectFit = "cover"

    const img = new Image();
    img.src = url;
    img.style.cssText = "height: 100%; width: 100%;";

    imgDiv.appendChild(img);
    return imgDiv;
}


function loadJavaScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}
