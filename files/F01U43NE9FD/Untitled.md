* Add a flag to disable keys to close a message.

* Permit shortcut keys in buffer, client, tree modes to be configured with a
  format (-K flag to choose-buffer, choose-client, choose-tree).

* Add a current_file format for the config file being parsed.

* When display-message used in config file, show the message after the config
  file finishes.

* Add client-detached notification in control mode.

* Improve performance of format evaluation.

* Make jump command support UTF-8 in copy mode.

* Support X11 colour names and other colour formats for OSC 10 and 11.

* Add "pipe" variants of "copy-pipe" commands which do not copy.

* Include "focused" in client flags.

* Send Unicode directional isolate characters around horizontal pane borders if
  the terminal supports UTF-8 and an extension terminfo(5) capability "Bidi" is
  present.

* Add a -S flag to new-window to make it select the existing window if one
  with the given name already exists rather than failing with an error.

* Addd a format modifier to check if a window or session name exists (N/w or
  N/s).

* Add compat clock_gettime for older macOS.

* Add a no-detached choice to detach-on-destroy which detaches only if there
  are no other detached sessions to switch to.

* Add rectangle-on and rectangle-off copy mode commands.

* Change so that window_flags escapes # automatically. A new format
  window_raw_flags contains the old unescaped version.

* Add -N flag to never start server even if command would normally do so.

* With incremental search, start empty and only repeat the previous search if
  the user tries to search again with an empty prompt.

* Add a value for remain-on-exit that only keeps the pane if the program
  failed.

* Add a -C flag to run-shell to use a tmux command rather than a shell command.

* Do not list user options with show-hooks.

* Remove current match indicator in copy mode which can't work anymore since we
  only search the visible region.

* Make synchronize-panes a pane option and add -U flag to set-option to unset
  an option on all panes.

* Make replacement of ##s consistent when drawing formats, whether followed by
  [ or not. Add a flag (e) to the q: format modifier to double up #s

* Add -N flag to display-panes to ignore keys.

* Change how escaping is processed for formats so that ## and # can be used in
  styles.

* Add a 'w' format modifier for string width.

* Add support for Haiku.

* Expand menu and popup -x and -y as formats.

* Add numeric comparisons for formats.

* Fire focus events even when the pane is in a mode.

* Add -O flag to display-menu to not automatically close when all mouse buttons
  are released.

* Allow fnmatch(3) wildcards in update-environment.

* Disable nested job expansion so that the result of #() is not expanded again.

* Use the setal capability as well as (tmux's) Setulc.

* Add -q flag to unbind-key to hide errors.

* Allow -N without a command to change or add a note to an existing key.

* Add a -w flag to set- and load-buffer to send to clipboard using OSC 52.

* Add -F to set-environment and source-file.

* Allow colour to be spelt as color in various places.

* Add n: modifier to get length of a format.

* Respond to OSC colour requests if a colour is available.

* Add a -d option to display-message to set delay.

* Add a way for control mode clients to subscribe to a format and be notified
  of changes rather than having to poll.
    
* Add some formats for search in copy mode (search_present, search_match).

* Do not wait on shutdown for commands started with run -b.

* Add -b flags to insert a window before (like the existing -a for after) to
  break-pane, move-window, new-window.

* Make paste -p the default for ].

* Add support for pausing a pane when the output buffered for a control mode
  client gets too far behind. The pause-after flag with a time is set on the
  pane with refresh-client -f and a paused pane may be resumed with
  refresh-client -A.

* Allow strings in configuration files to span multiple lines - newlines and
  any leading whitespace are removed, as well as any following comments that
  couldn't be part of a format. This allows long formats or other strings to be
  annotated and indented.

* Instead of using a custom parse function to process {} in configuration
  files, treat as a set of statements the same as outside {} and convert back
  to a string as the last step. This means the rules are consistent inside and
  outside {}, %if and friends work at the right time, and the final result
  isn't littered with unnecessary newlines.

* Add support for extended keys - both xterm(1)'s CSI 27 ~ sequence and the
  libtickit CSI u sequence are accepted; only the latter is output. tmux will
  only attempt to use these if the extended-keys option is on and it can detect
  that the terminal outside supports them (or is told it does with the
  "extkeys" terminal feature).

* Add an option to set the pane border lines style from a choice of single
  lines (ACS or UTF-8), double or heavy (UTF-8), simple (plain ASCII) or number
  (the pane numbers). Lines that won't work on a non-UTF-8 terminal are
  translated back into ACS when they are output.

* Make focus events update the latest client (like a key press).

* Store UTF-8 characters differently to reduce memory use.

* Fix break-pane -n when only one pane in the window.

* Instead of sending all data to control mode clients as fast as possible, add
  a limit of how much data will be sent to the client and try to use it for
  panes with some degree of fairness.

* Add an active-pane client flag (set with attach-session -f, new-session -f
  or refresh-client -f). This allows a client to have an independent active
  pane for interactive use (the window client pane is still used for many
  things however).

* Add a mark to copy mode, this is set with the set-mark command (bound to X)
  and appears with the entire line shown using copy-mode-mark-style and the
  marked character in reverse. The jump-to-mark command (bound to M-x) swaps
  the mark and the cursor positions.

* Add a -D flag to make the tmux server run in the foreground and not as a
  daemon.

* Do not loop forever in copy mode when search finds an empty match.

* Fix the next-matching-bracket logic when using vi(1) keys.

* Add a customize mode where options may be browsed and changed, includes
  adding a brief description of each option. Bound to C-b C by default.

* Change message log (C-b ~) so there is one for the server rather than one per
  client and it remains after detach, and make it useful by logging every
  command.

* Add M-+ and M-- to tree mode to expand and collapse all.

* Change the existing client flags for control mode to apply for any client,
  use the same mechanism for the read-only flag and add an ignore-size flag.

  refresh-client -F has become -f (-F stays for backwards compatibility) and
  attach-session and switch-client now have -f flags also. A new format
  client_flags lists the flags and is shown by list-clients by default.

  This separates the read-only flag from "ignore size" behaviour (new
  ignore-size) flag - both behaviours are useful in different circumstances.

  attach -r and switchc -r remain and set or toggle both flags together.

* Store and restore cursor position when copy mode is resized.

* Export TERM_PROGRAM and TERM_PROGRAM_VERSION like various other terminals.

* Add formats for after hook command arguments: hook_arguments with all the
  arguments together; hook_argument_0, hook_argument_1 and so on with
  individual arguments; hook_flag_X if flag -X is present; hook_flag_X_0,
  hook_flag_X_1 and so on if -X appears multiple times.

* Try to search the entire history first for up to 200 ms so a search count can
  be shown. If it takes too long, search the visible text only.

* Use VIS_CSTYLE for paste buffers also (show \012 as \n).

* Change default formats for tree mode, client mode and buffer mode to be more
  compact and remove some clutter.

* Add a key (e) in buffer mode to open the buffer in an editor. The buffer
  contents is updated when the editor exits.

* Add -e flag for new-session to set environment variables, like the same flag
  for new-window.

* Improve search match marking in copy mode. Two new options
  copy-mode-match-style and copy-mode-current-match-style to set the style for
  matches and for the current match respectively. Also a change so that if a
  copy key is pressed with no selection, the current match (if any) is copied.

* Sanitize session names like window names instead of forbidding invalid ones.

* Check if the clear terminfo(5) capability starts with CSI and if so then
  assume the terminal is VT100-like, rather than relying on the XT capability.

* Improve command prompt tab completion and add menus both for strings and -t
  and -s (when used without a trailing space). command-prompt has additional
  flags for only completing a window (-W) and a target (-T), allowing C-b ' to
  only show windows and C-b . only targets.

* Change all the style options to string options so they can support formats.
  Change pane-border-active-style to use this to change the border colour when
  in a mode or with synchronize-panes on. This also implies a few minor changes
  to existing behaviour:

  - set-option -a with a style option automatically inserts a comma between the
    old value and appended text.

  - OSC 10 and 11 no longer set the window-style option, instead they store the
    colour internally in the pane data and it is used as the default when the
    option is evaluated.

  - status-fg and -bg now override status-style instead of the option values
    being changed.

* Add extension terminfo(5) capabilities for margins and focus reporting.

* Try $XDG_CONFIG_HOME/tmux/tmux.conf as well as ~/.config/tmux/tmux.conf for
  configuration file (the search paths are in TMUX_CONF in Makefile.am).

* Remove the DSR 1337 iTerm2 extension and replace by the extended device
  attributes sequence (CSI > q) supported by more terminals.

* Add a -s flag to copy-mode to specify a different pane for the source
  content. This means it is possible to view two places in a pane's history at
  the same time in different panes, or view the history while still using the
  pane. Pressing r refreshes the content from the source pane.

* Add an argument to list-commands to show only a single command.

* Change copy mode to make copy of the pane history so it does not need to
  freeze the pane.

* Restore pane_current_path format from portable tmux on OpenBSD.

* Wait until the initial command sequence is done before sending a device
  attributes request and other bits that prompt a reply from the terminal. This
  means that stray relies are not left on the terminal if the command has
  attached and then immediately detached and tmux will not be around to receive
  them.

* Add a -f filter argument to the list commands like choose-tree.

* Move specific hooks for panes to pane options and windows for window options
  rather than all hooks being session options. These hooks are now window options:

  window-layout-changed
  window-linked
  window-pane-changed
  window-renamed
  window-unlinked

  And these now pane options:

  pane-died
  pane-exited
  pane-focus-in
  pane-focus-out
  pane-mode-changed
  pane-set-clipboard

  Any existing configurations using these hooks on a session rather than
  globally (that is, set-hook or set-option without -g) may need to be changed.

* Show signal names when a process exits with remain-on-exit on platforms which
  have a way to get them.

* Start menu with top item selected if no mouse and use mode-style for the
  selected item.

* Add a copy-command option and change copy-pipe and friends to pipe to it if
  used without arguments, allows all the default copy key bindings to be
  changed to pipe with one option rather than needing to change each key
  binding individually.

* Tidy up the terminal detection and feature code and add named sets of
  terminal features, each of which are defined in one place and map to a
  builtin set of terminfo(5) capabilities. Features can be specified based on
  TERM with a new terminal-features option or with the -T flag when running
  tmux. tmux will also detect a few common terminals from the DA and DSR
  responses.

  This is intended to make it easier to configure tmux's use of terminfo(5)
  even in the presence of outdated ncurses(3) or terminfo(5) databases or for
  features which do not yet have a terminfo(5) entry. Instead of having to grok
  terminfo(5) capability names and what they should be set to in the
  terminal-overrides option, the user can hopefully just give tmux a feature
  name and let it do the right thing.

  The terminal-overrides option remains both for backwards compatibility and to
  allow tweaks of individual capabilities.

* Support mintty's application escape sequence (means tmux doesn't have to
  delay to wait for Escape, so no need to reduce escape-time when using
  mintty).

* Change so main-pane-width and height can be given as a percentage.

* Support for the iTerm2 synchronized updates feature (allows the terminal to
  avoid unnecessary drawing while output is still in progress).

* Make the mouse_word and mouse_line formats work in copy mode and enable the
  default pane menu in copy mode.

* Add a -T flag to resize-pane to trim lines below the cursor, moving lines out
  of the history.

* Add a way to mark environment variables as "hidden" so they can be used by
  tmux (for example in formats) but are not set in the environment for new
  panes. set-environment and show-environment have a new -h flag and there is a
  new %hidden statement for the configuration file.

* Change default position for display-menu -x and -y to centre rather than top
  left.

* Add support for per-client transient popups, similar to menus but which are
  connected to an external command (like a pane). These are created with new
  command display-popup.

* Change double and triple click bindings so that only one is fired (previously
  double click was fired on the way to triple click). Also add default double
  and triple click bindings to copy the word or line under the cursor and
  change the existing bindings in copy mode to do the same.

* Add a default binding for button 2 to paste.

* Add -d flag to run-shell to delay before running the command and allow it to
  run without a command so it just delays.

* Add C-g to cancel command prompt with vi keys as well as emacs, and q in
  command mode.

* When the server socket is given with -S, create it with umask 177 instead of
  117 (because it may not be in a safe directory like the default directory in
  /tmp).

* Add a copy-mode -H flag to hide the position marker in the top right.

* Add number operators for formats (+, -, *, / and m),