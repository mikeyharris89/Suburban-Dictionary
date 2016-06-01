class Api::TermsController < ApplicationContoller

  def index
    @terms = Term.all
  end

  def create
    @term = Term.new(term_params)

    if @term.save
      render :show
    else
      render json: @pokemon.errors.full_messages, status: 422

  end

  def show
  end

  def update
  end

  def delete
  end

  private
  def term_params
    params.require(:term).permit(:name, :definition, :sentence)
  end
end
