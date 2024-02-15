import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import { setText, toggleInfo, togglePortalKey } from "@slices/Steg/steg";
import { initStegPuzzle, getStegImages } from "@slices/index";
import { addItemToInventory } from "@slices/Status/statusActions";
import { PuzzleIds } from "@utils/PuzzleIds/puzzleId";
import { CommonCollectables } from "@sprites/CommonCollectables";

export class StegScene extends Phaser.Scene {
	constructor() {
		super({ key: "Cryptic PaintingsScene" });
	}

	player: TutorialPlayer | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isInfoOpen = store.getState().steg.isInfoOpen;
	status: StatusState | undefined;
	chestLeft: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	chestRight: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	chestOpen: number | undefined;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	collectablesLoc: { x: number; y: number }[] = [
		{ x: 490, y: 465 },
		{ x: 50, y: 240 },
		{ x: 290, y: 535 },
	];

	preload() {
		this.load.image("tileset_1", "assets/steg/$piano.png");
		this.load.image("bullet", "assets/tutorial/trail.png");
		this.load.image("tileset_2", "assets/steg/cyanide_artdeco1s8kzn.png");
		this.load.image("tileset_3", "assets/steg/cyanide_tilemix_14twj2p.png");
		this.load.image("tileset_4", "assets/steg/NES Mansion Tile Set (1).png");
		this.load.image("tileset_5", "assets/steg/V4zq3dm - Imgur.png");
		this.load.image("tileset_6", "assets/steg/Cyanide-Noble-Interior-1.png");
		this.load.image(
			"tileset_7",
			"assets/steg/universal-lpc-sprite_male_01_full.png"
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

		this.load.tilemapTiledJSON("tilemap", "assets/steg/steg.json");

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
		this.load.spritesheet("chestOpen", "assets/tutorial/chests.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 92,
		});
		this.load.spritesheet("portal", "assets/tutorial/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.image("1", "assets/collectables/1.png");
		this.load.image("2", "assets/collectables/2.png");
		this.load.image("3", "assets/collectables/3.png");
	}

	create() {
		const getImageEvent = new Event("getImage");
		this.chestOpen = 0;
		const map = this.make.tilemap({ key: "tilemap" });
		const tileset1 = map.addTilesetImage("$piano", "tileset_1");
		const tileset2 = map.addTilesetImage("cyanide_artdeco1s8kzn", "tileset_2");
		const tileset3 = map.addTilesetImage(
			"cyanide_tilemix_14twj2p",
			"tileset_3"
		);
		const tileset4 = map.addTilesetImage(
			"NES Mansion Tile Set (1)",
			"tileset_4"
		);
		const tileset5 = map.addTilesetImage("V4zq3dm - Imgur", "tileset_5");
		const tileset6 = map.addTilesetImage(
			"Cyanide-Noble-Interior-1",
			"tileset_6"
		);
		const tileset7 = map.addTilesetImage(
			"universal-lpc-sprite_male_01_full",
			"tileset_7"
		);

		const layer1 = map.createLayer("base", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const walls = map.createLayer("walls", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer3 = map.createLayer("photos", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer4 = map.createLayer("tiger", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer5 = map.createLayer("statue1", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer6 = map.createLayer("statue2", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer7 = map.createLayer("statue3", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer8 = map.createLayer("statue4", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer9 = map.createLayer("answer", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer10 = map.createLayer("piano", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer11 = map.createLayer("others", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer12 = map.createLayer("boss", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer13 = map.createLayer("statue1Top", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer14 = map.createLayer("statue2Top", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer15 = map.createLayer("statue3Top", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer16 = map.createLayer("statue4Top", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer17 = map.createLayer("answerTop", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		const layer18 = map.createLayer("boss", [
			tileset1!,
			tileset2!,
			tileset3!,
			tileset4!,
			tileset5!,
			tileset6!,
			tileset7!,
		]);

		this.chestLeft;
		if (
			store
				.getState()
				.status.inventory.find((item) => item[0] === "left_painting")
		) {
			this.chestLeft = this.physics.add.sprite(32 * 4.8, 32 * 3, "chestOpen");
		} else {
			this.chestLeft = this.physics.add.sprite(32 * 4.8, 32 * 3, "chest");
		}
		// console.log(this.chestLeft)
		// console.log("Here")
		this.chestLeft.setScale(0.5);
		this.chestLeft.setImmovable(true);
		this.chestLeft.anims.play("chest-open", true);

		this.chestRight;
		if (
			store
				.getState()
				.status.inventory.find((item) => item[0] === "right_painting")
		) {
			this.chestRight = this.physics.add.sprite(
				32 * 13.25,
				32 * 3,
				"chestOpen"
			);
		} else {
			this.chestRight = this.physics.add.sprite(32 * 13.25, 32 * 3, "chest");
		}
		this.chestRight.setScale(0.5);
		this.chestRight.setImmovable(true);

		this.player = new TutorialPlayer(
			this,
			32 * 10 - 16,
			32 * 10 - 16,
			"player",
			0.9,
			100
		);

		this.chestLeft.anims.create({
			key: "chest-open",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [0, 12, 24, 36],
			}),
			frameRate: 10,
			repeat: -1,
		});
		this.chestLeft.anims.create({
			key: "chest-close",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [36, 24, 12, 0],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.chestRight.anims.create({
			key: "chest-open",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [0, 12, 24, 36],
			}),
			frameRate: 10,
			repeat: 0,
		});

		this.chestRight.anims.create({
			key: "chest-close",
			frames: this.anims.generateFrameNumbers("chest", {
				frames: [36, 24, 12, 0],
			}),
			frameRate: 10,
			repeat: 0,
		});

		// Adding and configuring the portal
		this.portal = this.physics.add.sprite(530, 520, "portal");
		this.portal.setImmovable(true);
		this.portal.setSize(20, 20);

		// Portal animations
		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		walls!.setCollisionByExclusion([-1]);
		layer3!.setCollisionByExclusion([-1]);
		layer5!.setCollisionByExclusion([-1]);
		layer6!.setCollisionByExclusion([-1]);
		layer7!.setCollisionByExclusion([-1]);
		layer8!.setCollisionByExclusion([-1]);
		layer9!.setCollisionByExclusion([-1]);
		layer10!.setCollisionByExclusion([-1]);
		layer12!.setCollisionByExclusion([-1]);
		layer17!.setCollisionByExclusion([-1]);

		this.player!.setAlpha(1);

		this.physics.add.collider(this.player!, walls!);
		this.physics.add.collider(this.player!, layer11!);
		this.physics.add.collider(this.player!, layer10!);

		// // Collider callback between player and portal
		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().steg.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		this.physics.add.collider(this.player, this.chestLeft, () => {
			// console.log(store.getState().status.inventory)
			if (
				!store.getState().steg.isInfoOpen &&
				!store
					.getState()
					.status.inventory.find((item) => item[0] === "left_painting")
			) {
				store.dispatch(setText("You found the left painting in its true form"));
				store.dispatch(toggleInfo());
				store
					.dispatch(
						addItemToInventory([
							"left_painting",
							"The left painting that speaks less",
						])
					)
					.then(() => {
						store.dispatch(getStegImages());
					});
				this.chestOpen = 1;
				this.chestLeft?.destroy();
				this.chestLeft = this.physics.add.sprite(32 * 4.8, 32 * 3, "chestOpen");
				this.physics.add.collider(this.player!, this.chestLeft);
				this.chestLeft.setScale(0.5);
				this.chestLeft.setImmovable(true);

				// window.dispatchEvent(getImageEvent);
				// store.subscribe(()=>{
				// 	store.dispatch(getStegImages());
				// })
			}
		});

		this.physics.add.collider(this.player, this.chestRight, () => {
			// console.log(store.getState().status.inventory)
			if (
				!store.getState().steg.isInfoOpen &&
				!store
					.getState()
					.status.inventory.find((item) => item[0] === "right_painting")
			) {
				store.dispatch(
					setText("You found the right painting in its true form")
				);
				store.dispatch(toggleInfo());
				store
					.dispatch(
						addItemToInventory([
							"right_painting",
							"The right painting that says it all",
						])
					)
					.then(() => {
						store.dispatch(getStegImages());
					});
				this.chestOpen = 2;
				this.chestRight?.destroy();
				this.chestRight = this.physics.add.sprite(
					32 * 13.25,
					32 * 3,
					"chestOpen"
				);
				this.physics.add.collider(this.player!, this.chestRight);
				this.chestRight.setScale(0.5);
				this.chestRight.setImmovable(true);

				// window.dispatchEvent(getImageEvent);
				// store.subscribe(()=>{
				// 	store.dispatch(getStegImages());
				// })
			}
		});

		// this.physics.add.collider(this.player, layer3!, () => {
		// 	if (!store.getState().steg.isInfoOpen) {
		// 		store.dispatch(toggleInfo());
		// 		store.dispatch(addItemToInventory(
		// 			["left_painting", "3d array of the left painting"]
		// 		))
		// 		store.dispatch(addItemToInventory(
		// 			["right_painting", "3d array of the right painting"]
		// 		))
		// 		store.dispatch(getStegImages());
		// 	}
		// });

		this.physics.add.collider(this.player, layer5!, () => {
			if (!store.getState().steg.isInfoOpen) {
				store.dispatch(
					setText(
						"Explore the strokes, the subtle dance of the artist's hand. Amidst the seemingly identical canvases, take the difference of the brushstrokes and see the tale."
					)
				);
				store.dispatch(toggleInfo());
			}
		});

		this.physics.add.collider(this.player, layer6!, () => {
			// console.log("Collided with layer6");
			if (!store.getState().steg.isInfoOpen) {
				store.dispatch(
					setText(
						"Dive into the hues and shades, for in the realm of colors lies the concealed message. A slight deviation in palette may unravel the mystery."
					)
				);
				store.dispatch(toggleInfo());
			}
		});

		this.physics.add.collider(this.player, layer7!, () => {
			if (!store.getState().steg.isInfoOpen) {
				store.dispatch(
					setText(
						"Zoom in and let the pixels whisper their secrets. There lies a hidden realm, a microcosm of details that separates the twins. Seek the pattern within."
					)
				);
				store.dispatch(toggleInfo());
			}
		});

		this.physics.add.collider(this.player, layer8!, () => {
			if (!store.getState().steg.isInfoOpen) {
				const collisionText =
					"Beyond the canvas, shadows cast a binary spell .Decrypt the hidden patterns to unveil the passkey.";
				store.dispatch(setText(collisionText));
				store.dispatch(toggleInfo());
			}
		});

		// this.physics.add.collider(this.player, layer9!, () => {
		// 	if (!store.getState().steg.isPortalKeyOpen) {
		// 		store.dispatch(togglePortalKey());
		// 	}
		// });

		this.physics.add.collider(this.player, layer9!);
		this.physics.add.collider(this.player, layer17!);

		this.physics.add.collider(this.player, layer12!, () => {
			if (!store.getState().steg.isInfoOpen) {
				const collisionText =
					"Haha, Welcome Traveler. These two pictures look so similar don't they ? But the one on the right seems to speak much more to me than the one on the left Ha Ha";
				store.dispatch(setText(collisionText));
				store.dispatch(toggleInfo());
			}
		});

		store.subscribe(() => {
			const newIsInfoOpen = store.getState().tutorial.isInfoOpen;
			if (this.isInfoOpen && !newIsInfoOpen) {
				this.isInfoOpen = false;
				if (this.chestOpen === 1) {
					this.chestLeft!.anims.play("chest-close", true);
					this.chestOpen = 0;
				} else if (this.chestOpen === 2) {
					this.chestRight!.anims.play("chest-close", true);
					this.chestOpen = 0;
				}
			}
		});

		const camera = this.cameras.main.setZoom(3, 3);
		camera.startFollow(this.player, false, 0.5, 0.5);

		this.input.keyboard!.on("keydown-SPACE", () => {
			if (!this.player) return;
			this.player.shoot();
		});

		this.bullets = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
		});

		this.physics.add.collider(this.bullets, walls!, (obj1) => {
			obj1.destroy();
		});

		this.player.bullets = this.bullets;

		new CommonCollectables(
			this,
			this.collectablesLoc,
			1,
			PuzzleIds.STEGANOGRAPHY,
			this.player
		);
	}
}
