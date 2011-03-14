xml.instruct!
 
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc         "http://www.lainuo.info"
    xml.lastmod     Time.zone.at(@articles.first.created_at.to_time).strftime("%Y-%m-%d")
    xml.changefreq  "always"
  end
 
  @articles.each do |article|
    xml.url do
      xml.loc         article_slug(article)
      xml.lastmod     Time.zone.at(article.created_at.to_time).strftime("%Y-%m-%d")
      xml.changefreq  "weekly"
      xml.priority    0.8
    end
  end
end