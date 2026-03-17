// PM2 process config
// Usage: pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: 'geeta-portal-api',
      script: 'src/server.js',
      cwd: '/var/www/geeta-portal/backend',
      instances: 'max',          // use all CPU cores
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      // Restart policy
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      // Logging
      out_file: '/var/log/geeta-portal/out.log',
      error_file: '/var/log/geeta-portal/err.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
