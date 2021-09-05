FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

# Neovim
RUN apt update && apt install -y ninja-build gettext libtool libtool-bin autoconf automake cmake g++ pkg-config unzip git

WORKDIR /usr/local/src
RUN git clone https://github.com/neovim/neovim.git

WORKDIR /usr/local/src/neovim
RUN make && make install

# Deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV PATH $PATH:/root/.deno/bin

# vim plugin
RUN sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
RUN mkdir -p /root/.config/nvim
RUN echo "call plug#begin('~/.vim/plugged') \n\
Plug 'vim-denops/denops.vim' \n\
Plug 'kuuote/denops-skkeleton.vim' \n\
call plug#end() \
\n\
imap <C-j> <Plug>(skkeleton-enable) \n\
\n" >> /root/.config/nvim/init.vim

RUN nvim -c "PlugInstall" -c "qa!"

# JISYO
RUN sh -c 'curl -fLo /usr/share/skk/SKK_JISYO.L.gz --create-dirs http://openlab.ring.gr.jp/skk/dic/SKK-JISYO.L.gz'
WORKDIR /usr/share/skk
RUN gzip -d SKK_JISYO.L.gz

# Deno cache
WORKDIR ~/.vim/plugged/denops-skkeleton.vim
RUN deno cache --no-check --unstable denops/**/*.ts

ENTRYPOINT ["bash"]
