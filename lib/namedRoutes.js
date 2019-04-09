const { API_ROUTE } = process.env;

module.exports = {
  privado: '/privado',
  api: {
    login: `/${API_ROUTE}login`,
    ads: `/${API_ROUTE}ads`
  }
};
