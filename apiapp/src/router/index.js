const path = require('path');
const fs =require('fs');
const express = require('express');
const middlewares = require('../middlewares');
const router = express.Router();
const config = require('../config/router.json');

const parsePath = (path_part, config) => {
  let dtype_path = typeof path_part;
  if( dtype_path != 'string' ){
    throw new Error(`Invalid path_part(${dtype_path}) datatype. String is required `);
  }

  let dtype_config = typeof config;
  if( dtype_config != 'object' ){
    throw new Error(`Invalid config datatype(${dtype_config}) for path ${path_part}. Object is required `);
  }

  if(config.hasOwnProperty.call(config, 'middlewares')){
    appendMiddlewares(config['middlewares'], path_part);
    delete(config['middlewares']);
  }

  for (const http_verb in config) {
    if (Object.hasOwnProperty.call(config, http_verb)) {
      const config_routes = config[http_verb];
      parseRoute(http_verb, path_part, config_routes);
    }
  }
}

const appendMiddlewares = (data_middlewares, path_part=null) => {
  const dtype_middlewares = typeof data_middlewares;
  const dtype_path_part = typeof path_part;

  if( dtype_middlewares != 'string' && !Array.isArray(data_middlewares)){
    throw new Error(`Invalid middleware(${dtype_middlewares}) datatype. Array of strings or string is required `);
  }

  if(path_part !== null && dtype_path_part != 'string'){
    throw new Error(`Invalid path(${dtype_path_part}) datatype. String is required `);
  }

  if(dtype_middlewares == 'string'){
    data_middlewares = [data_middlewares];
  }

  data_middlewares.forEach(middleware_name => {
    if (!middlewares.hasOwnProperty.call(middlewares, middleware_name)) {
      throw new Error(`Middleware(${middleware_name}) not found.`);
    }

    if(!path_part){
      router.use(middlewares[middleware_name]);
    } else {
      router.use(path_part, middlewares[middleware_name]);
    }
  });

  return router
};

const parseRoute = (http_verb, part_path, config_routes) => {
  for (let last_path in config_routes) {
    if (Object.hasOwnProperty.call(config_routes, last_path)) {

      const leaf_config = config_routes[last_path];
      last_path = (last_path == '/') ? '' : last_path;
      const end_path = `${part_path}${last_path}`.trim();
      let data_middlewares = [];
      let route_middlewares = [];
      let controller = null;
      let action = 'index';

      if(!leaf_config['controller'] || typeof leaf_config['controller'] != 'string'){
        throw new Error(`Invalid controller datatype for path(${end_path}). String is required `);
      }
      controller = leaf_config['controller'];

      if(leaf_config['action']){
        if(typeof leaf_config['action'] != 'string'){
          throw new Error(`Invalid action datatype for path(${end_path}). String is required `);
        }
        action = leaf_config['action'];
      }

      if(Object.hasOwnProperty.call(leaf_config, 'middlewares')){
        data_middlewares = leaf_config['middlewares'];
        let dtype_middlewares = typeof data_middlewares;

        if( dtype_middlewares != 'string' && !Array.isArray(data_middlewares)){
          throw new Error(`Invalid middleware(${dtype_middlewares}) datatype. Array of strings or string is required `);
        }

        if(dtype_middlewares == 'string'){
          data_middlewares = [data_middlewares];
        }

        data_middlewares.forEach(middleware_name => {
          route_middlewares.push(middlewares[middleware_name]);
        });
      }

      let controller_path = path.resolve(__dirname,`../controllers/${controller}.js`)

      let constroller_path = path.resolve(
        path.join(__dirname,'../', 'controllers', `${controller}.js`)
      )

      if(!fs.existsSync(constroller_path)){
        throw new Error(`Controler(${controller}) not found!`);
      }

      const obj_controller = require(controller_path);

      if(typeof obj_controller != 'object'){
        throw new Error(`Invalid Controler(${controller}) datatype. Object is required`);
      }

      if( !Object.hasOwnProperty.call(obj_controller, action) || typeof obj_controller[action] != 'function'){
        throw new Error(`Invalid action(${controller}:${action}) datatype. Function is required`);
      }

      const action_handler = obj_controller[action];

      if(route_middlewares.length){
        router[http_verb](end_path, route_middlewares, action_handler);
      } else {
        router[http_verb](end_path, action_handler);
      }
    }
  }
}



const Router = () => {
  for (const key in config) {
    if (config.hasOwnProperty.call(config, key)) {
      data = config[key];

      if( key == 'middlewares'){
        appendMiddlewares(data);
      } else {
        parsePath(key, data)
      }

    }
  }
  return router;
};

module.exports = Router();
