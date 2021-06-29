const canvas = document.querySelector("canvas");
const scoreEl = document.querySelector("#score");
const startGameBtn = document.querySelector("#startGameBtn");
const gameMenu = document.querySelector("#gameMenu");
const scoreMenu = document.querySelector("#scoreMenu");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.cursor = "none";

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#eb4634";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 0;
    ctx.fill();
  }
  update() {
    this.draw();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.color = "#eb7d34";
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#eb7d34";
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw();
  }
}

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
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    if (score > 500) {
      this.x = this.x + this.velocity.x + 1;
      this.y = this.y + this.velocity.y + 1;
    }
    if (score > 1000) {
      this.x = this.x + this.velocity.x + 2;
      this.y = this.y + this.velocity.y + 2;
    }
    if (score > 1500) {
      this.x = this.x + this.velocity.x + 3;
      this.y = this.y + this.velocity.y + 3;
    }
    if (score > 2000) {
      this.x = this.x + this.velocity.x + 4;
      this.y = this.y + this.velocity.y + 4;
    }
    if (score > 2500) {
      this.x = this.x + this.velocity.x + 5;
      this.y = this.y + this.velocity.y + 5;
    }
    if (score > 3000) {
      this.x = this.x + this.velocity.x + 6;
      this.y = this.y + this.velocity.y + 6;
    }
  }
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

//IMPLEMENTATION
const mouse = {
  x: innerWidth / 2,
  y: innerHeight - 100,
};
const friction = 0.99;
const x = canvas.width / 2;
const y = canvas.height / 2;
let player = new Player(x, y, 15);
let projectiles;
let enemies;
let particles;
let animationId;
let score = 0;
const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");
let backgroundStars;

function init() {
  backgroundStars = [];
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, "#E3EAEF"));
  }
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  scoreMenu.innerHTML = score;
}

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

    const color = "#fff";
    const angle = Math.atan2(canvas.height, canvas.width);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 300);
}

//ANIMATION LOOP
function animate() {
  //requestAnimationFrame is returning actual frame
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  backgroundStars.forEach((backgroundStar) => {
    backgroundStar.draw();
  });

  player.draw();
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update();
    //remove projectiles after screen edges
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });
  enemies.forEach((enemy, index) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    //end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      gameMenu.style.display = "flex";
      scoreMenu.innerHTML = score;
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      //when touch; set timeout is important coz of flashing objects after remove from array
      if (dist - enemy.radius - projectile.radius < 1) {
        //creating particles
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              }
            )
          );
        }

        if (enemy.radius - 10 > 10) {
          //increase score
          score += 10;
          scoreEl.innerHTML = score;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          //increase score for bigger enemy
          score += 20;
          scoreEl.innerHTML = score;
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
  //ship mouse following, mouse coords = ship coords
  player.x = mouse.x;
  player.y = mouse.y;
  player.update();
}

//update player position with mousemove
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: 0,
    y: -9,
  };

  projectiles.push(new Projectile(player.x, player.y, 5, "#17d637", velocity));
});

startGameBtn.addEventListener("click", () => {
  init();
  animate();
  spwawnEnemies();
  gameMenu.style.display = "none";
});
