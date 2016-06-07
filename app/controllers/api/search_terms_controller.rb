class Api::SearchTermsController < ApplicationController
  def index
    input = params[:input].downcase
    @search_terms = []
    unless input == ""
      @search_terms = Term.where("lower(terms.name) LIKE :name_start", {name_start: "#{input}%"})
    end
    @search_terms
  end
end
