const express = require("express")
const helmetRouter = express.Router()
const Helmet = require("../models/helmet")

helmetRouter.route("/")
    .post((req, res, next) => {
        const helmet = new Helmet(req.body)
        helmet.user = req.user._id
        helmet.save((err, newHelmet) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newHelmet)
        })
    })

    .get((req, res, next) => {
        Helmet.find({ user: req.user._id }, (err, helmet) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(helmet)
        })
    })

    helmetRouter.route("/:_id")
        .get((req, res, next) => {
            Helmet.findOne({ _id: req.params._id, user: req.user._id }, (err, helmet) => {
                if (err) {
                    res.status(500)
                    return next(err)
                } else if (!helmet) {
                    res.status(404)
                    return next(new Error("Helmet not found"))
                }
                return res.send(helmet)
            })
        })

        .put((req, res, next) => {
            Helmet.findOneAndUpdate({ _id: req.params._id, user: req.user._id }, req.body, { new: true }, (err, helmet) => {
                if (err) {
                    console.log("Error")
                    res.status(500)
                    return next(err)
                }
                console.log(helmet)
                return res.send(helmet)
            })
        })

        .delete((req, res, next) => {
            Helmet.findOneAndRemove({ _id: req.params._id, user: req.user._id }, (err, helmet) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.send(helmet)
            })
        })

        module.exports = helmetRouter