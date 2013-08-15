require 'test_helper'

class ArticleTest < ActiveSupport::TestCase

  def teardown
    @user.destroy if @user
    @article.destroy if @article
  end

  test "should validate presence of title" do
    article = Article.new
    article.slug= "infinity-blade-awakening"
    e = assert_raises(CouchRest::Model::Errors::Validations) do
      article.save!
    end
    assert_equal("Validation Failed: Title can't be blank", e.message)
  end

  test "should validate presence of slug" do
    article = Article.new
    article.title = "A Song of Ice and Fire"
    e = assert_raises(CouchRest::Model::Errors::Validations) do
      article.save!
    end
    assert_equal("Validation Failed: Slug can't be blank", e.message)
  end

  test "should validate uniqueness of slug" do
    @article = Fabricate(:article)
    e = assert_raises(CouchRest::Model::Errors::Validations) do
      Fabricate(:article, title: "Infinity Blade: Awakening")
    end
    assert_equal("Validation Failed: Slug has already been taken", e.message)
  end

  test "should return correct type" do
    @article = Fabricate(:article)
    assert_equal @article.type, "Article"
  end

  test "should parse time params correctly" do
    assert_equal Article.parse_time, [Date.new(0), Date.new(1)]
    assert_equal Article.parse_time({ year: '2011', month: '09' }),
      [Date.new(2011, 9), Date.new(2011, 10)]
    assert_equal Article.parse_time({ year: '2011', month: '09', day: '27' }),
      [Date.new(2011, 9, 27), Date.new(2011, 9, 27)]
    assert_equal Article.parse_time({ year: '2011', month: '12' }),
      [Date.new(2011, 12), Date.new(2012)]
    assert_equal Article.parse_time({ year: '2011', month: '12', day: '27' }),
      [Date.new(2011, 12, 27), Date.new(2011, 12, 27)]
  end

  test "should save the attachments" do
    @article = Fabricate.build(:article, :slug => "has-attachments")
    file1 = fixture_file_upload(FABRICATORS_PATH + '/attachments/upload_file_1')
    file2 = fixture_file_upload(FABRICATORS_PATH + '/attachments/upload_file_2')
    @article.attachments=[file1, file2];
    assert @article.save
  end

  test "should save the tags seperated by comma" do
    @article = Fabricate.build(:article, :slug => "test-tags")
    @article.tag_attributes="Winterfell, Kings Landing, Storms End"
    assert @article.save
    assert_equal(["Winterfell", "Kings Landing", "Storms End"], @article.tags)
  end

  test "existing tags should not been saved" do
    @article = Fabricate.build(:article, :slug => "test-tags")
    @article.tag_attributes="Winterfell, Kings Landing, Storms End"
    assert @article.save
    @article.tag_attributes="Winterfell, Starfall"
    assert_equal(["Winterfell", "Kings Landing", "Storms End", "Starfall"], @article.tags)
  end

  test "should get slug when to_param" do
    article = Fabricate.build(:article)
    assert_equal "/articles/a-song-of-ice-and-fire",
      Rails.application.routes.url_helpers.article_path(article)
  end

end
