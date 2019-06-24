const express = require("express")
const shoulderpadRouter = express.Router()
const Shoulderpad = require("../models/shoulderpad")

shoulderpadRouter.route("/")
    .post((req, res, next) => {
        const shoulderpad = new Shoulderpad(req.body)
        shoulderpad.user = req.user._id
        shoulderpad.save((err, newShoulderpad) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newShoulderpad)
        })
    })

    .get((req, res, next) => {
        Shoulderpad.find({ user: req.user._id }, (err, shoulderpad) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(shoulderpad)
        })
    })

    shoulderpadRouter.route("/:_id")
        .get((req, res, next) => {
            Shoulderpad.findOne({ _id: req.params.shoulderpadId, user: req.user._id }, (err, shoulderpad) => {
                if (err) {
                    res.status(500)
                    return next(err)
                } else if (!shoulderpad) {
                    res.status(404)
                    return next(new Error("Shoulderpad not found"))
                }
                return res.send(shoulderpad)
            })
        })

        .put((req, res, next) => {
            Shoulderpad.findOneAndUpdate({ _id: req.params.shoulderpadId, user: req.user._id }, req.body, { new: true }, (err, shoulderpad) => {
                if (err) {
                    console.log("Error")
                    res.status(500)
                    return next(err)
                }
                return res.send(shoulderpad)
            })
        })

        .delete((req, res, next) => {
            Shoulderpad.findOneAndRemove({ _id: req.params.shoulderpadId, user: req.user._id }, (err, shoulderpad) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.send(shoulderpad)
            })
        })

        module.exports = shoulderpadRouter