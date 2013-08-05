require 'test_helper'

class ArticleTest < ActiveSupport::TestCase

  test "should not save an article without a title" do
    assert !Article.new.save
  end

  test "should not save an article without a slug" do
    article = Article.new
    article.title = "A Song of Ice and Fire"
    assert !article.save
  end

  test "should not save an article if slug is not uniq" do
    Fabricate(:article)
    assert_raises(CouchRest::Model::Errors::Validations) do
      Fabricate(:article, title: "Infinity Blade: Awakening")
    end
  end

end
