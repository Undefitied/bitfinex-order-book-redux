import React from "react";
import formatPrice from "../../utils/formatPrice";

export default function BookTable({ rows }) {
    return <>
        <div className="book__header">
            <div className="book-cell book-cell-count">Count</div>
            <div className="book-cell book-cell-amount">Amount</div>
            {/*TODO: clarify documentation: From the documentation I am not sure what value is "Total"*/}
            {/*<div className="book-cell book-cell-total">Total</div>*/}
            <div className="book-cell book-cell-price">Price</div>
        </div>

        <div className="book__rows">
            {rows.map((row, i) => (
                <div className="book__row" key={String(row.count) + String(row.amount) + String(row.price) + i}>
                    <div className="book-cell book-cell-count">{row.count}</div>
                    <div className="book-cell book-cell-amount">
                        {(row.amount === 0 || row.amount) && (
                            <span>{row.amount.toFixed(4)}</span>
                        )}
                    </div>
                    {/*TODO: clarify documentation: From the documentation I am not sure what value is "Total"*/}
                    {/*<div className="book-cell book-cell-total"><span>{ask.total.toFixed(4)}</span></div>*/}
                    <div className="price book-cell book-cell-price"><span>{formatPrice(row.price)}</span></div>
                </div>
            ))}
        </div>
    </>
}