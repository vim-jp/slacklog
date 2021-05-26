for actor in actors:
    for action in actors.take_turn():
        yield run_action(action);