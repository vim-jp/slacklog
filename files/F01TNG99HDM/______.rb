class Foo
  def initialize(params)
    initialize_response(param)
    super
  end

  def fetch
    response = client.fetch(url, param)
    initialize_response(response)

    self
  end

  private

  def initialize_response(params)
    @id = params.id if params['id'].present?
    # ...
  end
end
