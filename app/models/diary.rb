class Diary < Article

  design do
    view :by_created_at
    view :by_title
    view :by_slug
    view :by_slug_created_at, :map => "
      function(doc) {
        if ((doc['couchrest-type'] == 'Diary') && (doc['slug'] != null) && (doc['created_at'] != null)) {
          emit([doc.slug, doc.created_at.substr(0, 10)]);
        }
      }
      "
  end

end
