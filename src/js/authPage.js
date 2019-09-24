import m from 'mithril';
import prop from 'mithril/stream';
import _ from 'lodash';

export default class authPage {
  oninit() {
    const state = this.state = {
      user: prop(''),
      errorMsg: prop(''),
    };

    state.userValidation = (e, user) => {
      console.log('user: ', user);
      e.preventDefault();
      if (_.isEmpty(user)) {
        state.errorMsg('Please enter your username or any name to continue');
        return;
      }
      m.route.set('/' + user);
    };
  }

  view(vnode) {
    const { state } = vnode.state;
    return m('.container', [
      m('.row', [
        m('.col-md-12.col-xs-12', [
          m('form', [
            m('.form-group', [
              m('label', { for: 'inputUser' }, 'Continue as'),
              m('input.form-control', { id: 'inputUser', type: 'text', value: state.user(), oninput: e => state.user(e.target.value) }),
              state.errorMsg && m('small.text-danger', state.errorMsg()),
            ]),
            m('button.btn.btn-primary.float-right', { type: 'submit', onclick: e => state.userValidation(e, state.user()) }, 'Go'),
          ]),
        ]),
      ]),
      m('p', 'For old user, you will able to see the previous job.'),
      m('p', 'For new user, you will able be bring to an empty task list'),
    ]);
  }
}
