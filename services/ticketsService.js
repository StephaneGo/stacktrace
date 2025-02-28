const e = require("express");
var { format, add } = require("date-fns");

let tickets = [];
let idx = 0;

exports.findAllTickets = () => {
  return tickets;
};

exports.findTicketById = (id) => {
  return tickets.find((ticket) => ticket.id == id);
};

exports.deleteTicket = (id) => {
  tickets = tickets.filter((ticket) => ticket.id != id);
};

exports.addTicket = (titre, auteur, description) => {
  const creation = Date.now();
  const creation_formatted = format(creation, "dd/MM/yyyy HH:mm");
  const newTicket = {
    id: idx++,
    titre,
    auteur,
    description,
    creation,
    creation_formatted,
  };
  tickets.push(newTicket);
  return newTicket;
};

exports.updateTicket = (id, titre, auteur, description) => {
  let index = tickets.findIndex((ticket) => ticket.id == id);

  tickets[index] = {
    id: id,
    titre,
    auteur,
    description,
    creation: tickets[index].creation,
    creation_formatted: tickets[index].creation_formatted,
  };
};
