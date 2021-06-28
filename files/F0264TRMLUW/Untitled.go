// replace time.Now
//go:linkname now time.Now
func now() time.Time {
	return // time for test
}