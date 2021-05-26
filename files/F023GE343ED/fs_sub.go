//go:embed internal/resources
var rowEmbed embed.FS

var resources io.FS

func init() {
	var err error
	resources, err = fs.Sub(rowEmbed, "internal/resources")
	if err != nil {
		panic(...)
	}
}
