atom_feed do |feed|
  feed.title("Traces")
  feed.updated(@posts.first.created_at)

  for post in @posts
    feed.entry(post) do |entry|
      entry.title(post.title)
      entry.content(Kramdown::Document.new(post.content).to_html, :type => 'html')

      entry.author do |author|
        author.name("lainuo")
      end
    end
  end
end