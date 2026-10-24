import { 
    displaySummary,
    displayOrders
 } from "./ui";

 const orders = getOrders();

 displaySummary(orders);
 displayOrders(orders);