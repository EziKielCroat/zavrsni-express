
const SECRET_KEY = process.env.SECRET_KEY || "tajniKljuc";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('No token provided.');
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

export const verifyRole = (verifiedRole) => (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).send('No token provided.');
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // ova linija je problem
        if(decoded.role === verifiedRole) {
            res.status(201).send('Korisnik smije pristupiti ovom resorsu');
        }
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
}