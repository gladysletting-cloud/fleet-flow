
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
    const date = new Date(
      order.deliveryDate + "T00:00:00"
    );

    return date >= today && date <= threeDaysLater;
  }).length;

  const overdue = activeOrders.filter(order => {
    const date = new Date(
      order.deliveryDate + "T00:00:00"
    );

    return date < today;
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

export function displayOrders(orders) {
  const table = document.getElementById("orders-table");

  table.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.truck}</td>
      <td>${order.deliveryDate}</td>
      <td>
        <span class="status status-${order.status
          .toLowerCase()
          .replaceAll(" ", "-")}">
          ${order.status}
        </span>
      </td>
    </tr>
  `).join("");
}
