while processing:
    if g_action != None:
        processing = process_action()
    else
        g_action = g_actors[actor].take_turn()
        actor += 1;
        actor %= len(g_actors);