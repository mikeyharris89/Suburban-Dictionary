class Api::TermsController < ApplicationController

  def index
    @terms = Term.order(created_at: :desc).includes(:user)
  end

  def like_name_index
    term = Term.find(params[:id])
    id = params[:id]
    if term
      @terms = Term.where('lower(name) = ?', term.name.downcase).includes(:user)
    end

    render :index
  end

  def create

    @term = Term.new(term_params)
    debugger
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

  def destroy
    @term = Term.find(params[:id])
    @term.destroy
    render :show
  end

  private
  def term_params
    params.require(:term).permit(:name, :definition, :sentence, :user_id, :image)
  end
end
