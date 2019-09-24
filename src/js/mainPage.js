import m from 'mithril';
import prop from 'mithril/stream';
import _ from 'lodash';

export default class mainPage {
  oninit(vnode) {
    let state = this.state = {
      newTask: prop(''),
      userInfo: prop(),
      todoLists: prop([]),
    };

    const fetchTodoListByUser = () => {
      const user = m.route.get('name').split('/')[1];

      return fetch.findOne('user', { where: { name: user }, include: 'Task' })
        .then(res => !_.isEmpty(res) ? res : saveNewUser(user))
        .then(res => {
          state.userInfo(res);
          return _.get(res, 'tasks', []);
        })
        .then(state.todoLists)
        .then(bindCheckbox)
        .catch(err => console.info('[fetch to do user]', err));
    };

    const saveNewUser = user => {
      return fetch.create('user', { name: user })
        .then(res => res)
        .catch(err => console.info('[save new user]', err));
    };

    const bindCheckbox = () => {
      state.todoLists().forEach(item => {
        if (item.taskIsDone)
          item.isChecked = prop(true);
        else
          item.isChecked = prop(false);
      });
    };

    state.checkboxOnclick = (item) => {
      item.isChecked(!item.isChecked());
      updateTask(item);
    };

    const updateTask = item => {
      const data = {};
      if (item.isChecked()) {
        data.taskStatus = 20;
        data.taskIsDone = true;
      }
      else {
        data.taskStatus = 10;
        data.taskIsDone = false;
      }

      return fetch.update('task', item.taskId, data)
        .catch(err => console.info('[update task]', err));
    };

    state.addTask = e => {
      e.preventDefault();

      const postData = {
        taskContent: state.newTask(),
        taskStatus: 10,
        taskCategory: 'normal',
        userId: state.userInfo().userId,
      };

      return fetch.create('task', postData)
        .then(fetchTodoListByUser)
        .then(() => state.newTask(''))
        .catch(err => console.info('[create task]', err));
    };

    fetchTodoListByUser();
  }

  view(vnode) {
    const { state } = vnode.state;
    return m('.container', [
      m('h1.text-center.my-3', 'To Do List'),
      m('.row', [
        m('.col-md-12.col-xs-12', [
          m('ul.list-group', [
            state.todoLists().map(item => [
              m('li.list-group-item.py-1', { key: item.taskId }, [
                m('.d-flex.flex-row', [
                  m('input.my-auto.mr-3', { type: 'checkbox', 'aria-label': 'checkbox for task', checked: item.isChecked(), onclick: e => state.checkboxOnclick(item) }),
                  m('.d-flex.flex-column.flex-grow-1', [
                    m('p.m-0.my-auto', { style: item.isChecked() ? 'text-decoration:line-through': '' }, item.taskContent),
                    m('small', { style: item.isChecked() ? 'text-decoration:line-through': '' }, item.taskCategory),
                  ]),
                  m('i.mdi.mdi-delete.text-danger.my-auto'),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      m('.row', [
        m('.col-md-12.col-xs-12', [
          m('form', [
            m('.form-group', [
              m('input.form-control', { type: 'text', value: state.newTask(), oninput: e => state.newTask(e.target.value) }),
            ]),
            m('button.btn.btn-primary', { type: 'submit', onclick: e => state.addTask(e) }, 'Add'),
          ]),
        ]),
      ]),
    ]);
  }
}
