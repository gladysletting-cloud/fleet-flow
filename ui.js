function getStatusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function formatDate(date) {
  if (!date) return "Not set";

  return new Date(date + "T00:00:00").toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}

export function displaySummary(orders) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const activeOrders = orders.filter(
    order => order.status !== "Delivered"
  );

  const pending = orders.filter(
    order => order.status === "Pending Allocation"
  ).length;

  const dueSoon = activeOrders.filter(order => {
    if (!order.deliveryDate) return false;

    const date = new Date(order.deliveryDate + "T00:00:00");
    return date >= today && date <= threeDaysLater;
  }).length;

  const overdue = activeOrders.filter(order => {
    if (!order.deliveryDate) return false;

    return new Date(order.deliveryDate + "T00:00:00") < today;
  }).length;

  document.getElementById("total-orders").textContent =
    orders.length;

  document.getElementById("pending-orders").textContent =
    pending;

  document.getElementById("due-orders").textContent =
    dueSoon;

  document.getElementById("overdue-orders").textContent =
    overdue;
}
export function displayOrders(orders, tableId = "orders-table") {
  const table = document.getElementById(tableId);

  if (!table) return;

  if (orders.length === 0) {
    table.innerHTML =
      '<tr><td colspan="5">No orders found.</td></tr>';
    return;
  }

  table.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.truck || "Not assigned"}</td>
      <td>${formatDate(order.deliveryDate)}</td>
      <td>
        <span class="status ${getStatusClass(order.status)}">
          ${order.status}
        </span>
      </td>
    </tr>
  `).join("");
}
export function displayTrucks(trucks) {
  const table = document.getElementById("trucks-table");

  if (!table) return;

  if (trucks.length === 0) {
    table.innerHTML =
      '<tr><td colspan="5">No trucks found.</td></tr>';
    return;
  }

  table.innerHTML = trucks.map(truck => `
    <tr>
      <td>${truck.id}</td>
      <td>${truck.model}</td>
      <td>${truck.vin || truck.stockNumber || "Not set"}</td>
      <td>${truck.source || "Not specified"}</td>
      <td>
        <span class="status ${getStatusClass(truck.status)}">
          ${truck.status}
        </span>
      </td>
    </tr>
  `).join("");
}
export function displayAllocations(orders){
  const table = document.getElementById("allocation-table");
  if (!table) return;

  table.innerHTML= orders.map(order => `
    <tr>
     <td>${order.id}</td>
     <td>${order.customer}</td>
     <td>${order.truck || "Not assigned"}</td>
     <td>${order.driver || "Not assidned"}</td>
     <td>${order.status}</td>
    </td>
    `).join("");
    if(orders.length == 0){
      table.innerHTML = 
      '<tr><td colspan="5">No allocations found.</td></tr>';
    }
}
export function displayDeliveries(orders) {
  const table = document.getElementById("deliveries-table");

  if (!table) return;

  table.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.deliveryDate || "Not set"}</td>
      <td>${order.status}</td>
      <td>${order.deliveryProgress || "Not started"}</td>
    </tr>
  `).join("");

  if (orders.length === 0) {
    table.innerHTML =
      '<tr><td colspan="5">No deliveries found.</td></tr>';
  }
}
export function displayTruckOptions(trucks){
  const select = document.getElementById("truck-name");

  if(!select) return;

  const availableTrucks = trucks.filter(truck => truck.status === "Available");

  const options = availableTrucks.map(truck => {
    return `<option value="${truck.id}">${truck.model} (${truck.vin})</option>`;
  })

  select.innerHTML = `<option value="">select an available truck</option>` + options.join("");
   
}