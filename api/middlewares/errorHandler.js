export default function errorHandler(err, req, res) {
  if (err) {
    res.status(500).send(err);
  }
}
