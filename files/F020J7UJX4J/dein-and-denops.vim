if &compatible
  set nocompatible " Be iMproved
endif

const s:dein_dir = expand('~/dein')

" install dein if not found " {{{
if &runtimepath !~# 'dein.vim'
  " git clone
  const s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'
  if !isdirectory(s:dein_repo_dir)
    call system('git clone https://github.com/Shougo/dein.vim.git ' . shellescape(s:dein_repo_dir))
  endif
  " Required:
  " Add the dein installation directory into runtimepath
  exe 'set runtimepath+=' . expand(s:dein_repo_dir)
endif
" }}}

if dein#load_state(s:dein_dir)
  " Required:
  call dein#begin(s:dein_dir)
  call dein#add(expand(s:dein_repo_dir))
  if !has('nvim')
    call dein#add('roxma/nvim-yarp')
    call dein#add('roxma/vim-hug-neovim-rpc')
  endif
  call dein#add('vim-denops/denops.vim')
  call dein#config('denops.vim', {
	\ 'lazy' : 1, 'on_event' : 'VimEnter',
	\ })
  call dein#add('vim-denops/denops-helloworld.vim')

  " auto delete unused plugins
  call map(dein#check_clean(), "delete(v:val, 'rf')")
  " Required:
  call dein#end()   
  call dein#save_state() 
else
  finish
endif

" Required:
filetype plugin indent on
syntax enable

if dein#check_install()
 call dein#install()
endif
