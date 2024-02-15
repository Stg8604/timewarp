import { TutorialPlayer } from "../sprites/TutorialPlayer";
import { store } from "@stores/index";
import {
	toggleInfo,
	toggleLeaderboard,
	toggleLore,
	togglePastPortal,
	togglePresentPortal,
	toggleFuturePortal,
	toggleTutorial,
} from "@slices/Lobby/Lobby";

export class LobbyScene extends Phaser.Scene {
	constructor() {
		super({ key: "LobbyScene" });
	}

	player: TutorialPlayer | undefined;
	bullets: Phaser.Physics.Arcade.Group | undefined;
	lore: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	leaderboard: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	past_portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	present_portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	future_portal: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	lamp_left: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	lamp_right: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	lamp_top: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	pillar_left: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	pillar_right: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	pillar_top: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	broken_pillar: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
	tutorial_statue:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_top_left_left:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_top_left_right:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_top_right_left:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_top_right_right:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_bottom_left_left:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_bottom_left_right:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_bottom_right_left:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;
	stair_handle_bottom_right_right:
		| Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
		| undefined;

	isLoreOpen = store.getState().lobby.isLoreOpen;
	isLeaderboardOpen = store.getState().lobby.isLeaderboardOpen;
	isPastPortalOpen = store.getState().lobby.isPastPortalOpen;
	isPresentPortalOpen = store.getState().lobby.isPresentPortalOpen;
	isFuturePortalOpen = store.getState().lobby.isFuturePortalOpen;
	isTutorialOpen = store.getState().lobby.isTutorialOpen;

	preload() {
		this.load.image("bullet", "assets/tutorial/trail.png");
		this.load.image("tileset_1", "assets/lobby/Nura_alterTempel_A1.png");
		this.load.image("tileset_2", "assets/lobby/Nura_alterTempel_A1new.png");
		this.load.image("tileset_3", "assets/lobby/Nura_alterTempel_A2new.png");
		this.load.image("tileset_4", "assets/lobby/Nura_alterTempel_A4.png");
		this.load.image("tileset_5", "assets/lobby/Nura_alterTempel_A4new.png");
		this.load.image(
			"tileset_6",
			"assets/lobby/Nura_alterTempel_A5new1_scaled_2x_pngcrushed.png"
		);
		this.load.image("tileset_7", "assets/lobby/Nura_alterTempel_Bnew.png");
		this.load.image("tileset_8", "assets/lobby/Nura_Lampennew.png");
		this.load.image("tileset_9", "assets/lobby/Stitch_Wasserfall_new.png");

		this.load.tilemapTiledJSON("map", "assets/lobby/lobbyMap.json");
		this.load.spritesheet("player", "assets/lobby/player.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerUI", "assets/lobby/playerUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("playerCloseUI", "assets/lobby/playerCloseUI.png", {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.spritesheet("past_portal", "assets/lobby/era_portal.png", {
			frameWidth: 96,
			frameHeight: 96,
			startFrame: 1,
		});

		this.load.spritesheet("present_portal", "assets/lobby/era_portal.png", {
			frameWidth: 96,
			frameHeight: 96,
			startFrame: 1,
		});

		this.load.spritesheet("future_portal", "assets/lobby/era_portal.png", {
			frameWidth: 96,
			frameHeight: 96,
			startFrame: 0,
		});
		this.load.spritesheet("lore", "assets/lobby/lore.png", {
			frameWidth: 46,
			frameHeight: 96,
			startFrame: 0,
		});
		this.load.spritesheet("leaderboard", "assets/lobby/leaderboard.png", {
			frameWidth: 131,
			frameHeight: 96,
			startFrame: 0,
		});
		this.load.spritesheet("lamps", "assets/lobby/lamps.png", {
			frameWidth: 49,
			frameHeight: 96,
			startFrame: 0,
		});
		this.load.spritesheet("pillar", "assets/lobby/pillar.png", {
			frameWidth: 45,
			frameHeight: 95,
			startFrame: 0,
		});
		this.load.spritesheet("broken_pillar", "assets/lobby/pillar.png", {
			frameWidth: 45,
			frameHeight: 95,
			startFrame: 1,
		});
		this.load.spritesheet(
			"tutorial_statue",
			"assets/lobby/tutorial_statue.png",
			{
				frameWidth: 48,
				frameHeight: 94,
			}
		);
		this.load.spritesheet(
			"stair_handle_left",
			"assets/lobby/stair_handles.png",
			{
				frameWidth: 64,
				frameHeight: 160,
				startFrame: 0,
			}
		);
		this.load.spritesheet(
			"stair_handle_right",
			"assets/lobby/stair_handles.png",
			{
				frameWidth: 64,
				frameHeight: 160,
				startFrame: 1,
			}
		);

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
		const map = this.make.tilemap({ key: "map" });

		const tileset_1 = map.addTilesetImage("Nura_alterTempel_A1", "tileset_1");
		const tileset_2 = map.addTilesetImage(
			"Nura_alterTempel_A1new",
			"tileset_2"
		);
		const tileset_3 = map.addTilesetImage(
			"Nura_alterTempel_A2new",
			"tileset_3"
		);
		const tileset_4 = map.addTilesetImage("Nura_alterTempel_A4", "tileset_4");
		const tileset_5 = map.addTilesetImage(
			"Nura_alterTempel_A4new",
			"tileset_5"
		);
		const tileset_6 = map.addTilesetImage(
			"Nura_alterTempel_A5new1_scaled_2x_pngcrushed",
			"tileset_6"
		);
		const tileset_7 = map.addTilesetImage("Nura_alterTempel_Bnew", "tileset_7");
		const tileset_8 = map.addTilesetImage("Nura_Lampennew", "tileset_8");
		const tileset_9 = map.addTilesetImage("Stitch_Wasserfall_new", "tileset_9");

		const tiles = map.createLayer("tiles", [tileset_3!, tileset_6!]);

		const moss = map.createLayer("moss", [tileset_3!, tileset_7!]);

		const ground_props = map.createLayer("ground_props", [
			tileset_3!,
			tileset_7!,
		]);

		const wall = map.createLayer("wall", [tileset_4!, tileset_5!, tileset_7!]);

		const wall_props = map.createLayer("wall_props", [tileset_7!]);

		const border = map.createLayer("border", [
			tileset_1!,
			tileset_2!,
			tileset_5!,
			tileset_7!,
		]);

		const statues = map.createLayer("statues", [
			tileset_1!,
			tileset_2!,
			tileset_7!,
			tileset_8!,
		]);

		// Adding and configuring the lore statue
		this.lore = this.physics.add.sprite(800, 1616 - 32 * 10, "lore");
		this.lore.setScale(1);
		this.lore.setImmovable(true);

		// Adding and configuring the leaderboard
		this.leaderboard = this.physics.add.sprite(32 * 25, 32 * 23, "leaderboard");
		this.leaderboard.setScale(1);
		this.leaderboard.setImmovable(true);

		// Adding and configuring the past_portal
		this.past_portal = this.physics.add.sprite(172, 758, "past_portal");
		this.past_portal.setScale(1);
		this.past_portal.setImmovable(true);

		// Adding and configuring the present_portal
		this.present_portal = this.physics.add.sprite(800, 418, "present_portal");
		this.present_portal.setScale(1);
		this.present_portal.setImmovable(true);

		// Adding and configuring the future_portal
		this.future_portal = this.physics.add.sprite(1426, 758, "future_portal");
		this.future_portal.setScale(1);
		this.future_portal.setImmovable(true);

		// Adding and configuring the future_portal
		this.tutorial_statue = this.physics.add.sprite(
			32 * 25,
			32 * 51,
			"tutorial_statue"
		);
		this.tutorial_statue.setScale(1);
		this.tutorial_statue.setImmovable(true);

		this.player = new TutorialPlayer(this, 32 * 25, 32 * 55, "player");

		const railing = map.createLayer("railing", [tileset_7!]);

		this.stair_handle_top_left_left = this.physics.add.sprite(
			32 * 15,
			32 * 39 - 16,
			"stair_handle_left"
		);
		this.stair_handle_top_left_left.setScale(1);
		this.stair_handle_top_left_left.setImmovable(true);
		this.stair_handle_top_left_left.setSize(13, 152);
		this.stair_handle_top_left_left.setOffset(0, 8);

		this.stair_handle_top_left_right = this.physics.add.sprite(
			32 * 19,
			32 * 39 - 16,
			"stair_handle_right"
		);
		this.stair_handle_top_left_right.setScale(1);
		this.stair_handle_top_left_right.setImmovable(true);
		this.stair_handle_top_left_right.setSize(13, 152);
		this.stair_handle_top_left_right.setOffset(19, 8);

		this.stair_handle_bottom_left_left = this.physics.add.sprite(
			32 * 15,
			32 * 49 - 16,
			"stair_handle_left"
		);
		this.stair_handle_bottom_left_left.setScale(1);
		this.stair_handle_bottom_left_left.setImmovable(true);
		this.stair_handle_bottom_left_left.setSize(13, 152);
		this.stair_handle_bottom_left_left.setOffset(0, 8);

		this.stair_handle_bottom_left_right = this.physics.add.sprite(
			32 * 19,
			32 * 49 - 16,
			"stair_handle_right"
		);
		this.stair_handle_bottom_left_right.setScale(1);
		this.stair_handle_bottom_left_right.setImmovable(true);
		this.stair_handle_bottom_left_right.setSize(13, 152);
		this.stair_handle_bottom_left_right.setOffset(19, 8);

		this.stair_handle_top_right_left = this.physics.add.sprite(
			32 * 32,
			32 * 39 - 16,
			"stair_handle_left"
		);
		this.stair_handle_top_right_left.setScale(1);
		this.stair_handle_top_right_left.setImmovable(true);
		this.stair_handle_top_right_left.setSize(13, 152);
		this.stair_handle_top_right_left.setOffset(0, 8);

		this.stair_handle_top_right_right = this.physics.add.sprite(
			32 * 36,
			32 * 39 - 16,
			"stair_handle_right"
		);
		this.stair_handle_top_right_right.setScale(1);
		this.stair_handle_top_right_right.setImmovable(true);
		this.stair_handle_top_right_right.setSize(13, 152);
		this.stair_handle_top_right_right.setOffset(19, 8);

		this.stair_handle_bottom_right_left = this.physics.add.sprite(
			32 * 32,
			32 * 49 - 16,
			"stair_handle_left"
		);
		this.stair_handle_bottom_right_left.setScale(1);
		this.stair_handle_bottom_right_left.setImmovable(true);
		this.stair_handle_bottom_right_left.setSize(13, 152);
		this.stair_handle_bottom_right_left.setOffset(0, 8);

		this.stair_handle_bottom_right_right = this.physics.add.sprite(
			32 * 36,
			32 * 49 - 16,
			"stair_handle_right"
		);
		this.stair_handle_bottom_right_right.setScale(1);
		this.stair_handle_bottom_right_right.setImmovable(true);
		this.stair_handle_bottom_right_right.setSize(13, 152);
		this.stair_handle_bottom_right_right.setOffset(19, 8);

		this.lamp_left = this.physics.add.sprite(32 * 12, 32 * 40 - 16, "lamps");
		this.lamp_left.setScale(1);
		this.lamp_left.setImmovable(true);
		this.lamp_left.setSize(49, 48);
		this.lamp_left.setOffset(0, 48);

		this.lamp_right = this.physics.add.sprite(32 * 38, 32 * 40 - 16, "lamps");
		this.lamp_right.setScale(1);
		this.lamp_right.setImmovable(true);
		this.lamp_right.setSize(49, 48);
		this.lamp_right.setOffset(0, 48);

		this.lamp_top = this.physics.add.sprite(32 * 12, 32 * 12 - 16, "lamps");
		this.lamp_top.setScale(1);
		this.lamp_top.setImmovable(true);
		this.lamp_top.setSize(49, 48);
		this.lamp_top.setOffset(0, 48);

		this.pillar_left = this.physics.add.sprite(32 * 17, 32 * 28 + 16, "pillar");
		this.pillar_left.setScale(1);
		this.pillar_left.setImmovable(true);
		this.pillar_left.setSize(45, 47.5);
		this.pillar_left.setOffset(0, 47.5);

		this.pillar_right = this.physics.add.sprite(
			32 * 33,
			32 * 28 + 16,
			"pillar"
		);
		this.pillar_right.setScale(1);
		this.pillar_right.setImmovable(true);
		this.pillar_right.setSize(45, 47.5);
		this.pillar_right.setOffset(0, 47.5);

		this.pillar_top = this.physics.add.sprite(32 * 17, 32 * 16 + 16, "pillar");
		this.pillar_top.setScale(1);
		this.pillar_top.setImmovable(true);
		this.pillar_top.setSize(45, 47.5);
		this.pillar_top.setOffset(0, 47.5);

		this.broken_pillar = this.physics.add.sprite(
			32 * 33,
			32 * 16 + 16,
			"broken_pillar"
		);
		this.broken_pillar.setScale(1);
		this.broken_pillar.setImmovable(true);
		this.broken_pillar.setSize(45, 47.5);
		this.broken_pillar.setOffset(0, 47.5);

		// const waterfall = map.createLayer("waterfall", [
		// 	tileset_9!
		// ]);

		// ANIMATIONS GO HERE

		this.lamp_left.anims.create({
			key: "lamp_left",
			frames: this.anims.generateFrameNumbers("lamps", { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1,
		});
		this.lamp_left.anims.play("lamp_left", true);
		this.lamp_right.anims.create({
			key: "lamp_right",
			frames: this.anims.generateFrameNumbers("lamps", { frames: [0, 2, 1] }),
			frameRate: 10,
			repeat: -1,
		});
		this.lamp_right.anims.play("lamp_right", true);
		this.lamp_top.anims.create({
			key: "lamp_top",
			frames: this.anims.generateFrameNumbers("lamps", { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1,
		});
		this.lamp_top.anims.play("lamp_top", true);

		// COLLIDER ACTIONS GO HERE
		this.physics.add.collider(this.player, this.lore, () => {
			if (!store.getState().lobby.isLoreOpen) {
				store.dispatch(toggleLore());
			}
		});
		this.physics.add.collider(this.player, this.leaderboard, () => {
			if (!store.getState().lobby.isLeaderboardOpen) {
				store.dispatch(toggleLeaderboard());
			}
		});
		this.physics.add.collider(this.player, this.past_portal, () => {
			if (!store.getState().lobby.isPastPortalOpen) {
				store.dispatch(togglePastPortal());
			}
		});
		this.physics.add.collider(this.player, this.present_portal, () => {
			if (!store.getState().lobby.isPresentPortalOpen) {
				store.dispatch(togglePresentPortal());
			}
		});
		this.physics.add.collider(this.player, this.future_portal, () => {
			if (!store.getState().lobby.isFuturePortalOpen) {
				store.dispatch(toggleFuturePortal());
			}
		});
		this.physics.add.collider(this.player, this.tutorial_statue, () => {
			if (!store.getState().lobby.isTutorialOpen) {
				store.dispatch(toggleTutorial());
			}
		});
		this.physics.add.collider(this.player, this.stair_handle_top_left_left);
		this.physics.add.collider(this.player, this.stair_handle_top_left_right);
		this.physics.add.collider(this.player, this.stair_handle_bottom_left_left);
		this.physics.add.collider(this.player, this.stair_handle_bottom_left_right);
		this.physics.add.collider(this.player, this.stair_handle_top_right_left);
		this.physics.add.collider(this.player, this.stair_handle_top_right_right);
		this.physics.add.collider(this.player, this.stair_handle_bottom_right_left);
		this.physics.add.collider(
			this.player,
			this.stair_handle_bottom_right_right
		);
		this.physics.add.collider(this.player, this.lamp_left);
		this.physics.add.collider(this.player, this.lamp_right);
		this.physics.add.collider(this.player, this.lamp_top);
		this.physics.add.collider(this.player, this.pillar_left);
		this.physics.add.collider(this.player, this.pillar_right);
		this.physics.add.collider(this.player, this.pillar_top);
		this.physics.add.collider(this.player, this.broken_pillar);
		this.physics.add.collider(this.player, this.tutorial_statue);

		store.subscribe(() => {
			const newIsLeaderboardOpen = store.getState().lobby.isLeaderboardOpen;
			const newIsLoreOpen = store.getState().lobby.isLoreOpen;
			const newIsPastPortalOpen = store.getState().lobby.isPastPortalOpen;
			const newIsPresentPortalOpen = store.getState().lobby.isPresentPortalOpen;
			const newIsFuturePortalOpen = store.getState().lobby.isFuturePortalOpen;
			const newIsTutorialOpen = store.getState().lobby.isTutorialOpen;

			if (!this.isLoreOpen && newIsLoreOpen) {
				this.isLoreOpen = true;
			} else if (this.isLoreOpen && !newIsLoreOpen) {
				this.isLoreOpen = false;
			} else if (!this.isLeaderboardOpen && newIsLeaderboardOpen) {
				this.isLeaderboardOpen = true;
			} else if (this.isLeaderboardOpen && !newIsLeaderboardOpen) {
				this.isLeaderboardOpen = false;
			} else if (!this.isPastPortalOpen && newIsPastPortalOpen) {
				this.isPastPortalOpen = true;
			} else if (this.isPastPortalOpen && !newIsPastPortalOpen) {
				this.isPastPortalOpen = false;
			} else if (!this.isPresentPortalOpen && newIsPresentPortalOpen) {
				this.isPresentPortalOpen = true;
			} else if (this.isPresentPortalOpen && !newIsPresentPortalOpen) {
				this.isPresentPortalOpen = false;
			} else if (!this.isFuturePortalOpen && newIsFuturePortalOpen) {
				this.isFuturePortalOpen = true;
			} else if (this.isFuturePortalOpen && !newIsFuturePortalOpen) {
				this.isFuturePortalOpen = false;
			} else if (!this.isTutorialOpen && newIsTutorialOpen) {
				this.isTutorialOpen = true;
			} else if (this.isTutorialOpen && !newIsTutorialOpen) {
				this.isTutorialOpen = false;
			}
		});

		border!.setCollisionBetween(0, 3000); // Adjust the range as needed
		statues!.setCollisionBetween(0, 3000); // Adjust the range as needed
		wall_props!.setCollisionBetween(0, 3000); // Adjust the range as needed
		wall!.setCollisionBetween(0, 3000); // Adjust the range as needed

		this.physics.add.collider(this.player!, statues!);
		this.physics.add.collider(this.player!, border!);
		this.physics.add.collider(this.player!, wall_props!);
		this.physics.add.collider(this.player!, wall!);

		map.setCollisionFromCollisionGroup(true, true, statues!);
		map.setCollisionFromCollisionGroup(true, true, border!);
		map.setCollisionFromCollisionGroup(true, true, wall_props!);
		map.setCollisionFromCollisionGroup(true, true, wall!);

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

		this.physics.add.collider(this.bullets, border!, (obj1) => {
			obj1.destroy();
		});

		this.player.bullets = this.bullets;

		const camera = this.cameras.main.setZoom(1.5, 1.5);
		camera.startFollow(this.player, false, 0.5, 0.5);
	}
}
