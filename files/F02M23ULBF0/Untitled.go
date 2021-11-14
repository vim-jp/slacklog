	// add adds the intrinsic b for pkg.fn for the given list of architectures.
	add := func(pkg, fn string, b intrinsicBuilder, archs ...*sys.Arch) {
		for _, a := range archs {
			intrinsics[intrinsicKey{a, pkg, fn}] = b
		}
	}

	add("runtime", "KeepAlive",
		func(s *state, n *ir.CallExpr, args []*ssa.Value) *ssa.Value {
			data := s.newValue1(ssa.OpIData, s.f.Config.Types.BytePtr, args[0])
			s.vars[memVar] = s.newValue2(ssa.OpKeepAlive, types.TypeMem, data, s.mem())
			return nil
		},
		all...)
