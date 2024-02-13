import {
	toggleFireInfo,
	toggleGodInfo,
	toggleMessengerInfo,
	togglePortalKey,
} from "@slices/cipher/cipher";
import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";

export class CipherScene extends Phaser.Scene {
	constructor() {
		super({ key: "CipherScene" });
	}

	player: TutorialPlayer | undefined;
	map!: Phaser.Tilemaps.Tilemap;
	chest: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	fire1: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	fire2: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	fire3: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	gate: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	messenger: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	god: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	isMessengerInfoo = store.getState().cipher.isMessengerInfoo;
	isGodInfo = store.getState().cipher.isGodInfo;
	isPortalKeyOpen = store.getState().cipher.isPortalKeyOpen;
	isFire = store.getState().cipher.isFire;

	preload() {
		// Loading all necessary assets
		this.load.image("door", "assets/cipher/Tiles-Door-packs.png");
		this.load.image("item", "assets/cipher/Tiles-Items-pack.png");
		this.load.image("props", "assets/cipher/Tiles-Props-pack.png");
		this.load.image("wall", "assets/cipher/Tiles-SandstoneDungeons.png");
		this.load.image("guard", "assets/cipher/Characters-part-1.png");
		this.load.image("character", "assets/cipher/Characters-part-2.png");
		this.load.tilemapTiledJSON("tilemap", "assets/cipher/cipher.json");
		this.load.spritesheet("player", "assets/cipher/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/cipher/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.spritesheet("playerCloseUI", "assets/cipher/playerCloseUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.spritesheet("fire", "assets/cipher/Tiles-Props-pack.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 31,
		});
		this.load.spritesheet("gate", "assets/cipher/Tiles-Door-packs.png", {
			frameWidth: 32,
			frameHeight: 64,
			startFrame: 8,
		});
		this.load.spritesheet("messenger", "assets/cipher/Characters-part-2.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 1,
		});
		this.load.spritesheet("god", "assets/cipher/Characters-part-2.png", {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 5,
		});
		this.load.spritesheet("portal", "assets/cipher/portal.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
	}

	create() {
		// Creating i.e. adding the map
		this.map = this.make.tilemap({ key: "tilemap" });
		const wallTileSet = this.map.addTilesetImage("sandStone", "wall");
		const doorTileSet = this.map.addTilesetImage("door", "door");
		const itemTileSet = this.map.addTilesetImage("item", "item");
		const propsTileSet = this.map.addTilesetImage("props", "props");
		const guardTileSet = this.map.addTilesetImage("guard", "guard");
		const playerTileSet = this.map.addTilesetImage("player", "character");

		const base = this.map.createLayer("base", [
			wallTileSet!,
			doorTileSet!,
			itemTileSet!,
			propsTileSet!,
			guardTileSet!,
			playerTileSet!,
		]);
		const shadow = this.map.createLayer("shadow", [
			wallTileSet!,
			doorTileSet!,
			itemTileSet!,
			propsTileSet!,
			guardTileSet!,
			playerTileSet!,
		]);
		const wall = this.map.createLayer("wall", [
			wallTileSet!,
			doorTileSet!,
			itemTileSet!,
			propsTileSet!,
			guardTileSet!,
			playerTileSet!,
		]);
		const wallDecoration = this.map.createLayer("decor", [
			wallTileSet!,
			doorTileSet!,
			itemTileSet!,
			propsTileSet!,
			guardTileSet!,
			playerTileSet!,
		]);

		this.fire1 = this.physics.add.sprite(345, 245, "fire");
		this.fire2 = this.physics.add.sprite(1220, 310, "fire");
		this.fire3 = this.physics.add.sprite(1270, 1150, "fire");

		// Adding and configuring the portal
		this.portal = this.physics.add.sprite(1400, 1135, "portal");
		this.portal.setImmovable(true);
		this.portal.setSize(32, 32);

		// Portal animations
		this.portal.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1,
		});
		this.portal.anims.play("idle", true);

		// Set properties for each fire sprite
		[this.fire1, this.fire2, this.fire3].forEach((fire) => {
			fire.setImmovable(true);
			fire.setSize(32, 32);
			fire.setScale(2);

			fire.anims.create({
				key: "idle",
				frames: this.anims.generateFrameNumbers("fire", { start: 2, end: 6 }),
				frameRate: 5,
				repeat: -1,
			});
			fire.anims.play("idle", true);
		});

		this.player = new TutorialPlayer(
			this,
			32 * 10 - 16,
			32 * 10 - 16,
			"player"
		);
		this.player.setScale(1.5);

		this.physics.add.collider(this.fire1, this.player!);
		this.physics.add.collider(this.fire3, this.player!);


		// this.gate = this.physics.add.sprite(620, 1055, "gate");
		// this.gate.setImmovable(true);
		// this.gate.setSize(32, 32);
		// this.physics.add.collider(this.gate, this.player);

		this.god = this.physics.add.sprite(320, 1055, "god");
		this.god.setImmovable(true);
		this.god.setSize(32, 32);

		this.messenger = this.physics.add.sprite(180, 280, "messenger");
		this.messenger.setImmovable(true);
		this.messenger.setSize(32, 32);

		this.messenger.anims.create({
			key: "messenger",
			frames: this.anims.generateFrameNumbers("messenger", {
				start: 0,
				end: 3,
			}),
			frameRate: 5,
			repeat: -1,
		});
		this.messenger.anims.play("messenger", true);

		this.god.anims.create({
			key: "god",
			frames: this.anims.generateFrameNumbers("god", { start: 1, end: 3 }),
			frameRate: 11,
			repeat: -1,
		});
		this.god.anims.play("god", true);

		this.physics.add.collider(this.god, this.player, () => {
			if (!store.getState().cipher.isGodInfo) {
				store.dispatch(toggleGodInfo());
			}
		});

		this.physics.add.collider(this.messenger, this.player, () => {
			if (!store.getState().cipher.isMessengerInfoo) {
				store.dispatch(toggleMessengerInfo());
			}
		});

		this.physics.add.collider(this.player, this.portal, () => {
			if (!store.getState().cipher.isPortalKeyOpen) {
				store.dispatch(togglePortalKey());
			}
		});

		this.physics.add.collider(this.fire2, this.player, () => {
			if (!store.getState().cipher.isFire) {
				store.dispatch(toggleFireInfo());
			}
		});

		wall!.setCollisionBetween(0, 1500);

		// Adding collision between player and map
		this.physics.add.collider(this.player!, wall!);
		this.map.setCollisionFromCollisionGroup(true, true, wall!);

		// Configuring camera
		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);
	}
}
