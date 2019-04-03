'use strict';

const renderResponse = (res, view, data) => res.render(view, data);

module.exports = {
  renderResponse
};