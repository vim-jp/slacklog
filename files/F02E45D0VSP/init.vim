let g:config_dir = fnamemodify(expand('<sfile>'), ':h')

let g:dein_dir = g:config_dir . '/dein'
let s:dein_repo_dir = g:dein_dir . '/repos/github.com/Shougo/dein.vim'

if &runtimepath !~# '/dein.vim'
  if !isdirectory(s:dein_repo_dir)
    execute '!git clone https://github.com/Shougo/dein.vim' s:dein_repo_dir
  endif
  execute 'set runtimepath^=' . s:dein_repo_dir
endif

if dein#load_state(g:dein_dir)
  call dein#begin(g:dein_dir)

  call dein#add('prabirshrestha/vim-lsp')
  call dein#add('mattn/vim-lsp-settings')
  call dein#add('itchyny/lightline.vim')
  call dein#add('previm/previm', {'lazy': 1, 'on_ft': 'markdown'})


  call dein#end()
  call dein#save_state()
endif

if dein#check_install()
  call dein#install()
endif

let s:removed_plugins = dein#check_clean()
if len(s:removed_plugins) > 0
  call map(s:removed_plugins, "delete(v:val, 'rf')")
  call dein#recache_runtimepath()
endif

set laststatus=2