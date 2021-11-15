package main

import (
	"fmt"
	"reflect"
	"strconv"
)

type Table struct {
	name         string `default:"film_category"`
	number       int    `default:"1"`
	is_temporary bool   `default:"true"`
}

func fill_defaults(t Table) Table {
	typ := reflect.TypeOf(t)
	if t.name == "" {
		f, _ := typ.FieldByName("name")
		t.name = f.Tag.Get("default")
	}

	if t.number == 0 {
		f, _ := typ.FieldByName("number")
		t.number, _ = strconv.Atoi(f.Tag.Get("default"))
	}

	if t.is_temporary == false {
		f, _ := typ.FieldByName("is_temporary")
		t.is_temporary, _ = strconv.ParseBool(f.Tag.Get("default"))
	}

	return t
}

func main() {
	fmt.Println("Hello, world!")

	table1 := Table{name: "users", is_temporary: false}
	fmt.Println("table1", table1)

	table2 := Table{name: "users"}
	fmt.Println("table2", table2)

	table3 := Table{}
	table3 = fill_defaults(table3)
	fmt.Println("table3", table3)
}
