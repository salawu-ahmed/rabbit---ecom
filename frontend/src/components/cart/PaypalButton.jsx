import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

function PaypalButton({ amount, onSuccess, onError }) {
    return (
        <PayPalScriptProvider
            options={{
                clientId:'AXVPL95npTe9ZgpQ9Xx0RDE-g44ix1L49liaFLAPJi2JX33TcIqdX23IagzdYIpDDjGW0oZWGfCL3a1l'
            }}
        >
            <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: amount } }]
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess)
                }}
                onError={onError}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalButton
