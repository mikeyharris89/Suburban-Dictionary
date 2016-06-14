class Api::TermsController < ApplicationController

  def index
    @terms = Term.order(created_at: :desc).includes(:user).per_page_kaminari(params[:page])
    @pages = @terms.total_pages
  end

  def like_name_index
    term = Term.find(params[:id])
    id = params[:id]
    if term
      @terms = Term.where('lower(name) = ?', term.name.downcase).includes(:user)
    end

    render :index
  end

  def browse_terms_index

    letter = params[:letter]
    @terms = Term.where('upper(name) LIKE :f_letter', {f_letter: "#{letter}%"})
    render :index
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
