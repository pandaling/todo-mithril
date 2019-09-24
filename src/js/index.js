import '../scss/style.scss';
import '@mdi/font/scss/materialdesignicons.scss';
import 'bootstrap';
import m from 'mithril';
import authPage from './authPage';
import mainPage from './mainPage';
import request from './request';

// initialise request
window.fetch = request;

m.route.prefix = '#';
m.route(document.getElementById('content'), '/', {
  '/': authPage,
  '/:name': mainPage,
});
