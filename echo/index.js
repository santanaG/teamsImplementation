export const run = (context, req) => {
  Object.assign(context.res, {
    status: 200,
    body: { ok: true, echo: req.body || 'no content' }
  })
}
