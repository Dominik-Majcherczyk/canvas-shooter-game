const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

//PLAYER
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

//PROJECTILE
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//ENEMY
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//REST
const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");

const projectiles = [];
const enemies = [];

function spwawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;
    //change to Math.random() * canvas.width for fully random

    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = "green";
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 300);
}

let animationId;
function animate() {
  //requestAnimationFrame is returning actual frame
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.draw();
    projectile.update();
    //remove projectiles after screen edges
    if (projectile.x - projectile.radius < 0) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });
  enemies.forEach((enemy, index) => {
    enemy.draw();
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    //end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      //when touch; set timeout is important coz of flashing objects after remove from array
      if (dist - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          enemies.splice(index, 1);
          projectiles.splice(projectileIndex, 1);
        }, 0);
      }
    });
  });
}

window.addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
spwawnEnemies();
