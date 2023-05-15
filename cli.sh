# Sequelize
npm install -g sequelize
npm install --save sequelize sequelize-typescript pg-hstore pg
npm install --save-dev @types/sequelize

# Dotenv
npm i @nestjs/config
npm install dotenv --save


# Passport
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

# Bcrypt
npm install bcrypt --save

# Jwt
npm install --save @nestjs/jwt jsonwebtoken

npx sequelize-cli model:generate --name User --attributes username:string,password:string,gender:enum:'{female,male}',first_name:string,last_name:string,birthday:date,role:enum:'{admin,user}'
