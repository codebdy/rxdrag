export const isXmlHttpReq = ctx => {
  return ctx.request.get('X-Requested-With') === 'XMLHttpRequest';
};
