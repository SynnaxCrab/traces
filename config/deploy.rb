set :application, "Traces"
set :repository,  "git://github.com/winfield/traces.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :deploy_to, "/home/winfield/lainuo.info/http/traces"
set :user, "winfield"
set :use_sudo, false

role :web, "blog.lainuo.info"                          # Your HTTP server, Apache/etc
role :app, "blog.lainuo.info"                          # This may be the same as your `Web` server
role :db,  "blog.lainuo.info", :primary => true # This is where Rails migrations will run
# role :db,  "your slave db-server here"

# If you are using Passenger mod_rails uncomment this:
# if you're still using the script/reapear helper you will need
# these http://github.com/rails/irs_process_scripts

# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end