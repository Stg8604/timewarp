import { store } from "@stores/index";
import { TutorialPlayer } from "../sprites/TutorialPlayer";
import {
	setEnemyCoords,
	setLevel,
	setTurretCoords,
	toggleInfoBox,
} from "@slices/Traps/traps";
import { completePuzzle, encodedFlag } from "@slices/Traps/trapsAction";
import { PuzzleIds } from "@utils/PuzzleIds/puzzleId";
import { CommonCollectables } from "@sprites/CommonCollectables";

class Turret {
	scene: Phaser.Scene;
	x: number;
	y: number;
	bullets: Phaser.Physics.Arcade.Group;
	gun: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	active: boolean;
	initialAngle: number;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		base: string,
		gun: string,
		bullets: Phaser.Physics.Arcade.Group,
		initialAngle: number
	) {
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.active = true;
		this.bullets = bullets;
		this.initialAngle = initialAngle;
		this.scene.physics.add.sprite(x, y, base).setScale(0.2).setImmovable(true);
		this.gun = this.scene.physics.add
			.sprite(x, y, gun)
			.setScale(0.2)
			.setRotation(initialAngle + Math.PI / 2)
			.setImmovable(true);
	}

	shoot(angle: number) {
		angle = angle * (Math.PI / 180);
		this.gun.setRotation(angle + Math.PI / 2);
		const bullet = this.bullets.get(this.x, this.y, "bullet");
		bullet.setVelocityX(350 * Math.cos(angle));
		bullet.setVelocityY(350 * Math.sin(angle));
		bullet.setScale(0.2);
		bullet.setRotation(angle + Math.PI);
	}
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
	health: number;
	index: number;
	alive: boolean = true;
	dir = 1;
	destinations: { x: number; y: number }[] = [];
	speed: number;

	constructor(
		index: number,
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		health: number,
		frames: number[],
		frameRate: number,
		bullets: Phaser.Physics.Arcade.Group,
		speed: number
	) {
		super(scene, x, y, texture);
		this.index = index;
		this.health = health;
		this.scene.add.existing(this);
		this.speed = speed;
		this.anims.create({
			key: "anim",
			frames: this.anims.generateFrameNumbers(texture, {
				frames: frames,
			}),
			frameRate: frameRate,
			repeat: -1,
		});
		this.anims.play("anim", true);
		this.scene.physics.add.overlap(bullets, this, (obj1, obj2) => {
			this.handleShoot();
			obj2.destroy();
		});
	}

	handleShoot() {
		this.health -= 25;
		if (this.health < 0) {
			this.destroy();
			this.alive = false;
		}
	}
}

export class TrapsScene extends Phaser.Scene {
	walls: Phaser.Tilemaps.TilemapLayer | undefined;
	level2Block: Phaser.GameObjects.Rectangle | undefined;
	blockLocation = { x: 847, y: 400 };
	constructor() {
		super({ key: "Turret DefenceScene" });
	}

	player: TutorialPlayer | undefined;
	enemies: Enemy[] = [];
	bullets: Phaser.Physics.Arcade.Group | undefined;
	resitrictionsRange = { fromx: 980, tox: 1320, fromy: 690, toy: 780 };
	initStage2 = false;
	waveConfig = [
		{ enemies: 2, speedRange: [0.05, 0.1] },
		{ enemies: 5, speedRange: [0.1, 0.15] },
		{ enemies: 10, speedRange: [0.15, 0.2] },
		{ enemies: 20, speedRange: [0.2, 0.3] },
	];
	currentStage = 0;
	level1done = false;
	level2done = false;
	collectablesLoc: { x: number; y: number }[] = [
		{ x: 560, y: 225 },
		{ x: 225, y: 820 },
		{ x: 1150, y: 890 },
	];

	preload() {
		this.loadAllAssets();
		this.load.image("1", "assets/collectables/1.png");
		this.load.image("2", "assets/collectables/2.png");
		this.load.image("3", "assets/collectables/3.png");
	}

	create() {
		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});
		this.createMapAndPlayer();
		this.addStageOneEnemies();

		const turrets = {
			tutorialTurret: new Turret(
				this,
				495,
				370,
				"turretBase",
				"turret1",
				this.bullets,
				0
			),
			challengeTurret1: new Turret(
				this,
				1010,
				430,
				"turretBase",
				"turret1",
				this.bullets,
				Math.PI / 2
			),
			challengeTurret2: new Turret(
				this,
				1300,
				430,
				"turretBase",
				"turret1",
				this.bullets,
				Math.PI / 2
			),
		};

		store.dispatch(
			setTurretCoords([
				{
					id: "tutorialTurret",
					x: turrets.tutorialTurret.x,
					y: turrets.tutorialTurret.y,
				},
				{
					id: "challengeTurret1",
					x: turrets.challengeTurret1.x,
					y: turrets.challengeTurret1.y,
				},
				{
					id: "challengeTurret2",
					x: turrets.challengeTurret2.x,
					y: turrets.challengeTurret2.y,
				},
			])
		);
		this.level2Block = this.physics.scene.add.rectangle(
			this.blockLocation.x,
			this.blockLocation.y,
			32,
			32,
			0x000000
		);
		this.physics.add.existing(this.level2Block, true);
		this.physics.add.collider(this.player!, this.level2Block!, () => {
			if (!store.getState().traps.infoBox[3]) {
				store.dispatch(toggleInfoBox(3));
			}
		});
		this.physics.add.collider(this.player!, this.walls!);
		this.physics.add.collider(this.player!, turrets.tutorialTurret.gun);
		this.physics.add.collider(this.player!, turrets.challengeTurret1.gun);
		this.physics.add.collider(this.player!, turrets.challengeTurret2.gun);

		store.subscribe(() => {
			const state = store.getState();
			Object.keys(state.traps.shoot).forEach((turretID) => {
				const angle =
					state.traps.shoot[turretID as keyof typeof state.traps.shoot];
				const currentTurret =
					turrets[turretID as keyof typeof state.traps.shoot];

				if (
					angle !== undefined &&
					currentTurret.active &&
					!Number.isNaN(angle)
				) {
					currentTurret.shoot(angle);
					currentTurret.active = false;
					this.time.delayedCall(500, () => (currentTurret.active = true));
				}
			});
			if (state.traps.level === 2) {
				if (!this.initStage2) {
					this.initStage2 = true;
				}
			}
		});

		new CommonCollectables(
			this,
			this.collectablesLoc,
			1,
			PuzzleIds.TRAPS_PUZZLE,
			this.player!
		);
	}

	update() {
		this.dispatchEnemy();
		if (this.initStage2) {
			this.moveStageTwoEnemies();
		}

		if (this.player?.x && this.player.x > 845 && this.enemies.length === 0) {
			if (store.getState().traps.level === 1) {
				this.enemies = [];
				store.dispatch(toggleInfoBox(1));
				store.dispatch(setLevel(2));
			}
		}

		if (
			store.getState().traps.enemyCoords.length === 0 &&
			store.getState().traps.level === 1 &&
			!this.level1done
		) {
			store.dispatch(toggleInfoBox(0));
			this.level1done = true;
			this.level2Block?.destroy();
		}

		if (
			store.getState().traps.enemyCoords.length === 0 &&
			store.getState().traps.level === 2 &&
			!this.level2done &&
			this.level1done &&
			this.currentStage > this.waveConfig.length
		) {
			store.dispatch(encodedFlag())
			store.dispatch(toggleInfoBox(6))
			this.level2done = true;
		}
	}

	moveStageTwoEnemies() {
		if (this.enemies.length === 0) {
			this.addStageTwoEnemies();
			this.currentStage++;
		}
		if (this.enemies.length > 0) {
			this.enemies.forEach((enemy, index) => {
				const enemySpeed = enemy.speed;
				if (!enemy || !enemy.destinations.length) return;
				if (Math.random() < 0.006) {
					if (enemy.dir == 1) enemy.dir = 0;
					else enemy.dir = 1;
				}
				if (
					Math.abs(enemy.x - enemy.destinations[0].x) < 0.5 &&
					Math.abs(enemy.y - enemy.destinations[0].y) < 0.5
				) {
					enemy.destinations.shift();
				}
				if (enemy.destinations.length == 0) {
					return;
				}
				if (Math.abs(enemy.x - enemy.destinations[0].x) < 0.5) {
					enemy.dir = 0;
				} else if (Math.abs(enemy.y - enemy.destinations[0].y) < 0.5) {
					enemy.dir = 1;
				}
				if (enemy.dir == 1) {
					if (enemy.destinations[0].x < enemy.x) {
						enemy.setX(enemy.x + -enemySpeed);
					} else if (enemy.destinations[0].x > enemy.x) {
						enemy.setX(enemy.x + enemySpeed);
					} else {
						enemy.dir = 0;
					}
				} else {
					if (enemy.destinations[0].y < enemy.y) {
						enemy.setY(enemy.y + -enemySpeed);
					} else if (enemy.destinations[0].y > enemy.y) {
						enemy.setY(enemy.y + enemySpeed);
					} else {
						enemy.dir = enemySpeed;
					}
				}
			});
		}
	}

	addStageOneEnemies() {
		this.enemies.push(
			new Enemy(
				0,
				this,
				750,
				250,
				"enemy1",
				100,
				[0, 1, 2, 3],
				10,
				this.bullets!,
				0
			).setScale(1.5)
		);
		this.enemies.push(
			new Enemy(
				1,
				this,
				350,
				250,
				"enemy2",
				100,
				[0],
				10,
				this.bullets!,
				0
			).setScale(1.5)
		);
		this.enemies.push(
			new Enemy(
				2,
				this,
				750,
				500,
				"enemy1",
				100,
				[0, 1, 2, 3],
				10,
				this.bullets!,
				0
			).setScale(1.5)
		);
		this.enemies.push(
			new Enemy(
				3,
				this,
				350,
				500,
				"enemy3",
				100,
				[0, 1, 2, 3],
				10,
				this.bullets!,
				0
			).setScale(0.8)
		);
		const enemiesGroup = this.physics.add.group(this.enemies);
		this.physics.add.collider(enemiesGroup, enemiesGroup);
	}

	addStageTwoEnemies() {
		if (
			this.currentStage >= this.waveConfig.length &&
			this.enemies.length === 0
		) {
			return;
		}
		const enemyCount = this.waveConfig[this.currentStage].enemies;
		const speedRange = this.waveConfig[this.currentStage].speedRange;
		const speed =
			speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
		for (let i = 0; i < enemyCount; i++) {
			const x = i % 2 === 0 ? 1050 + 20 * i : 1350 - 20 * i;
			const enemy = new Enemy(
				i,
				this,
				x,
				1000,
				"enemy1",
				100,
				[0, 1, 2, 3],
				10,
				this.bullets!,
				speed
			).setScale(1.5);
			if (i < enemyCount / 2) {
				enemy.destinations = [
					{ x: Math.random() * (1155 - 950) + 950 + 20 * i, y: 430 },
				];
			} else {
				enemy.destinations = [
					{ x: Math.random() * (1350 - 1155) + 950 + 20 * i, y: 430 },
				];
			}
			this.enemies.push(enemy);
			this.resitrictionsRange = { fromx: 980, tox: 1320, fromy: 690, toy: 780 };
		}
		const enemiesGroup = this.physics.add.group(this.enemies);
		this.physics.add.collider(enemiesGroup, this.walls!);
	}

	dispatchEnemy() {
		this.enemies = this.enemies.filter((enemy) => {
			return enemy.alive;
		});
		const enemyCoords: { x: number; y: number }[] = [];
		this.enemies.forEach((enemy) => {
			enemyCoords.push({ x: enemy.x, y: enemy.y });
			if (enemy.x > 845 && enemy.y < 440) {
				this.resetLevel2();
			}
		});
		store.dispatch(setEnemyCoords(enemyCoords));
	}

	resetLevel2() {
		if (this.enemies.length > 0) {
			this.enemies.forEach((enemy) => {
				enemy.destroy();
			});
			this.enemies = [];
			this.currentStage = 0;
			store.dispatch(toggleInfoBox(2));
		}
	}

	loadAllAssets() {
		this.load.image("tileset", "assets/tutorial/tileset.png");
		this.load.image("Equip", "assets/Traps/Equip.png");
		this.load.image("Ground", "assets/Traps/Ground.png");
		this.load.image("Exterior", "assets/Traps/Exterior.png");
		this.load.image("Interior", "assets/Traps/Interior.png");
		this.load.image("Nature", "assets/Traps/Nature.png");
		this.load.image("Dungeon", "assets/Traps/Set 1.v2.png");
		this.load.image("Tiles", "assets/Traps/tiles.png");
		this.load.image("Walls", "assets/Traps/Walls.png");
		this.load.image("turretBase", "assets/td_basic_towers/PNG/Tower.png");
		this.load.image("turret1", "assets/td_basic_towers/PNG/Cannon.png");
		this.load.image(
			"turret2",
			"assets/td_basic_towers/PNG/Missile_Launcher.png"
		);
		this.load.tilemapTiledJSON("tilemap", "assets/Traps/traps.json");
		this.load.spritesheet("player", "assets/tutorial/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/tutorial/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerCloseUI",
			"assets/tutorial/playerCloseUI.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet("chest", "assets/tutorial/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
		});
		this.load.spritesheet("enemy1", "assets/Traps/enemy1.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("enemy2", "assets/Traps/enemy2.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("enemy3", "assets/Traps/enemy3.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"playerTakeGun",
			"assets/Player/TakeGun01/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			"playerShoot1",
			"assets/Player/ShootGun02/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.spritesheet(
			"playerShoot2",
			"assets/Player/Shoot01Gun01/spritesheet.png",
			{
				frameWidth: 64,
				frameHeight: 64,
			}
		);
		this.load.image("bullet", "assets/tutorial/trail.png");
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
	}

	createMapAndPlayer() {
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("tileset", "tileset");
		const layer2 = map.createLayer("Layer2", tileset!);
		const layer1 = map.createLayer("Layer1", tileset!);

		const baseTileSet = map.addTilesetImage("Ground", "Ground");
		const equip = map.addTilesetImage("Equip", "Equip");
		const Nature = map.addTilesetImage("Nature", "Nature");
		const exterior = map.addTilesetImage("Exterior", "Exterior");
		const baseDungeon = map.addTilesetImage("Set 1.v2", "Dungeon");
		const walls = map.addTilesetImage("Walls", "Walls");
		const interior = map.addTilesetImage("Interior", "Interior");
		map.createLayer("Tile Layer 1", baseTileSet!);
		map.createLayer("Tile Layer 2", baseDungeon!);
		map.createLayer("GroundDecor", baseDungeon!);
		map.createLayer("Nature", Nature!);
		map.createLayer("Exterior", exterior!);
		map.createLayer("Decor1", interior!);
		map.createLayer("Decor2", equip!);
		map.createLayer("Decor3", interior!);
		map.createLayer("HomeDecor", interior!);
		map.createLayer("Tile Layer 3", walls!);
		map.createLayer("Walls", walls!);
		const colliderLayer = map.createLayer("Collider", baseDungeon!);
		if (colliderLayer) {
			colliderLayer.setCollisionByProperty({ collides: true });
			this.walls = colliderLayer;
		}

		this.player = new TutorialPlayer(this, 400, 650, "player", 1.4,150);

		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer1!);
		map.setCollisionFromCollisionGroup(true, true, layer2!);

		const portal = this.physics.add.sprite(
			1400,
			430,
			"portal"
		);
		portal.setImmovable(true);
		portal.setSize(32, 32);

		// Portal animations
		portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		portal.anims.play("idle", true);

		// Collider callback between player and portal
		this.physics.add.collider(this.player, portal, () => {
			if (!store.getState().traps.infoBox[5]) {
				store.dispatch(toggleInfoBox(5));
			}
		});

		const camera = this.cameras.main.setZoom(2.5, 2.5);
		camera.startFollow(this.player, false, 0.5, 0.5);
	}
}
