package main

import (
	"fmt"

	"golang.org/x/xerrors"
)

type ErrorType string

var (
	ErrNotFound         ErrorType = "not found"
	ErrInvalidParameter ErrorType = "invalid parameter"
)

type SomeError struct {
	Type ErrorType
	Msg  string
}

func NewSomeError(errType ErrorType, msg string) SomeError {
	se := SomeError{
		Type: errType,
		Msg:  msg,
	}
	return se
}

func (s SomeError) Error() string {
	return fmt.Sprintf("kind: %s, msessage: %s\n", s.Type, s.Msg)
}

func main() {
	err := a()
	var someError SomeError
	if ok := xerrors.As(err, &someError); !ok {
		fmt.Println("error is not SomeError")
		return
	}

	switch someError.Type {
	case ErrNotFound:
		fmt.Println(someError)
	case ErrInvalidParameter:
		fmt.Println(someError)
	}
}

func a() error {
	return xerrors.Errorf(": %w", b())
}

func b() error {
	return NewSomeError(ErrNotFound, "not found")
}