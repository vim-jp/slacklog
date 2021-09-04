**プロセス(--stdioだけでもいける？)**

```
/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Renderer).app/Contents/MacOS/Code Helper (Renderer) /Users/yaegassy/.vscode/extensions/tamasfe.even-better-toml-0.14.2/dist/server.js --node-ipc --clientProcessId=61000
```

**vim-lsp だと initialization_options**:

```
    "initializationOptions": {
        "configuration": {
            "activationStatus": true,
            "taploConfig": "",
            "taploConfigEnabled": true,
            "semanticTokens": false,
            "commands": {
                "copyTomlAsJson": true,
                "copyJsonAsToml": true,
                "pasteJsonAsToml": true,
                "pasteTomlAsJson": true,
                "clearCache": false,
                "downloadSchemas": false
            },
            "formatter": {
                "alignEntries": false,
                "alignComments": true,
                "arrayTrailingComma": true,
                "arrayAutoExpand": true,
                "arrayAutoCollapse": true,
                "compactArrays": true,
                "compactInlineTables": false,
                "compactEntries": false,
                "columnWidth": 80,
                "indentTables": false,
                "indentEntries": false,
                "indentString": null,
                "reorderKeys": false,
                "allowedBlankLines": 2,
                "trailingNewline": true,
                "crlf": false
            },
            "schema": {
                "enabled": true,
                "links": false,
                "repositoryEnabled": true,
                "repositoryUrl": "https://taplo.tamasfe.dev/schema_index.json",
                "associations": {
                    "^(.*(/|\\\\)\\.?taplo\\.toml|\\.?taplo\\.toml)$": "taplo://taplo.toml"
                }
            },
            "actions": {
                "ignoreDeprecatedAssociations": false
            },
            "debug": false,
            "trace": {
                "server": "verbose"
            }
        }
    },
```

**vim-lsp だと workspace_config**:

```
    "settings": {
        "evenBetterToml": {
            "activationStatus": true,
            "taploConfig": "",
            "taploConfigEnabled": true,
            "semanticTokens": false,
            "commands": {
                "copyTomlAsJson": true,
                "copyJsonAsToml": true,
                "pasteJsonAsToml": true,
                "pasteTomlAsJson": true,
                "clearCache": false,
                "downloadSchemas": false
            },
            "formatter": {
                "alignEntries": false,
                "alignComments": true,
                "arrayTrailingComma": true,
                "arrayAutoExpand": true,
                "arrayAutoCollapse": true,
                "compactArrays": true,
                "compactInlineTables": false,
                "compactEntries": false,
                "columnWidth": 80,
                "indentTables": false,
                "indentEntries": false,
                "indentString": null,
                "reorderKeys": false,
                "allowedBlankLines": 2,
                "trailingNewline": true,
                "crlf": false
            },
            "schema": {
                "enabled": true,
                "links": false,
                "repositoryEnabled": true,
                "repositoryUrl": "https://taplo.tamasfe.dev/schema_index.json",
                "associations": {
                    "^(.*(/|\\\\)\\.?taplo\\.toml|\\.?taplo\\.toml)$": "taplo://taplo.toml"
                }
            },
            "actions": {
                "ignoreDeprecatedAssociations": false
            },
            "debug": false,
            "trace": {
                "server": "verbose"
            }
        }
    }

```