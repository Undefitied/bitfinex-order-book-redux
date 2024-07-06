import React, {useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBids, addAsks, setConnected } from './orderBookSlice';
import { OrderBookWebSocket } from "./orderBookAPI";
import BookTable from "./BookTable";

const OrderBook = () => {
    const dispatch = useDispatch();
    const { bids, asks, connected } = useSelector(state => state.orderBook);
    const [error, setError] = useState(null)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    const connect = useCallback(() => {
        setIsConnecting(true)
        const { success } = OrderBookWebSocket.init(
            () => {
                setIsConnecting(false)
                dispatch(setConnected(true))
            },
            (msg) => {
                try {
                    const data = JSON.parse(msg.data)

                    if (!Array.isArray(data)) {
                        setConnected(false)
                        return
                    }

                    const [channelId, ...newRows] = JSON.parse(msg.data);
                    // TODO: clarify documentation: how to calculate total
                    const total = 0

                    const newBids = []
                    const newAsks = []
                    newRows.forEach(([price, count, amount]) => {
                        if (amount > 0) {
                            newBids.push({ channelId, price, count, amount, total })
                        } else {
                            newAsks.push({ channelId, price, count, amount: Math.abs(amount), total })
                        }
                    })

                    if (newBids.length > 0) {
                        dispatch(addBids(newBids))
                    }

                    if (newAsks.length > 0) {
                        dispatch(addAsks(newAsks))
                    }

                    setError(null)
                } catch(e) {
                    console.error(e.message)
                    setError('Error updating the order book')
                }
            },
            () => setError('Error on reading the order book')
        )

        if (!success) {
            setIsConnecting(false)
            setError('Error on connecting to the order book')
        }
    }, [dispatch, setIsConnecting, setError])

    const disconnect = useCallback(() => {
        if (isDisconnecting) return

        setIsDisconnecting(true)
        OrderBookWebSocket.close(() => {
            setIsDisconnecting(false)
            dispatch(setConnected(false))
        })
    }, [isDisconnecting, setIsDisconnecting])

    useEffect(() => {
        connect()
        return () => {
            disconnect()
        }
    }, [connect]);

    return (
        <div className="ui-panel">
            {error && <div className="message message-error">{error}</div>}

            <div className="book__buttons">
                <button onClick={disconnect} disabled={!isDisconnecting && !connected}>Disconnect</button>
                <button onClick={connect} disabled={!isConnecting && connected}>Connect</button>
            </div>

            <div className="message">
                {isConnecting ? 'Connecting' : isDisconnecting ? 'Disconnecting' : connected ? 'Connected' : 'Disconnected' }
            </div>

            <div className="book__main">
                <div className="book__side">
                    <h2>Bids</h2>
                    <BookTable rows={bids} />
                </div>
                <div className="book__side">
                    <h2>Asks</h2>
                    <BookTable rows={asks} />
                </div>
            </div>

        </div>
    );
};

export default OrderBook;
