const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "content", "created_at"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
    .then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("home", {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/dashboard", withAuth, (req, res) => {
    // Find the logged in user based on the session ID
    User.findByPk(req.session.user_id, {
        attributes: {
            exclude: ["password"],
        },
        // Join user blog post and comment data with user data
        include: [{
            model: Post,
            attributes: ["id", "title", "content", "created_at"],
            include: [ User, Comment ]
        }]
    })
    .then((userData) => {
        console.log(userData);
        const user = userData.get({ plain: true });
        res.render("dashboard", {
            ...user,
            loggedIn: req.session.loggedIn
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [{
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }
        const post = postData.get({ plain: true });
        console.log(post);
        res.render("post", {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;