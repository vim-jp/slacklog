package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(400)
		w.Write([]byte(`{"error":"always failed"}`))
	}))
	log.Fatal(http.ListenAndServe(":8080", nil))
}