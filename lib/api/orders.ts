import { api } from "./client";

export interface OrderItemInput {
  product_id?: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  selected_variant: string;
}

export interface OrderInput {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  notes?: string;
  items: OrderItemInput[];
  payment_method?: string;
}

export interface OrderItemResponse {
  id: number;
  product_id: number | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  selected_variant: string;
}

export interface OrderResponse {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_id: number | null;
  notes: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  status: string;
  items: OrderItemResponse[];
  created_at: string;
  updated_at: string;
}

export async function placeOrder(data: OrderInput): Promise<OrderResponse> {
  return api.post<OrderResponse>("/orders", data);
}

export async function getOrders(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<OrderResponse[]> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  const qs = query.toString();
  return api.get<OrderResponse[]>(`/orders${qs ? `?${qs}` : ""}`);
}

export async function getOrder(id: number): Promise<OrderResponse> {
  return api.get<OrderResponse>(`/orders/${id}`);
}

export async function updateOrderStatus(
  id: number,
  status: string
): Promise<OrderResponse> {
  return api.put<OrderResponse>(`/orders/${id}/status`, { status });
}
