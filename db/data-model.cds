@cds.persistence.skip
entity Orders {
    key OrderID    : Integer;
        CustomerID : String(10);
        ShipName   : String(100);
        ProductID  : Integer;
        Quantity   : Integer;
};
