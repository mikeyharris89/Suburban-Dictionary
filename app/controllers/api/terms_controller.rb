class Api::TermsController < ApplicationController

  def index
    @terms = Term.all
  end

  def create
    @term = Term.new(term_params)
    if @term.save
      render :show
    else
      render json: @term.errors.full_messages, status: 422
    end
  end

  def show
    @term = Term.find(params[:id])
  end

  def update
    @term = Term.find(params[:id])

    if @term.update(term_params)
      render :show
    else
      render json: @term.errors.full_messages, status: 422
    end

  end

  def delete
    @term = Term.find(params[:id])
    @term.destroy
    render :show
  end

  private
  def term_params
    params.require(:term).permit(:name, :definition, :sentence, :user_id)
  end
end
