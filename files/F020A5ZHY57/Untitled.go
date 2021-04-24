for len(v) > 0 {
    comma := strings.IndexByte(v, ',')
    if comma == -1 {
        return false
    }
    if tokenEqual(trimOWS(t), token) {
        return true
    }
    v = v[comma+1:]
}