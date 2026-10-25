const API_URL = "http://localhost:3000/orders";

export async function getOrders() {
    try{
        const response = await fetch (API_URL);

        if(!response.ok){
            throw new Error("failed to fetch order");
        }
        return await response.json();
    }
    catch (error){
        console.error("Error fetching orders:", error)
        throw error;
    }
}
export async function addOrder(order) {
    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(order)
    });
    if(!response.ok){
        throw new Error("Failed to add order");                                                         
    }
    return await response.json();
}
export async function updateOrder(id, updates) {
    const response = await fetch(`${API_URL}/${id}`,{
        method: "PATCH",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(updates)
    });
    if(!response.ok){
        throw new Error("Failed to update order");
    }
    return await response.json();
}
export async function deleteOrder(id){
    const response = await fetch(`${API_URL}/${id}`,{
        method: "DELETE"
    });
    if (!response.ok){
        throw new Error("Failed to delete order")
    }
    return true;
}