var express = require("express");
var { body, validationResult } = require("express-validator");
var ticketsService = require("../services/ticketsService");

var router = express.Router();

ticketsService.addTicket("ticket 1", "auteur 1", "description 1");
ticketsService.addTicket("ticket 2", "auteur 1", "description 2");
ticketsService.addTicket("ticket 3", "auteur 2", "description 3");

router.get("/", (req, res) => {
  res.json({ status: "success", data: ticketsService.findAllTickets() });
});

router.post(
  "/",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
  (req, res) => {
    const { titre, auteur, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: "error", data: errors.array() });
      return;
    }

    const newTicket = ticketsService.addTicket(titre, auteur, description);

    res.json({ status: "success", data: newTicket });
  }
);

/*
router.get("/:id/modifier", (req, res) => {
  const { id } = req.params;
  const ticket = ticketsService.findTicketById(id);
  res.render("modifier-ticket", { ticket });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const ticket = ticketsService.findTicketById(id);
  res.render("detail-ticket", { ticket });
});

router.post(
  "/:id/modifier",
  body("titre").trim().notEmpty().withMessage("Champ obligatoire"),
  body("description")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("modifier-ticket", {
        ticket: req.body,
        errors: errors.array(),
      });
      return;
    }
    const { id } = req.params;
    const { titre, auteur, description } = req.body;
    ticketsService.updateTicket(id, titre, auteur, description);
    res.redirect("/");
  }
);

router.get("/:id/supprimer", (req, res) => {
  const { id } = req.params;
  ticketsService.deleteTicket(id);
  res.redirect("/");
});
*/

module.exports = router;
