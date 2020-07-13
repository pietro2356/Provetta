import { CST } from "./CST";
export class PlayScene extends Phaser.Scene {
	
	constructor(){
		super({ key: CST.SCENES.PLAY});
	}
}
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// funziona di precaricamento
async function preload() {
    game.load.image('ship', 'Assets/starship.jpg');
	game.load.image('laser', 'Assets/laser.png');
    game.load.image('enemy', 'Assets/enemy.png');

	// carico l'esplosione. Dimensioni 256x256 18 frames
    game.load.spritesheet('explosion', 'Assets/explosion.png', 1024/4,1024/4,16);

	// carico gli effetti sonori
    game.load.audio('laser', 'Assets/laser.mp3');
    //game.load.audio('boom', 'Assets/boom.mp3'); FILE NON TROVATO.
}

var sprite;
var enemies;

function enemyCollisionHandler (bullet, enemy) {
    bullet.kill();
    enemy.kill();
	explode(enemy.x, enemy.y);
	updateScore(100);
}

function explode(x,y){
    var explosion = game.add.sprite(x, y, 'explosion');
    // l'esplosione viene centrata sui punti x e y, impostiamo quindi l'ancoraggio dello sprite al centro orizzontale e verticale (0.5)
    explosion.anchor.setTo(0.5, 0.5);
    var walk = explosion.animations.add('explode'); // prende tutti i frame disponibili in quanto non abbiamo specificato parametri
    explosion.animations.play('explode', 30, false);
	//boom.play();
}

function shipCollisionHandler (ship, enemy) {
	
	points = 0;
	updateScore = 0;
    ship.kill();
    enemy.kill();
	explode(enemy.x, enemy.y);
	explode(ship.x, ship.y);
	
	
}

function createEnemies(){

	// velocità di movimento dei nemici
	speed = 40;
	// creiamo il gruppo dei nemici	
	enemies = game.add.group();
	// su tutto il gruppo dei nemici abilitiamo la fisica.
	enemies.enableBody = true;

	// ciclo per righe e colonne per fare una griglia di nemici
	var yadd = 9;
	for (var y = 0; y < 6; y++){
		for (var x = 0; x < 10; x++){
			// yadd serve per alternare le altezze sulla singola riga: vengono quindi sfasati uno
			// si potrebbe gestire in modo più elegante con l'operatore "%"
			yadd = yadd * -1;

			// aggiungo un nemico al gruppo.
	    	var enemy = enemies.create(60* x, 60*y +yadd , 'enemy');
			// le coordinate dei nemici puntano al centro del nemico, a metà ossia 0.5 sia in orizzontale che in verticale
			enemy.anchor.setTo(0.1, 0.1);
	    	// inizialmente viaggiano tutti verso destra
	    	enemy.body.velocity.x = speed;

	    	}
		}
		
    }

// avvio del gioco
function create() {

	laser = game.add.audio('laser');
	//boom = game.add.audio('boom');


	// creiamo l'astronave guidata dal giocatore
	sprite = this.add.sprite(400, 500, 'ship');
    sprite.anchor.setTo(0.5, 0);
	createEnemies();

	// creiamo l'arma dell'astronave principale
	weapon = game.add.weapon(30, 'laser');
	// quando i proiettili escono dallo schermo saranno rimossi
	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	// proiettili ruotati verso l'alto (90 gradi)
	weapon.bulletAngleOffset = 90;
	// velocità dei proiettili
    weapon.bulletSpeed = 400;


    weapon.bulletAngleVariance = 10;
	// i proiettili partono dalle coordinate dell'astronave, che è gia centrata
	weapon.trackSprite(sprite, 0, 0);
    // i proiettili devono essere considerati nelle collisioni
    weapon.bullets.enableBody = true;
    weapon.fireRate = 100; 
	
    game.physics.arcade.enable(sprite);
	cursors = this.input.keyboard.createCursorKeys();
	fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	//creazione variabile punti
	points = 0;
	//set stile label
	var style = { font: "32px Arial", fill: "#ffff00"};
	//create label il pos 20X20
	scoreLabel = game.add.text(20,20, "Score: 0", style);
	

}


// ciclo del gioco
function update() {

	// gestiamo le collisioni tra i proiettili ed i nemici
    game.physics.arcade.collide(weapon.bullets,  enemies, enemyCollisionHandler, null, null);
    // gestiamo le collisioni tra i nemici e l'astronave del giocatore
    game.physics.arcade.collide(sprite,  enemies, shipCollisionHandler, null, null);

	sprite.body.velocity.x = 0;
	sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }


    if (fireButton.isDown)
    {
        weapon.fire();

   		// lanciamo il suono del laser, ma solo se non sta gia suonando
   		// altrimenti si resetterebbe continuamente
	    if (!laser.isPlaying) {
	        laser.play();
	    }

    }



	// per ciascuno sprite vivo appartenente al gruppo "enemies"
	enemies.forEachAlive(function (enemy) {

		// se si trova troppo a destra
		// imposta la velocità in modo che vada a sinistra		
		if (enemy.x >650){
			enemy.body.velocity.x = -speed; 
			}
		// se lo sprite si trova troppo a sinistra 
		// imposta la velocità in modo che vada a destra		
		if (enemy.x <50){
			enemy.body.velocity.x = speed;
			}
		});
	

}

function updateScore(addPoints){
	points = points + addPoints;
	scoreLabel.text = "Score: "+points;
}






