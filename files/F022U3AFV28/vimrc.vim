" from https://github.com/choplin/dotfiles/blob/master/_vimrc
" ft-vim_fold {{{
" augroup foldmethod-expr
"   autocmd!
augroup vimrc_init_core
  autocmd InsertEnter * nested if &l:foldmethod ==# 'expr'
  \                   |   let b:foldinfo = [&l:foldmethod, &l:foldexpr]
  \                   |   setlocal foldmethod=manual foldexpr=0
  \                   | endif
  autocmd InsertLeave * nested if exists('b:foldinfo')
  \                   |   let [&l:foldmethod, &l:foldexpr] = b:foldinfo
  \                   | endif
augroup END
