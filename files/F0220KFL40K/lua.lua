local sumneko_root_path = vim.fn.stdpath('data') .. '/lspinstall/lua'
local sumneko_binary = sumneko_root_path .. '/sumneko-lua-language-server'

local library = {}
local path = vim.split(package.path, ';')

table.insert(path, 'lua/?.lua')
table.insert(path, 'lua/?/init.lua')
-- table.insert(path, '?.lua')
-- table.insert(path, '?/init.lua')

local function add(lib)
    for _, p in pairs(vim.fn.expand(lib, false, true)) do
        p = vim.loop.fs_realpath(p)
        if p then
            library[p] = true
        end
    end
end

add('$VIMRUNTIME')
add('$HOME/.config/nvim')
add('$HOME/.local/share/nvim/site/pack/packer/opt/*')
add('$HOME/.local/share/nvim/site/pack/packer/start/*')

require('lspconfig').sumneko_lua.setup{
    cmd = { sumneko_binary, '-E', sumneko_root_path .. '/main.lua' },
    -- on_new_config = function (config, root)
        -- local libs = vim.tbl_deep_extend('force', {}, library)
        -- libs[root] = nil
        -- config.settings.Lua.workspace.library = libs
        -- return config
    -- end,
    on_attach = require'lsp'.cmmon_on_attach,
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
            telemetry = { enable = false }
        }
    }
}
