var verbose = false
var dryrun = true

func gunzipFile(inpath, outpath string) (ferr error) {
	var w io.Writer
	if dryrun {
		log.Printf("gunzip: %s <- %s", outpath, inpath)
		w = io.Discard
	} else {
		fout, err := os.Create(outpath)
		if err != nil {
			return err
		}
		defer func() {
			fout.Close()
			if ferr != nil {
				os.Remove(outpath)
			}
		}()
		w = fout
	}

	fin, err := os.Open(inpath)
	if err != nil {
		return err
	}
	defer func() {
		fin.Close()
		if ferr == nil && !dryrun {
			os.Remove(inpath)
		}
	}()

	r, err := gzip.NewReader(fin)
	if err != nil {
		return err
	}
	_, err = io.Copy(w, r)
	if err != nil {
		return err
	}
	if verbose {
		log.Printf("gunziped: %s <- %s", outpath, inpath)
	}
	return nil
}