import { 
  getOrders, 
  getTrucks,
  updateOrder,
  UpdateTruck
} from "./api.js";
import {
  displaySummary,
  displayOrders,
  displayTrucks,
  displayTruckOptions,
  displayAllocations,
  displayDeliveries
} from "./ui.js";

let allTrucks =[];
async function loadFleetFlow() {
  try {
    const [orders, trucks] = await Promise.all([
      getOrders(),
      getTrucks()
    ]);

    allTrucks = trucks;

    displaySummary(orders);
    displayOrders(orders, "orders-table");

    displayOrders(orders, "customer-orders-table");

    displayTrucks(trucks);
    displayTruckOptions(trucks)
    displayAllocations(orders);
    displayDeliveries(orders);

    console.log("FleetFlow data loaded successfully.");
  } catch (error) {
    console.error("FleetFlow API error:", error);

    const table = document.getElementById("orders-table");

    if (table) {
      table.innerHTML = `
        <tr>
          <td colspan="5">
            Unable to load orders.
          </td>
        </tr>
      `;
    }
  }
}

loadFleetFlow();

const allocationForm = document.getElementById("allocation-form");

allocationForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const orderId = document.getElementById("order-id").value.trim();
  const truckId = document.getElementById("truck-name").value;
  const driverName = document.getElementById("driver-name").value.trim();
  const selectTruck = allTrucks.find(truck => truck.id === truckId);

  try {
    const updatedOrder = await updateOrder(orderId, {
      truck: selectTruck.model,
      driver: driverName,
      status: "Allocated",
      deliveryProgress: "Awaiting Dispatch"
    });
    await UpdateTruck(truckId, {status: "Allocated"});

    alert(`Truck successfully allocated to ${updatedOrder.customer}!`);

    allocationForm.reset();

    await loadFleetFlow();
  } catch (error) {
    console.error("Allocation error:", error);
    alert("Allocation failed. Check the Order ID and make sure JSON Server is running.");
  }
});
