type Table struct {
    Name        string
    Number      int
    IsTemporary bool
}

t1 := &Table{Name: "user", Number: 1}
t2 := &Table{Name: "users", Number: 1, IsTemporary: true}
t3 := &Table{Name: "film_category", Number: 1, IsTemporary: true}