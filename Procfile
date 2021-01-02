web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 --require dotenv/config ./dist/server.js
release: node -r dotenv/config ./node_modules/typeorm/cli.js migration:run