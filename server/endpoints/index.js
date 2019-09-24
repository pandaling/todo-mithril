import user from './user';
import task from './task';

module.exports = app => {
	user(app);
	task(app);
};
