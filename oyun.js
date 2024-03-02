const c = document.createElement("canvas");
c.width = window.innerWidth; /* pncereın iç enine ayarladım */
c.height = window.innerHeight;
document.body.appendChild(c); /* canvası bodye ekledım */
/* canvasın icine 2b cizim yapmak istedigin zaman context kullanılır */
let ctx = c.getContext("2d");
/* ************************** */
let pts =[];
while(pts.length < 254){
    while(pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val);
}
console.table(pts);
pts.push(pts[0]);


/* a pts x ile gelen deger bu  degeri b degeri t adımı  */
let lerp = (a,b,t) => a + (b-a) * (1 - Math.cos(t * Math.PI))/2;

/* daraltma yapcaz */
let noise = x => {
    x = x * 0.01 %254; 
    return lerp( pts[Math.floor(x)],pts[Math.ceil(x)], x - Math.floor(x));
}


/* value rastgele oldu ama indis lerı 1 den 254 e kadar sıralı*/
/********* *//*  yukarıda rastgele degerlerden olusan bir array yaptık  */

const bgcolor ="#0001"; /* siyah */
const forecolor = "#00ffff"; /* cyan */   
const linecolor = "#2f2519";/* koyu gri */
const lineWidth = 5; 
const offset = -10; /* ekranın dısına cızıcez fıll */
let t = 0; /* zamanımız ya da adımımız bu */
var speed = 0;   /* 0 ile 1 arasında asla 1 olamayan bir rakam olsun istiyorum */
 

let player = new function(){
    this.x = c.width / 2;  /* x koordinati */
    this.y = 50;
    this.truck = new Image();
    this.truck.src = "t.jpg";

    this.draw = function(){
        /* image kaynagı , koordinat olarak nereye çiziceksin eni boyu kac olucak   */
        ctx.drawImage(this.truck,this.x,this.y,80,80);
    }


}

//çizim
function draw() {
    speed -= (speed -1 ) * 0.01;
    console.log(speed);
    t+= 5 * speed;  /* 5 15 kuralı gibi hızlanıyo */
    /* contexti doldurmadan once rengi vermek zorundayız */
    /* ********************************* */
ctx.fillStyle = bgcolor;
ctx.fillRect(0,0,c.width,c.height); /* nereye yaplcanı soyluyoruz */
/* *********************************************** */
/* ********************************************************************************************************************** zeminim burası */
ctx.fillStyle = forecolor;
ctx.strokeStyle = linecolor;
ctx.lineWidth = lineWidth;
ctx.beginPath();
/* cizgi lineTo ile ciziliyo nerden ciziliceni demiyo ama  */
ctx.moveTo(offset, c.height - offset); /* buraya git  */
for(let i =offset; i<c.width-offset-offset; ++i){
    ctx.lineTo(i,c.height * .9 - noise(i+t) * .4); /*rastgele cizgi cizdi buraya kadar cızgı cek */ /* enine çizgiyi cektıgım kısım */
ctx.lineTo(c.width-offset,c.height-offset);
ctx.closePath();
/* 21 22 23 yapması için doldurması lazım dolduralım hadi */
ctx.fill();  /* içini gri yapan bu  */
ctx.stroke();  /* kalınlastır cızgıyı gorelim */
/* ***************************************************************************************************************************zemin fini */
 // Sonraki frame'i iste
requestAnimationFrame(draw);
} 

draw();

