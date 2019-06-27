const express = require("express")
const playerRouter = express.Router()
const Player = require("../models/player")

playerRouter.route("/")
    .post((req, res, next) => {
        const player = new Player(req.body)
        player.user = req.user._id
        player.save((err, newPlayer) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(newPlayer)
        })
    })

    .get((req, res, next) => {
        Player.find({ user: req.user._id }, (err, players) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(players)
        })
    })

    playerRouter.route("/:_id")
        .get((req, res, next) => {
            Player.findOne({ _id: req.params._id, user: req.user._id }, (err, player) => {
                if (err) {
                    res.status(500)
                    return next(err)
                } else if (!player) {
                    res.status(404)
                    return next(new Error("Player not found"))
                }
                return res.send(player)
            })
        })

        .put((req, res, next) => {
            Player.findOneAndUpdate({ _id: req.params._id, user: req.user._id }, req.body, { new: true }, (err, player) => {
                if (err) {
                    console.log("Error")
                    res.status(500)
                    return next(err)
                }
                return res.send(player)
            })
        })

        .delete((req, res, next) => {
            Player.findOneAndRemove({ _id: req.params._id, user: req.user._id }, (err, player) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.send(player)
            })
        })

        module.exports = playerRouter