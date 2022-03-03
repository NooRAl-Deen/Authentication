// Main Controller
exports.main = (req, res) => {
    res.render('index');
}

// Login Controller
exports.login = (req, res) => {
    res.render('login');
}

exports.dashboard = (req, res, next) => {
    let user = req.user;
    res.render('dashboard', {user});
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
}

