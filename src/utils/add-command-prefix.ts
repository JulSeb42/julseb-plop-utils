import type { ActionType, ModifyActionConfig } from "plop"
import { toKebabCase } from "ts-utils-julseb"
import type { ActionCommandType } from "./types.js"

export function addCommandPrefix(
    projectName: string,
    commands: ActionCommandType[]
) {
    return commands.map(command => ({
        ...command,
        command: `cd ${toKebabCase(projectName)} && ${command.command}`,
    }))
}

export function addPathPrefix(commands: Exclude<ActionType, string>[]) {
    return commands.map(command => ({
        ...command,
        path: (command as ModifyActionConfig).path
            ? `${process.cwd()}/{{ kebabCase projectName }}/${
                  (command as ModifyActionConfig).path
              }`
            : null,
    }))
}
