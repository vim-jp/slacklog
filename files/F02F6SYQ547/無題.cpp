class Hoge {
  private _onHugo: ((hoge: Hoge) => void) | undefined;
  addOnHugo (onHugo: (hoge: Hoge) => void) {
    this._onHugo = onHugo
  }
  runOnHugo() {
    if (this._onHugo == undefined) {
      return
    }
    this._onHugo(this)
  }
}

const a = new Hoge()
a.addOnHugo((hoge) => {
  console.log(hoge)
})
a.runOnHugo()