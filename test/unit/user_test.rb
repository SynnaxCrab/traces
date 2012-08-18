require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "should not save an user without a email" do
    user = User.new
    assert !user.save
  end

end
