## # Node Express Sequelize -MVC-setup

Set up MVC using Node, Express,Sequelize (MySQL) , JWT and bcrypt.
___ 

>> Using Technology
 * NODE JS
 * Express JS
 * Sequelize(MySQL)
 * JWT+Http Only Cookie+bcryptJS(Auth)

>> How to contribute
___
* Put this comment on file where you will work
```javascript
/**
 * @design by your_git_username
 */
```
>> How to use
* Use following commad to clone the repo.

```
    $ git clone https://github.com/milon27/MVC-Node-Express-Sequelize-JWT .
    $ git checkout -b features_a
    $ npm install
    $ modify .env file 
    $ npm run dev (run by nodemon port 2727)
    $ npm start (run by node port 2727)
    
```


>> Folder Structure
___
 * routers
    * /middleware
        * AuthMid.js
        * ErrorMid.js
    * authRouter.js
    * testRouter.js
 * controllers
   * AuthController.js
   * TestController.js
 * models
   * index.js
   * Response.js (response format)
   * AuthModel.js
   * TestModel.js
 * utils
   * Define.js (all constant value)
   * DB_Define.js (all SQL+DB constant value)
   * Helper.js (all helper functions)
 * server.js
 * package.json
 * .env



<br/><br/>
>>> some rule
* when update / add make sure you return the **updated/new object** in response

<br/><br/><br/><br/>
___

>> Developed By milon27
* site : https://milon27.web.app
* gmail: mdjahidulislammilon@gmail.com
* phone: +8801646735359
