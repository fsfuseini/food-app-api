import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        //   Get token
        const token = req.headers["authorization"].split(" ")[1];
        //   Verify token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized User",
                });
            } else {
                req.body.id = decoded.id;
                next();
            }
        })
  } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Please provide valid token",
        error,
      });
  }
};
