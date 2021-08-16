package main

import "testing"

type Option1 struct {
	Name  string
	Value interface{}
}

type Option2 struct {
	Type        int
	Name        string
	ValueString string
	ValueInt    int
}

func BenchmarkOne(b *testing.B) {
  var a []string
	o := Option1{
		Name:  "hoge",
		Value: "fuga",
	}
  for i := 0; i < b.N; i++ {
    s, ok := o.Value.(string)
    if ok {
      a = append(a, s)
    }
  }
}

func BenchmarkTwo(b *testing.B) {
  var a []string
	o := Option2{
    Type: 0,
		Name:  "hoge",
		ValueString: "fuga",
    ValueInt: -1,
	}
  for i := 0; i < b.N; i++ {
    if o.Type == 0 {
      a = append(a, o.ValueString)
    }
  }
}