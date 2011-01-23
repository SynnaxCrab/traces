atom_feed do |feed|
  feed.title("Traces")
  #feed.updated(@articles.first.created_at.to_time)
  feed.updated(Time.zone.at(@articles.first.created_at.to_time))

  for article in @articles
    feed.entry(article) do |entry|
      entry.title(article.title)
      entry.content(Kramdown::Document.new(article.content).to_html, :type => 'html')

      entry.author do |author|
        author.name("lainuo")
      end
    end
  end
end