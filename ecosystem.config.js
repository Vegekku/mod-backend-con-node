module.exports = {
  apps: [
    {
      name: 'nodepop',
      script: './bin/www',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: './',
      ignore_watch: [
        'data',
        'docs',
        'e2e',
        'micro_services',
        'node_modules',
        'public/images',
        'scripts'
      ],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm',
      error_file: './logs/nodepop/err.log',
      out_file: './logs/nodepop/out.log'
    },
    {
      name: 'thumbnail-microservice',
      script: './micro_services/createThumbnail.js',
      instances: 1,
      autorestart: true,
      watch: './micro_services/createThumbnail.js',
      log_date_format: 'YYYY-MM-DD HH:mm',
      error_file: './logs/thumbnail-microservice/err.log',
      out_file: './logs/thumbnail-microservice/out.log'
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
