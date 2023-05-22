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

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

# Bcrypt
npm install bcrypt --save

# Jwt
npm install --save @nestjs/jwt jsonwebtoken

# caching 
npm install @nestjs/cache-manager cache-manager
npm i ioredis

# migration
npx sequelize-cli model:generate --name Role --attributes name:string
npx sequelize-cli model:generate --name User --attributes email:string,phone_number:string,password:string,first_name:string,last_name:string,birthday:date,gender:enum:'{female,male}',point:double,otp_code:string,is_code_used:boolean,refresh_token:string
npx sequelize-cli model:generate --name Store --attributes name:string,type_point:enum:'{fixed,rate}',isActive:boolean
npx sequelize-cli model:generate --name Reward --attributes name:string,point:double,image:string,expire_time:date,quantity:integer,description:string
npx sequelize-cli model:generate --name Product --attributes name:string,price:integer,image:string,quantity:integer,description:string
npx sequelize-cli model:generate --name Order_Details --attributes total:integer
npx sequelize-cli model:generate --name User_Rewards --attributes quantity:integer
npx sequelize-cli model:generate --name Admin --attributes username:string,password:string,first_name:string,last_name:string



# add column
npx sequelize-cli migration:generate --name add-rank-to-user
npx sequelize-cli migration:generate --name add-email-password-to-store
npx sequelize-cli migration:generate --name rename-isActive-to-is_active-store
npx sequelize-cli migration:generate --name add-expire-to-user
npx sequelize-cli migration:generate --name drop-tables
npx sequelize-cli migration:generate --name add-time-to-reward
npx sequelize-cli migration:generate --name add-otp-to-stores
npx sequelize-cli migration:generate --name add-fields-to-stores
npx sequelize-cli migration:generate --name add-fields-to-orders
npx sequelize-cli migration:generate --name add-refreshTken-to-store
npx sequelize-cli migration:generate --name add-hoarding_points-to-user


