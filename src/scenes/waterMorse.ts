import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import {
	toggleInfoBox,
	toggleWaterMorsePortal,
} from "@slices/WaterMorse/waterMorse";
import { PuzzleIds } from "@utils/PuzzleIds/puzzleId";
import { CommonCollectables } from "@sprites/CommonCollectables";

export class WaterMorseScene extends Phaser.Scene {
	constructor() {
		super({ key: "Nature's SoundScene" });
	}

	player: TutorialPlayer | undefined;
	chests: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
	chestStatus = [false];
	flagStarted: boolean = false;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	collectablesLoc: { x: number; y: number }[] = [
		{ x: 250, y: 460 },
		{ x: 660, y: 100 },
		{ x: 900, y: 650 },
	];

	preload() {
		this.loadAssets();
		this.load.image("bullet", "assets/tutorial/trail.png");
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
	}

	create() {
		this.createMapAndPlayer();

		this.sound.pauseOnBlur = false;
		const forest = this.sound.add("forest", { loop: true });
		const wind = this.sound.add("wind", { loop: true });
		const water = this.sound.add("water", { loop: true });
		const zero = this.sound.add("0", { loop: true });
		const one = this.sound.add("1", { loop: true });
		const two = this.sound.add("2", { loop: true });
		const three = this.sound.add("3", { loop: true });
		const four = this.sound.add("4", { loop: true });
		const flags = [zero, one, two, three, four];
		wind.volume = 0.6;
		forest.play();
		wind.play();
		water.play();

		if (store.getState().waterMorse.audioID !== -1) {
			flags[store.getState().waterMorse.audioID].play();
			flags[store.getState().waterMorse.audioID].volume = 0.1;
			this.flagStarted = true;
		}

		store.subscribe(() => {
			const params = store.getState().waterMorse.params;
			if (params.forest === "pause") forest.pause();
			else forest.resume();

			if (params.wind === "pause") wind.pause();
			else wind.resume();

			if (params.river === "pause") water.pause();
			else water.resume();

			if (!this.flagStarted && store.getState().waterMorse.audioID !== -1) {
				flags[store.getState().waterMorse.audioID].play();
				flags[store.getState().waterMorse.audioID].volume = 0.1;
				this.flagStarted = true;
			}

			const infoBox = store.getState().waterMorse.infoBox;
			infoBox.forEach((value, index) => {
				if (value && !this.chestStatus[index]) {
					this.chests[index]?.play("chest-open");
					this.chestStatus[index] = true;
				}

				if (!value && this.chestStatus[index]) {
					this.chests[index]?.play("chest-close");
					this.chestStatus[index] = false;
				}
			});
		});

		this.createCamera();

		new CommonCollectables(
			this,
			this.collectablesLoc,
			2,
			PuzzleIds.MORSE_AUDIO_PUZZLE,
			this.player!
		);
	}

	loadAssets() {
		this.load.image("base", "assets/waterMorse/base.png");
		this.load.image("waterNew", "assets/waterMorse/waterNew.png");
		this.load.image("props", "assets/waterMorse/props.png");
		this.load.tilemapTiledJSON("tilemap", "assets/waterMorse/newMap.json");
		this.load.audio("forest", "assets/waterMorse/sounds/bgForestNoise.mp3");
		this.load.audio("wind", "assets/waterMorse/sounds/bgWindNoise.mp3");
		this.load.audio("water", "assets/waterMorse/sounds/bgWaterNoise.mp3");
		this.load.audio("0", "assets/waterMorse/sounds/0.mp3");
		this.load.audio("1", "assets/waterMorse/sounds/1.mp3");
		this.load.audio("2", "assets/waterMorse/sounds/2.mp3");
		this.load.audio("3", "assets/waterMorse/sounds/3.mp3");
		this.load.audio("4", "assets/waterMorse/sounds/4.mp3");
		this.load.spritesheet("chest", "assets/tutorial/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
		});
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
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.image("1", "assets/collectables/1.png");
		this.load.image("2", "assets/collectables/2.png");
		this.load.image("3", "assets/collectables/3.png");
	}

	createMapAndPlayer() {
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset1 = map.addTilesetImage("base", "base");
		const tileset2 = map.addTilesetImage("waterNew", "waterNew");
		const tileset3 = map.addTilesetImage("props", "props");

		const tilesets = [tileset1!, tileset2!, tileset3!];

		const layer1 = map.createLayer("Layer1", tilesets);
		const layer2 = map.createLayer("Layer2", tilesets);

		this.player = new TutorialPlayer(this, 32 * 20 - 16, 32 * 5 - 16, "player");
		this.player.setScale(1.2);

		this.physics.add.collider(this.player!, layer1!);
		this.physics.add.collider(this.player!, layer2!);
		map.setCollisionFromCollisionGroup(true, true, layer1!);
		map.setCollisionFromCollisionGroup(true, true, layer2!);

		// Adding and configuring chest 1
		this.chests[0] = this.physics.add.sprite(
			32 * 10 - 16,
			32 * 10 - 16,
			"chest"
		);
		this.chests[0].setScale(1);
		this.chests[0].setImmovable(true);

		// Adding and configuring chest 2
		this.chests[1] = this.physics.add.sprite(
			110 * 10 - 16,
			45 * 10 - 16,
			"chest"
		);
		this.chests[1].setScale(1);
		this.chests[1].setImmovable(true);

		// Chest animations
		this.chests.forEach((chest) => {
			chest.anims.create({
				key: "chest-open",
				frames: this.anims.generateFrameNumbers("chest", {
					frames: [0, 12, 24, 36],
				}),
				frameRate: 10,
				repeat: 0,
			});

			chest.anims.create({
				key: "chest-close",
				frames: this.anims.generateFrameNumbers("chest", {
					frames: [36, 24, 12, 0],
				}),
				frameRate: 10,
				repeat: 0,
			});
		});

		// Add portal
		const portal = this.physics.add.sprite(
			32 * 29 - 16,
			32 * 25 - 16,
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
			if (!store.getState().waterMorse.isPortalOpen) {
				store.dispatch(toggleWaterMorsePortal());
			}
		});

		// Collider callback between player and chest
		this.chests.forEach((chest, index) => {
			this.physics.add.collider(this.player!, chest, () => {
				if (!store.getState().waterMorse.infoBox[index]) {
					store.dispatch(toggleInfoBox(index));
				}
			});
		});

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.input.keyboard!.on("keydown-SPACE", () => {
			if (!this.player) return;
			this.player.shoot();
		});

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.physics.add.collider(this.bullets, layer2!, (obj1) => {
			obj1.destroy();
		});

		this.player.bullets = this.bullets;
	}

	createCamera() {
		const camera = this.cameras.main.setZoom(2, 2);
		camera.startFollow(this.player!, false, 0.5, 0.5);
	}
}
