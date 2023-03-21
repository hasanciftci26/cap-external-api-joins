const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    const Northwind = await cds.connect.to("Northwind"),
        Northwind2 = await cds.connect.to("Northwind_2"),
        { Orders } = Northwind.entities,
        { Order_Details } = Northwind2.entities;

    this.on("READ", "Orders", async (req, res) => {
        let aOrders = await Northwind.run(SELECT.from(Orders));
        let OrderIDs = [],
            aOrderDetails = [],
            aOrds = [];

        aOrders.forEach((order) => {
            OrderIDs.push(order.OrderID);
            aOrds.push(order);
        });

        let OrderDetails = await Northwind2.run(SELECT.from(Order_Details).where({
            OrderID: {
                in: OrderIDs
            }
        })),
            aBos = [];

        OrderDetails.forEach((details) => {
            aOrderDetails.push(details);
        });

        aOrds.forEach((order) => {
            let sOrderDetails = aOrderDetails.find(x => x.OrderID == order.OrderID);
            aBos.push({
                OrderID: order.OrderID,
                CustomerID: order.CustomerID,
                ShipName: order.ShipName,
                ProductID: sOrderDetails?.ProductID,
                Quantity: sOrderDetails?.Quantity
            });
        });

        return aBos;

    });
    this.on("READ", "OrderDetails", async (req, res) => {
        return Northwind2.run(req.query);
    });
});