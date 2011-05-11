require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess
  
  test "should not save an article without a title" do
    article = Article.new
    assert !article.save
  end
 
  test "should not save an article without a slug" do
    article = Article.new
    article.title = "fuck gfw"
    assert !article.save
  end
  
  test "should not save an article if slug is not uniq" do
    article = Factory.build(:article)
    article.save
    another_article = Factory.build(:article)
    assert !another_article.save
  end 
  
  test "should save the attachments" do
    article = Factory.build(:article, :slug => "has-attachments")
    file1 = fixture_file_upload(FACTORIES_PATH + '/attachments/test.html')
    file2 = fixture_file_upload(FACTORIES_PATH + '/attachments/test.rb')
    article.attachments=[file1, file2];
    assert article.save
  end  
  
  test "should save the tags seperated by comma" do
    article = Factory.build(:article, :slug => "fuck-ccp")
    article.tag_attributes="fuck gfw, fuck ccp, free aiweiwei"
    article.save
    saved_article = Article.by_slug(:key => "fuck-ccp").first
    #raise "#{saved_article}"
    assert_equal(["fuck gfw", "fuck ccp", "free aiweiwei"], saved_article.tags)
  end
end
