const { requiredScopes } = require('express-oauth2-jwt-bearer');

app.get('/api/private-scoped', checkJwt, requiredScopes('read:messages'), (req, res) => {
  res.json({ message: 'This is a private scoped endpoint' });
});