const c = document.createElement("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
document.body.appendChild(c);

let ctx = c.getContext("2d");

let pts = [];
while (pts.length < 254) {
    let val;
    while (pts.includes(val = Math.floor(Math.random() * 255)));
    pts.push(val);
}
console.table(pts);
pts.push(pts[0]);

let lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;

let noise = x => {
    x = x * 0.01 % 254;
    return lerp(pts[Math.floor(x)], pts[Math.ceil(x) % 254], x - Math.floor(x));
}

const bgcolor = "#0001";
const forecolor = "#00ffff";
const linecolor = "#2f2519";
const lineWidth = 5;
const offset = -10;
let t = 0;
let speed = 0;

let player = new function () {
    this.x = c.width / 2;
    this.y = 50;
    this.truck = new Image();
    this.truck.src = "t.jpg";

    this.truck.onload = () => {
        this.draw();
    };

    this.draw = () => {
        ctx.drawImage(this.truck, this.x, this.y, 80, 80);
    }

    this.update = () => {
        this.x += speed;  // Update the player's x position based on the speed
        if (this.x > c.width) {
            this.x = -80; // Reset player position when it goes off screen
        }
    }
}

function draw() {
    speed -= (speed - 1) * 0.01;
    console.log(speed);
    t += 5 * speed;

    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = forecolor;
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(offset, c.height - offset);

    for (let i = offset; i < c.width - offset - offset; ++i) {
        ctx.lineTo(i, c.height * .9 - noise(i + t) * .4);
    }

    ctx.lineTo(c.width - offset, c.height - offset);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    player.update(); // Update player position
    player.draw();   // Draw the player

    requestAnimationFrame(draw);
}

draw();
