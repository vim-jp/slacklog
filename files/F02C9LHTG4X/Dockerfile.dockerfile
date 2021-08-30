# syntax=docker/dockerfile:1.3-labs

FROM thinca/vim:v8.2.3385-ubuntu

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y curl unzip \
 && curl -sL 'https://github.com/denoland/deno/releases/download/v1.11.0/deno-x86_64-unknown-linux-gnu.zip' -o /tmp/deno.zip \
 && unzip -qd /usr/local/bin /tmp/deno.zip \
 && rm /tmp/deno.zip \
 && mkdir -p $HOME/.vim/pack/test/start/denops $HOME/.vim/pack/test/start/denops-skkeleton \
 && curl -sL \
        "https://github.com/vim-denops/denops.vim/archive/v1.8.0.tar.gz" | \
        tar xz --directory=$HOME/.vim/pack/test/start/denops --strip-components=1 \
 && curl -sL \
        "https://github.com/kuuote/denops-skkeleton.vim/archive/main.tar.gz" | \
        tar xz --directory=$HOME/.vim/pack/test/start/denops-skkeleton --strip-components=1 \
 && mkdir -p /usr/share/skk \
 && curl -sL http://openlab.jp/skk/dic/SKK-JISYO.L.gz | zcat > /usr/share/skk/SKK-JISYO.L

COPY <<VIMRC /root/.vim/vimrc
imap <C-j> <Plug>(skkeleton-enable)
cmap <C-j> <Plug>(skkeleton-enable)
VIMRC
