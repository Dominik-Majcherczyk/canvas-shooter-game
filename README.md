# Canvas start-shooter game


## struktura aplikacji

### Klasy

Aplikacja posiada trzy główne klasy jakimi są:

- Player - obiekt odpowiadający za gracza
- Enemy - na jego podstawie są generowani przeciwnicy - spadające gwiazdy
- Projectile - pociski gracza
- Particle - odłamki powstałe w wyniku kolizji posicku i przeciwnika
- Star - gwiazdy tworzące tło

# struktura aplikacji
sekcja klas
```js
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
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
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
```
## struktura klas

Każdy z obiektów posiada swoje właściwości oraz dwie metody  - draw() oraz update()

Metoda draw służy do 'narysowania' czyli stworzenia obiektu (kształtu) w elemencie canvas, w naszym przypadku wszsystkie obiekty są okręgami dlatego każdy obiekt
jest tworzony w opraciu o metodę arc(x, y, promień, kąt rozpoczęcia, kąt zakończenia). Opcjonalnie w niektórych klasach pojawia się metoda shadowblur() 
towrząca poświatę wokół obiektu. Dodatkowo w klasie Particle pojawia się współczynnik alfa który służy do zanikania obiektów.

Metoda update() jest wywoływana w każdej pojedynczej klatce renderu elementu canvas. Jej głównym zastosowaniem jest wywoływanie metody draw()
i zmiana parametrów pozycji w oparciu o wartość velocity (prędkość, im wyższa wartość velocity tym 'szybciej' będzie się poruszać obiekt) klasy tak aby stworzyć animacje ruchu.
KLasy Player oraz Star nie posiadają zmiany wartości velocity, ponieważ instancja klasy Player zawszę podąża za kursorem muszy, a instacje klasy Star to statyczne obiekty tworzące tło.

## tworzenie gracza oraz aktualizacja pozycji


```js
let player = new Player(x, y, 15);
```

Tworzenie instacji gracza znajduje się w segmencie inicjacji zmiennych, stałych oraz obiektów.
Gracza tworzymy poprzez podanie współrzędnych x, y oraz promienia określającego jego wielkość.

Gracz porusza się za kursorem myszy, aby było to możliwe wewnątrz funcji animate() jego współrzędne są podmieniane na współrzędne kursora myszy oraz jest wywoływana metoda update() aby narysować gracza w nowej pozycji

```js
player.x = mouse.x;
player.y = mouse.y;
player.update();
```

## tworzenie przeciwników

tworzenie przeciwników odbywa się wewnątrz funcji spawnEnemies()

```js
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
```
każdy nowy przeciwnik jest zapisywany do tablicy enemies co 300ms. Promień każdego przeciwnika jest losowy w wyznaczonym minimum oraz maksimum. Pozycja jest również losowa, istotnym jednak jest określenia aby była poza obszarem widzenia (dlatego dodajemy i odejmujemy promień).

## tworzenie pocisków

```js
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
```
Pociski są tworzone w momencie eventu kliknięcia myszy. Każdy pocisk jest zapisywany do tablicy z której jest usuwany po wykryciu kolicji z przeciwnikiem. Kazdy pocik jest tworzony w aktualnych współrzędnych gracza.

## kolizje

Kolizje możemy podzielić na dwa rodzaje: pocisk-przeciwnik, gracz-przeciwnik

### pocisk-przeciwnik

```js
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
```

Odległość pomiędzy pociskiem i przeciwnikiem jest obliczana za pomocą metody hypot (twierdzenie pitagorasa) 
W momencie kiedy dystans wyniesie 0, tworzone są particle (odłamki), pocisk jest usuwany z tablicy, oraz dodawany jest wynik - score w zależności od wielkości trafionego przeciwnika.

#### Tworzenie odłamków

```js
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
```

odłamki tworzone w trakcie kolizji posiadają losową wielkość oraz kierunek, za współrzędne przyjmuje się współrzędne pocisku.

### gracz-przeciwnik

```js
  const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    //end game
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationId);
      gameMenu.style.display = "flex";
      scoreMenu.innerHTML = score;
    }
```
Odległość pomiędzy graczem i przeciwnikiem jest obliczana dokładnie tak samo jak pocisk-przeciwnik. W momencie kolizji jest anulowana klatka animacji oraz wyświetlone zostaje wcześniej ukryte menu gry z wynikiem.


## tło

tło jest stworzone za pomocą gradientu


```js
const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");
```

oraz gwiazd stworzonych w oparciu o klasę Star

```js
backgroundStars = [];
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, "#E3EAEF"));
  }
```

## punkty

punkty są dodawane za każdym razem kiedy pocisk dotknie gracza, w zależności od promienia jest przyznawana inna ilość punktów.

```js
  if (enemy.radius - 10 > 10) {
          //increase score
          score += 10;
          scoreEl.innerHTML = score;
          ...
        } else {
          //increase score for bigger enemy
          score += 20;
          scoreEl.innerHTML = score;
          ...
        }
```
