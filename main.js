import { getOrders, getTrucks } from "./api.js";
import {
  displaySummary,
  displayOrders,
  displayTrucks
} from "./ui.js";

async function loadFleetFlow() {
  try {
    const [orders, trucks] = await Promise.all([
      getOrders(),
      getTrucks()
    ]);

    displaySummary(orders);
    displayOrders(orders, "orders-table");

    displayOrders(orders, "customer-orders-table");

    displayTrucks(trucks);

    console.log("FleetFlow data loaded successfully.");
  } catch (error) {
    console.error("FleetFlow API error:", error);

    const table = document.getElementById("orders-table");

    if (table) {
      table.innerHTML = `
        <tr>
          <td colspan="5">
            Unable to load orders. Check that JSON Server is running.
          </td>
        </tr>
      `;
    }
  }
}

loadFleetFlow();