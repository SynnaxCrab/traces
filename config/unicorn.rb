listen 2010
worker_processes 4 # this should be >= nr_cpus
pid "/home/winfield/lainuo.info/http/traces/shared/pids/unicorn.pid"
stderr_path "/home/winfield/lainuo.info/http/traces/shared/log/unicorn.log"
stdout_path "/home/winfield/lainuo.info/http/traces/shared/log/unicorn.log"