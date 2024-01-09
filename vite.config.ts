import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-icon-180x180.png", "masked-icon.svg"],
	manifest: {
		name: "Alerta Escolar",
		short_name: "Alerta Escolar",
		description: "Aplicativo de monitoramento de alertas escolares oferece uma solução eficiente e prática para manter pais, alunos e educadores.",
		icons: [
			{
				src: "/android-icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-icon-180x180.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/windows11-icon-225x225",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const definedEnv = {};
	for (const key of Object.keys(env)) {
		if (key.startsWith("VITE_")) {
			definedEnv[key] = env[key];
		}
	}
	return {
		base:"./",
		plugins: [
			react({
				include: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.scss"],
			}),
			tsconfigPaths(),
			EnvironmentPlugin("all"),
			VitePWA(manifestForPlugin),
		],
		define: {
			"process.env": definedEnv,
		},
	};
});
