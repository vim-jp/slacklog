// forEachNode iterates over a NodeList and runs fn on each node.
func (ps *Parser) forEachNode(nodeList []*html.Node, fn func(*html.Node, int)) {
	for i := 0; i < len(nodeList); i++ {
		fn(nodeList[i], i)
	}
}