class Diary < Article

  view_by :created_at
  view_by :title
  view_by :slug
  view_by :slug_created_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Diary') && (doc['slug'] != null) && (doc['created_at'] != null)) {
        emit([doc.slug, doc.created_at.substr(0, 10)]);
      }
    }
    "

end