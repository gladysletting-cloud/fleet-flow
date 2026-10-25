const API_URL = "http://localhost:3000";

export async function getOrders() {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Could not load customer orders.");
  }

  return await response.json();
}
export async function getTrucks() {
  const response = await fetch(`${API_URL}/trucks`);

  if (!response.ok) {
    throw new Error("Could not load truck inventory.");
  }

  return await response.json();
}
export async function addOrder(order) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  if (!response.ok) {
    throw new Error("Could not add the order.");
  }

  return await response.json();
}
export async function updateOrder(id, updates) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error("Could not update the order.");
  }

  return await response.json();
}
export async function deleteOrder(id) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Could not delete the order.");
  }

  return true;
}