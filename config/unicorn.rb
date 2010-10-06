listen 2010, :tcp_nopush => true
timeout 30
worker_processes 4 # this should be >= nr_cpus
working_directory "/home/winfield/lainuo.info/http/traces/current"

pid "/home/winfield/lainuo.info/http/traces/shared/pids/unicorn.pid"
stderr_path "/home/winfield/lainuo.info/http/traces/shared/log/unicorn.stderr.log"
stdout_path "/home/winfield/lainuo.info/http/traces/shared/log/unicorn.stdout.log"