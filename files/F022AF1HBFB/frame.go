/*
Package stack provides utility to capture stack frames.
*/
package stack

import (
	"runtime"
	"strconv"
	"strings"
)

// Frame represents a stack frame.
type Frame struct {
	File     string
	Line     int
	Function string
}

func (f *Frame) String() string {
	return f.Function + "() at " + f.File + ":" + strconv.Itoa(f.Line)
}

// Frames gets stack frames with skip.
func Frames(skip int) []*Frame {
	var frames []*Frame
	var pc [64]uintptr
	skip += 2
	for {
		n := runtime.Callers(skip, pc[:])
		if n == 0 {
			break
		}
		if frames == nil {
			frames = make([]*Frame, 0, n)
		}
		ff := runtime.CallersFrames(pc[:n])
		for {
			f, more := ff.Next()
			frames = append(frames, &Frame{
				File:     f.File,
				Line:     f.Line,
				Function: f.Function,
			})
			if !more {
				break
			}
		}
		skip += n
	}
	return frames
}

// Join concatenates formated frames as string.
func Join(frames []*Frame, sep string) string {
	b := strings.Builder{}
	for i, f := range frames {
		if i != 0 {
			b.WriteString(sep)
		}
		b.WriteString(f.String())
	}
	return b.String()
}