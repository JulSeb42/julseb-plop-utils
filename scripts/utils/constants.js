/*=============================================== Constants ===============================================*/
export const projectTypes = [
    "Express Rest + Vite + React + TS",
    "Express GraphQL + Vite + React + TS",
    "Vite + React + TS", // Same with JS
    // Coming soon
    // "Next.js",
    // "Remix",
    // "Angular FE + Full",
    // "Vue FE + Full"
];
export const packageManagers = [
    { name: "npm", installCommand: "install", uninstallCommand: "uninstall" },
    { name: "yarn", installCommand: "", uninstallCommand: "remove" },
];
export const packageManagersNames = packageManagers.map(m => m.name);
export const REPOS_BASE_URL = "https://github.com/JulSeb42/";
export const REPOS_URLS = {
    VITE_REST: "vite-rest",
    VITE_APOLLO: "vite-apollo",
    VITE_FE_ONLY: "vite-styled",
};
export const CLIENT_LOCAL = "http://localhost:5173";
