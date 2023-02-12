module.exports = {
  hello: (req, res, next) => {
    try {
      res.status(200).send({ 
        message: "Hello World"
      });
    } catch(err) {
      next(err);
    }
  }
}
