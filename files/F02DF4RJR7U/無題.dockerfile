# syntax=docker/dockerfile:1.3-labs
FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y git curl unzip neovim

WORKDIR /work

RUN curl -fsSL https://deno.land/x/install/install.sh | sh && \
    git clone https://github.com/vim-denops/denops.vim && \
    git clone https://github.com/kuuote/denops-skkeleton.vim

ENV PATH $PATH:/root/.deno/bin

COPY <<EOF /root/.config/nvim/init.vim
set rtp+=/work/denops.vim
set rtp+=/work/denops-skkeleton.vim
imap <C-j> <Plug>(skkeleton-enable)
EOF
