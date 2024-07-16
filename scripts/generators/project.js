import { packageManagers, packageManagersNames, REPOS_URLS, REPOS_BASE_URL, } from "../utils/constants.js";
import { replaceProjectNameModifyFullStack } from "../utils/replace-project-name-fullstack.js";
import { replaceRepoName } from "../utils/replace-repo-name.js";
import { copyFullStackEnv } from "../utils/copy-env.js";
import { removeCypress } from "../utils/remove-cypress.js";
export default (plop) => {
    const { setGenerator } = plop;
    setGenerator("project", {
        prompts: [
            {
                type: "input",
                message: "Enter project's name",
                name: "projectName",
            },
            // {
            //     type: "list",
            //     message: "What type of project are you building?",
            //     choices: projectTypes,
            //     default: projectTypes[0],
            //     name: "projectType",
            // },
            {
                type: "list",
                message: "What package manager are you using?",
                choices: packageManagersNames,
                default: packageManagers[1].name,
                name: "packageManager",
            },
            {
                type: "confirm",
                message: "Add Cypress tests on front end?",
                default: false,
                name: "cypressTesting",
            },
        ],
        actions: data => {
            const actions = [];
            const packageManager = packageManagers.find(m => m.name === (data === null || data === void 0 ? void 0 : data.packageManager));
            // if (data?.projectType === projectTypes[0]) {
            actions.push(...[
                // ? Clone right repo
                `Cloning repo ${REPOS_BASE_URL}${REPOS_URLS.VITE_REST}`,
                {
                    type: "runCommand",
                    command: `git clone ${REPOS_BASE_URL}${REPOS_URLS.VITE_REST}`,
                },
                ...replaceRepoName(REPOS_URLS.VITE_REST, data === null || data === void 0 ? void 0 : data.projectName),
            ]);
            if ((data === null || data === void 0 ? void 0 : data.cypressTesting) === false) {
                actions.push(...removeCypress(data.projectName));
            }
            actions.push(...[
                // ? Replace repo name
                "Replace all titles inside your new app",
                ...replaceProjectNameModifyFullStack(REPOS_URLS.VITE_REST),
                "Create .env files",
                ...copyFullStackEnv(data === null || data === void 0 ? void 0 : data.projectName),
            ]);
            // }
            // if (data?.projectType === projectTypes[1]) {
            //     actions.push(
            //         ...[
            //             // ? Clone right repo
            //             `Cloning repo ${REPOS_BASE_URL}${REPOS_URLS.VITE_APOLLO}`,
            //             {
            //                 type: "runCommand",
            //                 command: `git clone ${REPOS_BASE_URL}${REPOS_URLS.VITE_APOLLO}`,
            //             },
            //             ...replaceRepoName(
            //                 REPOS_URLS.VITE_APOLLO,
            //                 data.projectName
            //             ),
            //         ]
            //     )
            // }
            // if (data.projectType === projectTypes[2]) {
            //     actions.push(
            //         ...[
            //             {
            //                 type: "runCommand",
            //                 command: `git clone ${REPOS_URLS.VITE_FE_ONLY}`,
            //             },
            //             replaceRepoName("vite-styled", data.projectName),
            //         ]
            //     )
            // }
            // ? Init repo
            actions.push(...[
                "Init git",
                {
                    type: "runCommand",
                    command: `cd ${data === null || data === void 0 ? void 0 : data.projectName} && rm -rf .git && git init && git add . && git commit -m "Initial commit"`,
                },
            ]);
            // ? Install packages
            actions.push(...[
                "Start install...",
                {
                    type: "runCommand",
                    command: `cd ${data === null || data === void 0 ? void 0 : data.projectName} && ${packageManager === null || packageManager === void 0 ? void 0 : packageManager.name} ${packageManager === null || packageManager === void 0 ? void 0 : packageManager.installCommand}`,
                },
            ]);
            return actions;
        },
    });
};
