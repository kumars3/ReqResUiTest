export type ShippingDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export function randomShippingDetails(): ShippingDetails {
  const stamp = Date.now().toString().slice(-6);
  return {
    firstName: `Auto${stamp}`,
    lastName: `Test${stamp}`,
    postalCode: `${Math.floor(10000 + Math.random() * 89999)}`
  };
}