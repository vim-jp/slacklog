(defun progn!-transformer (args)
  (if (null args)
      nil
    (if (consp (car args))
	(cons (car args) (progn!-transformer (cdr args)))
      (list (cons (car args) (progn!-transformer (cdr args)))))))

(progn!-transformer '((a) b (c) (d) e (f)))

(defmacro progn! (&rest args)
  `(progn ,@(progn!-transformer args)))

(progn! let ((a 1)) (princ a))