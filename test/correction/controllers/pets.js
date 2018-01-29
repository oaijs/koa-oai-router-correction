
async function findPets(ctx, next) {
  ctx.response.body = ctx.request.query;
}

module.exports = {
  findPets,
};
