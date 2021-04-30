local api = vim.api

function ImeOff()
  os.execute('fcitx-remote -c')
end

function ImeOn()
  os.execute('fcitx-remote -o')
end

function ImeStat()
  local imests = io.popen('${HOME}/.config/nvim/imests')
  return imests:read()
end

function ImeAutoOff()
  api.nvim_win_set_var(0, 'ime_status', ImeStat())
  ImeOff()
end

function ImeAutoOn()
  if not (vim.fn.exists('w:ime_status') == 1) then
    api.nvim_win_set_var(0, 'ime_status', '0')
  end
  if api.nvim_win_get_var(0, 'ime_status') == '1' then
    ImeOn()
  end
end

vim.cmd('augroup InsertHook')
vim.cmd('autocmd!')
vim.cmd('autocmd InsertLeave * lua ImeAutoOff()')
vim.cmd('autocmd InsertEnter * lua ImeAutoOn()')
vim.cmd('augroup END')
