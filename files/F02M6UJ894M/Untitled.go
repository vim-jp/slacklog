package main

type Table struct {
	Name        string
	Number      int
	IsTemporary bool
}

func New() *Table {
	return &Table{
		Name:        "film_category",
		Number:      1,
		IsTemporary: true,
	}
}

func (t *Table) Merge(o *Table) *Table {
	if (o.Name != "") {
		t.Name  = o.Name
	}
	if (o.Number != "") {
		t.Number  = o.Number
	}
	t.IsTemporary  = o.IsTemporary
	return t
}