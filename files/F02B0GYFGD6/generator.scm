(use util.match)

(define-syntax define-er-macro
  (er-macro-transformer
    (lambda (form rename cmp?)
      (match form
        [(_ name funcnames . body)
         (quasirename rename
           (define-syntax ,name
             (er-macro-transformer
               (lambda ,funcnames ,@body))))]))))

(define (map-tree proc sexp)
  (if (pair? sexp)
      (cons (map-tree proc (car sexp)) (map-tree proc (cdr sexp)))
      (proc sexp)))

(define-er-macro define-generator (form rename cmp?)
  (match form
    [(_ (fn . args) . body)
     (quasirename rename
       (define ,fn
         (let* ((retval #f)
                (eval-rem #f)
                (yield
                  (lambda v
                    (let/cc c
                      (set! eval-rem c)
                      (retval (apply values v)))))
                (proc (lambda ,args ,@(map-tree
                                        (lambda (atom) (if (eq? atom 'yield) (rename atom) atom))
                                        body))))
            (lambda ,args 
              (lambda ()
                (cond
                  ((not eval-rem)
                   (let/cc c
                     (set! retval c)
                     (proc ,@args)
                     (set! eval-rem (eof-object))
                     (eof-object)))
                  ((procedure? eval-rem)
                   (eval-rem))
                  (else (eof-object))))))))]))

(define-generator (range n)
  (let rec ((c 0))
    (if (= c n)
        (eof-object)
        (begin
          (yield c)
          (rec (+ c 1))))))

(define r (range 10))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))
(print (r))