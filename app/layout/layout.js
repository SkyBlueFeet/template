import _black from './blank.ejs';

const layout = {
  initblock: (title, body) => {
    return _black({
      title: title,
      body: body
    });
  }
};

export default layout;
