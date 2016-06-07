class SearchTermsController < ActionController
  def index
    input = params[:input].lowercase
    @search_terms = Term.where("lower(term.name) LIKE :name_start", {name_start: "{input}%"})
  end
end
