import { toKebabCase } from "ts-utils-julseb";
export function addCommandPrefix(projectName, commands) {
    return commands.map(command => (Object.assign(Object.assign({}, command), { command: `cd ${toKebabCase(projectName)} && ${command.command}` })));
}
export function addPathPrefix(commands) {
    return commands.map(command => (Object.assign(Object.assign({}, command), { path: command.path
            ? `${process.cwd()}/{{ kebabCase projectName }}/${command.path}`
            : null })));
}
