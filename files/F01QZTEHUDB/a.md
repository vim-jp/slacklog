## Types
Type | example
-----|--------
bool | true, false
number | 123, -123, 0
float | 3.14, -1.5e2
string | "Hello, World"
blob | 0zFF00ED015DAF
list<{type}> | [123, 234, 345]
dict<{type}> | {key1: 123, key2: 2344}
void | 
any| 123, "Test", [123, 234]

Vim9 scriptでは型ありの変数宣言が可能です。  
宣言は以下の形で行います。  
```vim
var foo1: number = 123
var foo2: list<string> = ["HUGE", "HUGO"]
```
また、`any`型はどの型の値も入りますが値が`any`型を持つことはありません。  
(`void`も同様)
