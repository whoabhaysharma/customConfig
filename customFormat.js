(function (){
    if(!window?.TC_YAAS){
        window.TC_YAAS = {}
    }

    if(!window?.TC_YAAS?.customFormat){
        window.TC_YAAS.customFormat = {}
    }

    window.TC_YAAS.customFormat.setup = (config, slot)=>{
        // sample config
        let data = {
            baseurl : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
            expandable : [
                {
                    url : "https://via.placeholder.com/200x400/32a852",
                    pos : [10,30]
                },
                {
                    url : "https://via.placeholder.com/200x400/9e3426",
                    pos : [40,50]
                },
                {
                    url : "https://via.placeholder.com/200x400/87503e",
                    pos : [20,30]
                },
                {
                    url : "https://via.placeholder.com/200x400/9e4426",
                    pos : [10,30]
                },
                {
                    url : "https://via.placeholder.com/200x400/32a852",
                    pos : [40,90]
                }
            ]
        }
        createAdArea(config, slot)
        loadJavaScript("https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js", afterScriptLoad)
    }
}())

function afterScriptLoad(){
    gsap.to(".plus", {
        duration: 1, // Duration of each breath cycle (in seconds)
        scale: 0.7, // Scale up by 20% (1.0 is normal size)
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
    imgDiv.addEventListener("click", clickHandler(config?.cta))
    container.appendChild(imgDiv)
    container.appendChild(closeButton)

    expandable.forEach((item, index)=>{
        const imgDiv = createImageDiv(item, `expImg${index + 1}`)
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
    imgDiv.style.transform = 'scale(0) translate(-50%, -50%)';

    const img = new Image();
    img.src = "https://media-b.performoo.com/assets/af/img/icons/custom/close-btn.png";
    img.style.cssText = "height: 100%; width: 100%;";

    imgDiv.appendChild(img);
    return imgDiv;
}

function clickHandler(cta = ""){
    window.open(cta, "_blank")
}

function closeClickHandler() {
    const imgDiv = document.querySelector(".tc_custom_box")
    imgDiv.style.display = "block"
    let closeButton = document.getElementById("tcCloseButton");
    const img = document.querySelectorAll(`[data-imgid]`);

    gsap.to(img, {
        duration: 0.5,
        left: "100%",
        ease: "back.in(1.7)",
        stagger: 0.07,
        delay: 0, // Delay the start of the img element animation by 0.2 seconds
    });

    gsap.to(closeButton, {
        duration: 0.5,
        scale: 0,
        ease: "back.in(1.7)",
        delay: 0, // Delay the start of the closeButton animation by 0.2 seconds
    });
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
    imgDiv.style.cssText = "height: 100%; width: 100%; pointer-events : auto;"
    imgDiv.classList.add("baseImg")

    const img = new Image();
    img.src = url;
    img.style.cssText = "height: 100%; width: 100%; pointer-events : none;"
    img.style.objectFit = "cover"


    imgDiv.appendChild(img);
    return imgDiv;
}

function plusClickHandler(id){
    const imgDiv = document.querySelector(".tc_custom_box")
    imgDiv.style.display = "block"
    const img = document.querySelectorAll(`[data-imgid=${id}]`);
    let closeButton = document.getElementById("tcCloseButton")

    gsap.to(".plus", {
        duration: 0.3, // Duration of each breath cycle (in seconds)
        scale: 0, // Scale up by 20% (1.0 is normal size)
        ease: "back.out(1.7)", // Easing function for smooth animation,
        stagger : 0.07
    });

    gsap.to(img, {
        duration: 0.5, // Duration of each breath cycle (in seconds)
        left: "0%", // Scale up by 20% (1.0 is normal size)
        ease: "back.out(1.7)", // Easing function for smooth animation,
        stagger : 0.07
    });

    const closeAnimation = gsap.to(closeButton, {
        duration: 0.5, // Duration of each breath cycle (in seconds)
        scale: 0.7,
        x: "-50%", // Translate on the x-axis
        y: "-50%", // Translate on the y-axis
        ease: "elastic.out(1, 0.6)" // Easing function for smooth animation
    });
    closeAnimation.play()
}

function createImageDiv(item, dataAttribute) {
    const {url="", cta=""} = item
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("tc_custom_box");
    imgDiv.style.cssText = "height: 100%; width: 100%; pointer-events: none; position: absolute; left: 0; top: 0; zIndex: 99999;";
    imgDiv.style.zIndex = "999"

    const img = new Image();
    img.src = url;
    img.style.cssText = "height: 100%; width: 100%; object-fit: cover; margin: 0; padding: 0;";
    img.style.objectFit = "cover"

    img.onload = function () {
        const sliceHeight = imgDiv.clientHeight / 5; // Calculate the height of each slice
        const rows = 5; // Number of rows

        for (let y = 0; y < rows; y++) {
            const sliceDiv = document.createElement('div');
            sliceDiv.setAttribute("data-imgid", dataAttribute)
            sliceDiv.style.width = "100%";
            sliceDiv.style.position = "absolute";
            sliceDiv.style.top = y * sliceHeight + "px";
            sliceDiv.style.left = "100%"
            sliceDiv.style.height = sliceHeight + "px";
            sliceDiv.style.backgroundImage = `url(${url})`;
            sliceDiv.style.backgroundPosition = `0px ${-y * sliceHeight}px`;
            sliceDiv.style.backgroundSize = "auto";
            sliceDiv.style.clip = `rect(${y * sliceHeight}px, 100%, ${(y + 1) * sliceHeight}px, 0)`;
            sliceDiv.addEventListener("click", clickHandler(cta))
            imgDiv.appendChild(sliceDiv);
        }

    };
    return imgDiv
}

function loadJavaScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}
