func genTurnState(ctx context.Context, state *CombatState) chan bool {
	yield := make (chan bool);

	go func() {
		defer close(yield)
		for ctx.Err() == nil {
			// それぞれのキャラについて {
				// それぞれのイベントについて {
					yield <- true
				}
			}
			// 一定条件で yield <- false
		}
	}()

	return yield
}