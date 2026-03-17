// Reads Accept-Language header or query param ?lang=hi|en
// Sets req.lang for controllers to serve the right language field
const setLanguage = (req, res, next) => {
  const queryLang = req.query.lang;
  const headerLang = req.headers['accept-language'];
  const userPref = req.user?.language_preference;

  const lang = queryLang || userPref || (headerLang && headerLang.startsWith('en') ? 'en' : 'hi');
  req.lang = ['hi', 'en'].includes(lang) ? lang : 'hi';
  next();
};

module.exports = { setLanguage };
