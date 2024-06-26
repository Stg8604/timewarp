import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8000,
	},
	optimizeDeps: {
		exclude: ["@ion-phaser/core/loader"],
	},
	build: {
		minify: true,
		sourcemap: false,
	},
	resolve: {
		alias: [
			{
				find: "@public",
				replacement: path.resolve(__dirname, "./public"),
			},
			{
				find: "@components",
				replacement: path.resolve(__dirname, "./src/components"),
			},
			{
				find: "@config",
				replacement: path.resolve(__dirname, "./src/config"),
			},
			{
				find: "@contexts",
				replacement: path.resolve(__dirname, "./src/contexts"),
			},
			{
				find: "@pages",
				replacement: path.resolve(__dirname, "./src/pages"),
			},
			{
				find: "@router",
				replacement: path.resolve(__dirname, "./src/router"),
			},
			{
				find: "@utils",
				replacement: path.resolve(__dirname, "./src/utils"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "./src/assets"),
			},
			{
				find: "@stores",
				replacement: path.resolve(__dirname, "./src/stores"),
			},
			{
				find: "@phaserGame",
				replacement: path.resolve(__dirname, "./src/phaserGame"),
			},
			{
				find: "@slices",
				replacement: path.resolve(__dirname, "./src/slices"),
			},
			{
				find: "@modules",
				replacement: path.resolve(__dirname, "./src/modules"),
			},
			{
				find: "@sprites",
				replacement: path.resolve(__dirname, "./src/sprites"),
			},
		],
	},
	base: "",
	plugins: [
		react(),
		VitePWA({ registerType: "autoUpdate" }),
		splitVendorChunkPlugin(),
	],
});
