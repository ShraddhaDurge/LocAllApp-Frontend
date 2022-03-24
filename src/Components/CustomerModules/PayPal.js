import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const order=JSON.parse(localStorage.getItem("order"))
  const totalCost=JSON.parse(localStorage.getItem("totalCost"))
  console.log(order);
  console.log(totalCost);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: totalCost,

                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}