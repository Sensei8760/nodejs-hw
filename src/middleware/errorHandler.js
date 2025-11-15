export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  req.log?.error?.(err);

  res.status(status).json({ message });
}
