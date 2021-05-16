autoload/quickrun/outputter/buffer.vim

function s:output(bufnr, data) abort
  call s:remove_running_mark(a:bufnr)
  let lines = s:adjust_fileformat(a:bufnr, a:data)
  let [lastline] = getbufline(a:bufnr, '$')
  let lines[0] = lastline . lines[0]
  echomsg 'output buffer: output bufnr:' . string(a:bufnr)
  echomsg 'output buffer: output lastline:' . string(lastline)
  echomsg 'output buffer: output data:' . string(a:data)
  echomsg 'output buffer: output lines:' . string(lines)
  echomsg 'output buffer: output dump buf(befor setbufline):' . string(getbufline(a:bufnr, 1, '$'))
  call setbufline(a:bufnr, '$', lines)
  echomsg 'output buffer: output dump buf(after setbufline):' . string(getbufline(a:bufnr, 1, '$'))
endfunction
