(define L (list 31 41 59 26 53))
(define p (cddr L))
(print p)
(define (move-to-first lis p)
  (define (proc l)
    (cond
      ((eq? (cdr l) p)
       (set-cdr! l (cddr l))
       (set-cdr! p lis)
       p)
      ((pair? (cdr l))
       (proc (cdr l)))
      (else
        (error))))
  (proc lis))

(set! L (move-to-first L p))

(print L)