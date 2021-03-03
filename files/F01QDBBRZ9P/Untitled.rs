fn main() {
    let mut v = vec![1, 2, 3];
    let it = v.iter_mut();
    let u = &v[1..2];
    for i in it {
        *i = *i + 1;
    }
    println!("{:?}", u);
}
