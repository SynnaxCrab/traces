class TermsController < ApplicationController

  def index
    @tags = Term.tags
  end

  def new
    @term = Term.new
  end

  def create
  end
end
