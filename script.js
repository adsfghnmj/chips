// -------------------------------
// CHIPS V2
// -------------------------------

const chips = document.getElementById("chips");
const mouseLight = document.querySelector(".mouse-light");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// ---------- Canvas ----------

function resizeCanvas(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

// ---------- Mouse ----------

let mouse = {

x:window.innerWidth/2,
y:window.innerHeight/2

};

let target = {

x:0,
y:0

};

let current = {

x:0,
y:0

};

document.addEventListener("mousemove",(e)=>{

mouse.x=e.clientX;
mouse.y=e.clientY;

mouseLight.style.left=e.clientX+"px";
mouseLight.style.top=e.clientY+"px";

const centerX=window.innerWidth/2;
const centerY=window.innerHeight/2;

target.x=(e.clientX-centerX)/centerX;
target.y=(e.clientY-centerY)/centerY;

});

// ---------- Chips Animation ----------

function animateChips(){

current.x+=(target.x-current.x)*0.08;
current.y+=(target.y-current.y)*0.08;

const moveX=current.x*30;
const moveY=current.y*30;

const rotateY=current.x*18;
const rotateX=current.y*-18;

chips.style.transform=`

translate(${moveX}px,${moveY}px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

`;

requestAnimationFrame(animateChips);

}

animateChips();

// ---------- Particles ----------

const particles=[];

for(let i=0;i<55;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

vx:(Math.random()-.5)*0.3,

vy:(Math.random()-.5)*0.3,

a:Math.random()

});

}

function drawParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;

if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle=`rgba(255,190,80,${p.a*0.35})`;

ctx.fill();

});

requestAnimationFrame(drawParticles);

}

drawParticles();

// ---------- Leave ----------

document.addEventListener("mouseleave",()=>{

target.x=0;
target.y=0;

});