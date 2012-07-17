require "rvm/capistrano"
require "bundler/capistrano"

set :application, "traces"
set :repository,  "https://github.com/winfield/traces.git"

set :scm, :git

set :user, "winfield"
set :use_sudo, false

set :host, "74.207.241.170"
role :web, host
role :app, host

set :rails_env, :production

set :deploy_to, "/home/#{user}/www/#{application}"
set :unicorn_conf, "#{deploy_to}/current/config/unicorn.rb"
set :unicorn_pid, "#{deploy_to}/shared/pids/unicorn.pid"

namespace :deploy do
  task :restart do
    run "if [ -f #{unicorn_pid} ]; then kill -USR2 `cat #{unicorn_pid}`; else cd #{deploy_to}/current && bundle exec unicorn -c #{unicorn_conf} -E #{rails_env} -D; fi"
  end
  task :start do
    run "cd #{deploy_to}/current && bundle exec unicorn -c #{unicorn_conf} -E #{rails_env} -D"
  end
  task :stop do
    run "if [ -f #{unicorn_pid} ]; then kill -QUIT `cat #{unicorn_pid}`; fi"
  end
end

task :cp_unicorn_server_config, :roles => :web do
  run "cd #{deploy_to}/current/config; cp unicorn.rb.server unicorn.rb"
end

after "deploy:update_code", :cp_unicorn_server_config