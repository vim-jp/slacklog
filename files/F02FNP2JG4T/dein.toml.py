[[plugins]]
repo = 'Shougo/dein.vim'
hook_post_source = '''
  " toml
  function! s:dein_toml_setting() abort
    let Filepath = g:V.import('System.Filepath')
    let fname = Filepath.realpath(expand("%:p"))
    " dein toml
    for toml in keys(g:dein.file.toml)
      let toml_fname = Filepath.realpath(Filepath.abspath(toml))
      if fname ==? toml_fname
        call dein#toml#syntax()
        return
      endif
    endfor
  endfunction

  augroup vimrc_init_dein
    autocmd!
    autocmd FileType toml call s:dein_toml_setting()
  augroup END
'''

[[plugins]]
repo = 'osyo-manga/vim-precious'
depends = ['context_filetype.vim', 'vim-textobj-user']
hook_add = '''
  " dein toml do not need switch
  let g:precious_enable_switchers = {
  \  "toml" : {
  \    "setfiletype" : 0,
  \  },
  \}
'''