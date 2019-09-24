import m from 'mithril';
import _ from 'lodash';

export default {
  /****** QUERY/GET ******/
  findOne: (table, params, options) => {
    if (!_.isObject(params))
      throw new Error('Incorrect data format');

    return m.request({
      url: '/' + table + '/findOne',
      method: 'post', options, body: params,
    });
  },

  findAll: (table, options) => {
    return m.request({
      url: '/' + table + '/findAll',
      method: 'get', options,
    })
  },

  findByPk: (table, id, options) => {
    return m.request({
      url: '/' + table + '/findByPk/' + id,
      method: 'get', options,
    });
  },

  /****** UPDATE/PUT ******/
  /**
    * @params {Object} body - data to update
    * @params {Object} options - any other options such as offset, limit...
    */
  update: (table, id, body, options) => {
    return m.request({
      url: '/' + table + '/update/' + id,
      method: 'put', body, options,
    });
  },

  /****** CREATE/POST ******/
  /**
    * @params {Object} body - data to post
    */
  create: (table, body, endpoint, options) => {
    let url = `/${table}/create`;
    if (endpoint)
      url = `/${endpoint}/create`;

    return m.request({
      url, method: 'post', body, options,
    });
  },

  /****** DELETE ******/
  delete: (table, id, options) => {
    let url = `/${table}/delete/${id}`;
    return m.request({
      url, method: 'delete', options,
    });
  },
};
