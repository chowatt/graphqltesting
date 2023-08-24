import { MySqlDatasource } from "./mysql.datasource.js";

export class ApolloDatasource extends MySqlDatasource {

  constructor(config) {
    super(config);
  }

  public SelectTickets(){
    return this.db.query
      .select("*")
      .from("tickets");
  }

  public SelectTicket(id){
    return this.db.query
      .first("*")
      .from("tickets")
      .where({id: id});
  }

  async InsertTicket(ticket)
  {
    return await this.db.query.insert(ticket, 'id').into("tickets");
  }

  async InsertTicketActivity(ticket, {ticket_id})
  {
    ticket.ticket_id = ticket_id;
    return await this.db.query.insert(ticket, 'id').into("activities");
  }

  async CreateTicketGraph(ticket, activities)
  {
    const ticket_id = await this.InsertTicket(ticket);
    console.log(ticket_id);
    activities.forEach(element => {
      this.InsertTicketActivity(element, {ticket_id});
    });
    return ticket_id;
  }
}