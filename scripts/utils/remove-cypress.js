export function removeCypress(projectName) {
    return [
        {
            type: "runCommand",
            command: `cd ${projectName}/client && rm -rf package.json && rm -rf cypress && rm -rf cypress.config.ts`,
        },
        {
            type: "add",
            path: `${process.cwd()}/${projectName}/client/package.json`,
            templateFile: "../templates/rest-ts/package.hbs",
        },
    ];
}
