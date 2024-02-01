import Phaser from "phaser";
import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { Barrel } from "../sprites/Barrel";
import { Collectable } from "../sprites/Collectable";
import { store } from "../stores";
import { status } from "../slices/Status/statusActions";
import { setInventory } from "../slices/Status/status";
import { addItemToInventory } from "../slices/Player/PlayerActions";
import { getClipsOrder } from "../slices/SoundPuzzle/soundPuzzleActions";
import {
	togglePortalKey,
	updateSoundParams,
} from "../slices/SoundPuzzle/soundPuzzle";
import { Toast } from "../components";
import { TOAST_ERROR } from "@utils/ToastStatus";

export class SoundPuzzle extends Phaser.Scene {
	hashMap!: Record<string, string>;
	hashMap2!: Record<string, string>;
	inventory: [string, string][];
	clipsOrder: string;
	player: TutorialPlayer | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	walls!: Phaser.Tilemaps.TilemapLayer | null;
	collectables: Phaser.Physics.Arcade.Group | undefined;
	description: Record<string, string>;
	puzzle: SoundPuzzleState;

	constructor() {
		super({ key: "SoundPuzzle" });
		this.puzzle = store.getState().soundPuzzle;
		this.inventory = store.getState().status.inventory;
		this.clipsOrder = store.getState().soundPuzzle.clipsOrder;
		this.description = {};
		store
			.dispatch(status())
			.then((data) => {
				this.inventory = (data.payload as Status)?.inventory;
				store.dispatch(
					updateSoundParams({
						...this.puzzle.params,
						inventory: this.inventory.map((ele) => ele[0]),
					})
				);
			})
			.catch((_err) => {
				Toast(TOAST_ERROR, "Oops! Something went wrong.");
			});
		store.dispatch(getClipsOrder()).then((data) => {
			this.clipsOrder = data.payload;
			const obj: string[] = data.payload;
			if (obj) {
				Object.entries(obj).map(([key, value]) => {
					this.description[`audio_clip_${key}`] = value;
				});
			}
		});
	}

	preload() {
		this.load.image(
			"tileset",
			"assets/soundPuzzle/DungeonTilesetV1/Tileset/Tileset01.png"
		);
		this.load.image(
			"chair1",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/table/desk1.png"
		);
		this.load.image(
			"chair2",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/table/desk2.png"
		);
		this.load.image(
			"smallPot",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/table/potSmall.png"
		);
		this.load.image(
			"largePot",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/table/potTall.png"
		);
		this.load.image(
			"cabinet",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/table/cabinet.png"
		);
		this.load.image("disc", "assets/soundPuzzle/DungeonTilesetV1/disc.png");
		this.load.image(
			"floppyDisc",
			"assets/soundPuzzle/DungeonTilesetV1/disc2.png"
		);
		this.load.image(
			"candleBig",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/animations/candleBig.png"
		);
		this.load.image(
			"candleWall",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/animations/candleWall.png"
		);

		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.tilemapTiledJSON("tilemap", "assets/soundPuzzle/map.json");
		this.load.spritesheet("player", "assets/tutorial/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet(
			"candleTallSprites",
			"assets/soundPuzzle/DungeonTilesetV1/Multiple props/candleTall.png",
			{
				frameWidth: 11,
				frameHeight: 32,
				startFrame: 0,
			}
		);

		this.load.spritesheet(
			"smallPotBreak",
			"assets/soundPuzzle/DungeonTilesetV1/potSprites.png",
			{
				frameWidth: 15,
				frameHeight: 22,
				startFrame: 0,
			}
		);
		this.load.spritesheet(
			"largePotBreak",
			"assets/soundPuzzle/DungeonTilesetV1/potTallSprites.png",
			{
				frameWidth: 17,
				frameHeight: 27,
				startFrame: 0,
			}
		);

		this.load.image("bullet", "assets/tutorial/trail.png");

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
		this.load.spritesheet("chest", "assets/tutorial/chest.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 56,
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
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		// this.load.spritesheet("portal", "assets/soundPuzzle/portal.png", {
		//     frameWidth: 64,
		//     frameHeight: 64,
		// });
	}

	create() {
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset = map.addTilesetImage("Tileset01", "tileset");
		const desk1Tileset = map.addTilesetImage("desk1", "chair1");
		const desk2Tileset = map.addTilesetImage("desk2", "chair2");
		const candleWallTileset = map.addTilesetImage("candleWall", "candleWall");
		const cabinetTileset = map.addTilesetImage("cabinet", "cabinet");
		// const candleBigTileset = map.addTilesetImage("candleBig", "candleBig");
		// const layer2 = map.createLayer("Layer2", tileset!);
		map.createLayer("Layer 1", tileset!);
		const walls = map.createLayer("Walls", tileset!);
		map.createLayer("decorations", tileset!);
		const desk1 = map.createLayer("desk1", desk1Tileset!);
		const desk2 = map.createLayer("desk2", desk2Tileset!);
		const cabinet = map.createLayer("cabinet", cabinetTileset!);
		// const candleBig = map.createLayer("Candles", candleBigTileset!);
		const candles = this.physics.add.staticGroup({
			classType: Phaser.Physics.Arcade.Sprite,
		});
		map.createLayer("candleWall", candleWallTileset!);

		this.anims.create({
			key: "candleBigAnimation",
			frames: this.anims.generateFrameNumbers("candleTallSprites", {
				start: 0,
				end: 3,
			}),
			frameRate: 6,
			repeat: -1,
		});

		this.player = new TutorialPlayer(
			this,
			32 * 3 - 16,
			32 * 3 - 16,
			"player",
			0.8
		);
		this.player.setCollideWorldBounds(true);

		this.portal = this.physics.add
			.sprite(16 * 32 - 16, 16 * 28.2 - 16, "portal")
			.setScale(0.5);
		this.portal.setImmovable(true);
		this.portal.setSize(32, 32);

		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 14,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.collectables = this.physics.add.group({
			classType: Collectable,
		});

		this.player.bullets = this.bullets;
		const chairs = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		candles.get(16 * 2 - 8, 16 * 4 - 20, "candleBig");
		candles.get(16 * 4 - 8, 16 * 20 - 20, "candleBig");
		candles.get(16 * 4 - 8, 16 * 37 - 20, "candleBig");
		candles.get(16 * 29 - 8, 16 * 37 - 20, "candleBig");

		chairs.get(16 * 12 - 16, 16 * 4.5 - 16, "chair1")?.setImmovable(true);
		chairs.get(16 * 12 - 16, 16 * 20.5 - 16, "chair1")?.setImmovable(true);
		chairs.get(16 * 22 - 16, 16 * 20.5 - 16, "chair1")?.setImmovable(true);
		chairs.get(16 * 12 - 16, 16 * 37.5 - 16, "chair1")?.setImmovable(true);
		chairs.get(16 * 22 - 16, 16 * 37.5 - 16, "chair1")?.setImmovable(true);
		chairs.get(16 * 2.4 - 16, 16 * 9 - 16, "chair2")?.setImmovable(true);
		chairs.get(16 * 20.4 - 16, 16 * 7 - 16, "chair2")?.setImmovable(true);
		chairs.get(16 * 20.4 - 16, 16 * 11 - 16, "chair2")?.setImmovable(true);
		chairs.get(16 * 4.4 - 16, 16 * 27 - 16, "chair2")?.setImmovable(true);
		chairs.get(16 * 4.4 - 16, 16 * 33 - 16, "chair2")?.setImmovable(true);

		const smallPots: Phaser.Physics.Arcade.Group = this.physics.add.group({
			classType: Barrel,
		});
		const largePots: Phaser.Physics.Arcade.Group = this.physics.add.group({
			classType: Barrel,
		});

		smallPots.get(16 * 2 - 7, 16 * 5 - 10, "smallPot").setImmovable(true);
		smallPots.get(16 * 11 - 7, 16 * 11 - 10, "smallPot").setImmovable(true);
		smallPots.get(16 * 4 - 7, 16 * 21 - 10, "smallPot").setImmovable(true);
		smallPots
			.get(16 * 4 - 7, 16 * 22 - 10, "smallPot")
			.setImmovable(true).contents = {
			name: "audio_clip_1",
			desc: this.description["audio_clip_1"],
		};
		smallPots
			.get(16 * 20 - 7, 16 * 20 - 10, "smallPot")
			.setImmovable(true).contents = {
			name: "audio_clip_2",
			desc: this.description["audio_clip_2"],
		};
		smallPots.get(16 * 15 - 7, 16 * 37 - 10, "smallPot").setImmovable(true);

		largePots.get(16 * 3 - 7, 16 * 4 - 12, "largePot").setImmovable(true);
		largePots.get(16 * 10 - 7, 16 * 11 - 12, "largePot").setImmovable(true);
		largePots
			.get(16 * 12 - 7, 16 * 11 - 12, "largePot")
			.setImmovable(true).contents = {
			name: "audio_clip_5",
			desc: this.description["audio_clip_5"],
		};
		largePots
			.get(16 * 13 - 7, 16 * 4 - 12, "largePot")
			.setImmovable(true).contents = {
			name: "audio_clip_6",
			desc: this.description["audio_clip_6"],
		};
		largePots
			.get(16 * 5 - 7, 16 * 20 - 12, "largePot")
			.setImmovable(true).contents = {
			name: "audio_clip_3",
			desc: this.description["audio_clip_3"],
		};
		largePots
			.get(16 * 16 - 7, 16 * 37 - 12, "largePot")
			.setImmovable(true).contents = {
			name: "audio_clip_4",
			desc: this.description["audio_clip_4"],
		};
		largePots.get(16 * 29 - 7, 16 * 30 - 12, "largePot").setImmovable(true);
		largePots.get(16 * 29 - 7, 16 * 26 - 12, "largePot").setImmovable(true);

		this.input.keyboard!.on("keydown-SPACE", () => {
			if (!this.player) return;
			this.player.shoot();
		});

		walls?.setCollisionByProperty({ collides: true });
		desk1?.setCollisionByProperty({ collides: true });
		desk2?.setCollisionByProperty({ collides: true });
		cabinet?.setCollisionByProperty({ collides: true });
		// candleBig?.setCollisionByProperty({ collides: true });
		map.setCollisionBetween(1, 1000, true, true, "desk1");
		map.setCollisionBetween(1, 1000, true, true, "desk2");

		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().soundPuzzle.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		// Adding collision between player and map
		// this.physics.add.collider(this.player!, layer1!);
		// map.setCollisionFromCollisionGroup(true, true, layer1!);

		this.physics.add.collider(this.player!, walls!);
		this.physics.add.collider(this.player!, desk1!);
		this.physics.add.collider(this.player!, desk2!);
		this.physics.add.collider(this.player!, cabinet!);
		// this.physics.add.collider(this.player!, candleBig!);
		this.physics.add.collider(this.player!, chairs!);
		this.physics.add.collider(this.player!, smallPots!);
		this.physics.add.collider(this.player!, largePots!);
		this.physics.add.collider(this.bullets, walls!, (obj1) => {
			obj1.destroy();
		});

		candles.playAnimation("candleBigAnimation");

		this.physics.add.collider(
			this.bullets,
			chairs,
			(obj1) => {
				obj1.destroy();
			},
			undefined,
			this
		);

		this.physics.add.collider(
			this.bullets,
			smallPots,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(obj1, obj2: any) => {
				obj1.destroy();
				if (obj2.breaking) return;
				obj2.health -= 30;
				if (obj2.health <= 0) {
					const { x, y } = obj2.getCenter();
					const contents = obj2.contents;
					obj2.break("small");
					const alreadyHas = this.inventory.find(
						(item) => item[0] === contents?.name
					);
					if (contents && !alreadyHas) {
						this.time.delayedCall(800, () => {
							const disc = this.collectables?.get(x, y, "floppyDisc", 0, false);
							disc.contents = [contents.name, this.description[contents.name]];
							disc.setImmovable(true);
							disc.setScale(0.2);
							disc.visible = true;
						});
					}
				}
			},
			undefined,
			this
		);

		this.physics.add.collider(
			this.bullets,
			largePots,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(obj1, obj2: any) => {
				obj1.destroy();
				if (obj2.breaking) return;
				obj2.health -= 30;
				if (obj2.health <= 0) {
					const { x, y } = obj2.getCenter();
					const contents = obj2.contents;
					obj2.break("large");
					const alreadyHas = this.inventory.find(
						(item) => item[0] === contents?.name
					);
					if (contents && !alreadyHas) {
						this.time.delayedCall(800, () => {
							const disc = this.collectables?.get(x, y, "floppyDisc", 0, false);
							disc.contents = [contents.name, this.description[contents.name]];
							disc.setImmovable(true);
							disc.setScale(0.2);
							disc.visible = true;
						});
					}
				}
			},

			undefined,
			this
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.physics.add.overlap(
			this.player,
			this.collectables,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(_obj1, obj2: any) => {
				if (obj2 instanceof Collectable && obj2.scaleSet && obj2.contents) {
					if (obj2.contents && !this.inventory.includes(obj2.contents)) {
						this.inventory = [...this.inventory, obj2.contents];
						store.dispatch(setInventory(this.inventory));
						store.dispatch(
							updateSoundParams({
								...this.puzzle.params,
								inventory: this.inventory.map((ele) => ele[0]),
							})
						);
						store.dispatch(addItemToInventory(obj2.contents));
					}
					obj2.destroy();
				}
			}
		);

		this.walls = walls;

		// Configuring camera
		const camera = this.cameras.main.setZoom(3, 3);
		camera.startFollow(this.player, false, 0.5, 0.5);
	}

	update(time: number, delta: number): void {
		this.collectables?.children.each((child) => {
			if (child instanceof Collectable) {
				child.update(time, delta);
			}
			return null;
		});
	}
}
