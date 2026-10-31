import {defineConfig} from 'eslint/config';
import obsidianmd from 'eslint-plugin-obsidianmd';
export default defineConfig([
 {ignores:['node_modules/**','dist/**','work/**','main.js','tests/**','scripts/**','eslint.config.mjs']},
 ...obsidianmd.configs.recommended,
 // Compatibility: declarative settings search needs Obsidian 1.13, while this plugin supports 1.7.2.
 {rules:{'obsidianmd/settings-tab/prefer-setting-definitions':'off'},languageOptions:{parserOptions:{projectService:true}}}
]);
