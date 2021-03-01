const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.json({
        message: "This is the Web API Node Sprint Challenge!",
        // res.send(`<h2>This is the Web API Node Sprint Challenge!</h2>`);
	})
})

module.exports = router;