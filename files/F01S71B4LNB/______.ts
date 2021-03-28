type State =
  | undefined
  | {
      Post: undefined
      isSuccess: false
      isLoading: true
      error: undefined
    }
  | {
      Post: Post
      isSuccess: true
      isLoading: false
      error: undefined
    }
  | {
      Post: null
      isSuccess: false
      isLoading: false
      error: string
    }
