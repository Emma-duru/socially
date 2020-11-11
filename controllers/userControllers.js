module.exports.profile_get = (req, res) => {
    res.render("profile");
}

module.exports.profile_post = (req, res) => {
    res.redirect("/dashboard")
}

module.exports.dashboard_get = (req, res) => {
    res.render("dashboard");
}