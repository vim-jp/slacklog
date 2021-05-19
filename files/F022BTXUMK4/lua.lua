require 'lsp.config'.install_lsp_if_not_installed('lua')

local sumneko_root_path = DATA_PATH .. '/lspinstall/lua'
local sumneko_binary = sumneko_root_path .. '/sumneko-lua-language-server'
local library = {}
local path = vim.split(package.path, ';')

table.insert(path, 'lua/?.lua')
table.insert(path, 'lua/?/init.lua')
-- table.insert(path, '?.lua')
-- table.insert(path, '?/init.lua')

local function add_library(lib)
    for _, p in pairs(vim.fn.expand(lib, false, true)) do
        p = vim.loop.fs_realpath(p)
        if p then
            library[p] = true
        end
    end
end

add_library('$VIMRUNTIME')
add_library('$HOME/.config/nvim')
-- add_library('$HOME/.local/share/nvim/site/pack/packer/opt/*')
-- add_library('$HOME/.local/share/nvim/site/pack/packer/start/*')
add_library '$HOME/.cache/dein/repos/github.com/*/*'

require('lspconfig').sumneko_lua.setup{
    cmd = { sumneko_binary, '-E', sumneko_root_path .. '/main.lua' },
    on_attach = require'lsp.config'.cmmon_on_attach,
    settings = {
        Lua = {
            runtime = {
                version = 'LuaJIT',
                path = path
            },
            completion = { callSnippet = 'Both' },
            diagnostics = {
                globals = {'vim'}
            },
            workspace = {
                library = library,
                maxPreload = 10000,
                preloadFileSize = 50000
            },
            -- telemetry = { enable = false }
        }
    }
}
