
module.exports.home_page_get = (req, res) => {
    res.render("home");
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.signup_post = (req, res) => {
    res.redirect("/profile");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.login_post = (req, res) => {
    res.redirect("/dashboard")
}

