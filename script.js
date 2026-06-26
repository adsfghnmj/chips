// ==========================
// CHIPS V3
// ==========================

// Chips Follow Mouse

const chips = document.getElementById("chips");

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX-window.innerWidth/2)/25;

    const y=(e.clientY-window.innerHeight/2)/25;

    chips.style.transform=
    `rotateY(${x}deg)
     rotateX(${-y}deg)
     translate(${x}px,${y}px)`;

});

// ==========================
// Mouse Light

const light=document.querySelector(".mouse-light");

document.addEventListener("mousemove",(e)=>{

    light.style.left=e.clientX+"px";

    light.style.top=e.clientY+"px";

});

// ==========================
// Navbar Blur

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.style.background="rgba(15,15,15,.65)";

        navbar.style.backdropFilter="blur(30px)";

    }

    else{

        navbar.style.background="rgba(255,255,255,.08)";

        navbar.style.backdropFilter="blur(20px)";

    }

});

// ==========================
// Fade In Sections

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

sections.forEach(section=>{

section.style.opacity="0";

section.style.transform="translateY(60px)";

section.style.transition=".8s";

observer.observe(section);

});

// ==========================
// Buttons Hover

document.querySelectorAll(".glass-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-6px) scale(1.03)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0) scale(1)";

});

});

// ==========================
// Hero Animation

window.onload=()=>{

document.querySelector(".hero").animate([

{

opacity:0,

transform:"translateY(50px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:1000,

fill:"forwards"

});

};
// ==========================
// Mobile Menu
// ==========================

const menu=document.querySelector(".menu-toggle");

const nav=document.querySelector("nav");

menu.onclick=()=>{

nav.classList.toggle("active");

};