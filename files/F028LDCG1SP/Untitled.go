func (h *xormLogHook) AfterProcess(c *contexts.ContextHook) error {
	if !h.showSQL {
		return nil
	}
	b := &strings.Builder{}
	fmt.Fprintf(b, "[SQL] req_id=%s %v %v", reqid.Get(c.Ctx), c.SQL, logFilterArgs("", c.Args))
	if c.ExecuteTime > 0 {
		fmt.Fprintf(b, " - %v", c.ExecuteTime)
	}
	if c.Err != nil {
		fmt.Fprintf(b, " failed: %s", c.Err.Error())
	}
	log.Print(b.String())
	return nil
}
