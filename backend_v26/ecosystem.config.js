module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/main.js',
      cwd: '/home/ustaadji/version26/backend_v26',
      exec_mode: 'fork',
      node_args: '--max-old-space-size=512',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      error_file: '/home/ustaadji/deploy/pm2_logs/backend-error.log',
      out_file: '/home/ustaadji/deploy/pm2_logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/ustaadji/version26/frontend_v26',
      exec_mode: 'fork',
      node_args: '--max-old-space-size=512',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      error_file: '/home/ustaadji/deploy/pm2_logs/frontend-error.log',
      out_file: '/home/ustaadji/deploy/pm2_logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};